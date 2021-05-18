import React from "react";
import {ColorManager} from "../lib/vis_color_manager";
import {EvalConfiguration, Scores} from "../lib/results";
import * as d3 from "d3"
import {D3BrushEvent} from "d3"
import style from "./vis_pc_plot.module.css"
import Tippy from "@tippyjs/react";
import {followCursor} from "tippy.js";
import 'tippy.js/themes/translucent.css';
import {throttle} from "lodash";


interface PCP_Props {
  cm: ColorManager,
  config: EvalConfiguration,
  scores: Scores[],
  highlighted: string[],
  onDatasetSelect: (datasets: string[]) => void,
  onDatasetHover: (dataset: string, hover: boolean) => void,
  onFilterChange: (datasets: string[]) => void
}

export class PCP
  extends React.PureComponent<PCP_Props, any> {

  static defaultProps = {
    onDatasetHover: () => {
    },
    onFilterChange: () => {
    },
    onDatasetSelect: () => {
    },
    highlighted: []
  }
  private static height = 150;
  private static slotWidth = 30;
  state = {
    datasetMatrix: [] as number[][], // dataset x measures
    datasetNames: [] as string [], // dataset names - indices correspond to matrix
    measureNames: [],
    // axis: [],
    xScale: null,
    yScales: [] as d3.ScaleLinear<number, number>[],
    filters: {} as { [key: string]: number[] }
  }
  private brushes = React.createRef<SVGGElement>()
  private lineGen = d3.line<number>()
    .defined(d => !!d)
    .x((d, i) => this.state.xScale(i))
    .y((d, i) => PCP.height - this.state.yScales[i](d))

  static getDerivedStateFromProps(nextProps: PCP_Props, prevState) {

    if (prevState.datasetMatrix.length > 0) return {}

    // console.log(nextProps.config, "--- nextProps.config");

    const all_ds = new Set(Object.entries(nextProps.config.challenges)
      .reduce((acc, curr) => {
        return [...curr[1].datasets, ...acc]
      }, [] as string[]))

    // console.log(all_ds,"--- all_ds");

    const possibleMetaMeasures = Object.entries(nextProps.config.measures).sort();
    let measureNames = []
    const entryCount: { [key: string]: number } = {}
    possibleMetaMeasures.forEach(([k, v]) => {
      measureNames = [...measureNames, ...v.sort()]
      v.forEach(vv => entryCount[vv] = 0)
    })


    // TODO: can be simplified/removed with new data format
    const extractValue = (dim: string, v: any): number => {
      if (dim.startsWith("rouge")) return v.fmeasure;
      if (dim === "bertscore") return v.f1;
      if (dim === "nubia") return v.nubia_score;
      return v;
    }

    // Convert into line data
    const datasetMatrix: number[][] = []
    const datasetNames = []
    nextProps.scores.forEach(submission => {
      const sn = submission.submission_name
      Object.entries(submission).forEach(([datasubset, scoreData]) => {
        if (datasubset == "submission" || typeof scoreData == "string") return;
        if (all_ds.has(datasubset)) {
          datasetNames.push(sn + "." + datasubset);
          datasetMatrix.push(
            measureNames.map(dim => {
              const value = dim in scoreData ? extractValue(dim, scoreData[dim]) : null;
              if (value) entryCount[dim] += 1;
              return value
            })
          )
        }
      })
    })

    const yScales: d3.ScaleLinear<number, number, never>[] =
      datasetMatrix[0].map(() => d3.scaleLinear().range([0, PCP.height]))

    for (const i of d3.range(datasetMatrix[0].length)) {
      const min_max = d3.extent<number>(datasetMatrix.map(d => d[i]));
      yScales[i].domain(min_max);
    }

    const xScale = d3.scaleLinear().range([0, PCP.slotWidth])

    return {yScales, xScale, datasetNames, measureNames, datasetMatrix}
  }

  componentDidMount() {
    const st = this.state;
    const isInRange = ([key, [min, max]]: [string, number[]], d) =>
      min <= d[st.measureNames.indexOf(key)]
      && d[st.measureNames.indexOf(key)] <= max;

    const _propagateFilters = () => {
      const filterlist = Object.entries(st.filters);
      if (filterlist.length === 0) {
        this.props.onFilterChange(null);
      } else {
        const filtered = st.datasetNames.filter((ds, i) =>
          filterlist.every(f => isInRange(f, st.datasetMatrix[i])))
        this.props.onFilterChange(filtered);
      }
    }

    const propagateFilters = throttle(_propagateFilters, 300);
    const forceUpdate = throttle(this.forceUpdate, 100);

    const brushing = (e: D3BrushEvent<number>, d) => {
      // Todo: maybe use "setState()" -- might increase rendering effort though
      const sel = e.selection
      if (sel === null) {
        delete st.filters[d];
      } else {
        st.filters[d] = (e.selection as [number, number])
          .map(d => PCP.height - d) // large y coord == low value
          .map(st.yScales[st.measureNames.indexOf(d)].invert)
          .reverse() // better logic: max-min ==> min-max
      }
      forceUpdate.call(this);
      propagateFilters.call(this);
    };

    const brush = d3.brushY()
      .extent([[-3, 0], [3, PCP.height]])
      .on("end brush", brushing)


    d3.select(this.brushes.current)
      .selectAll(".brush")
      .data(this.state.measureNames)
      .join("g")
      .attr("class", "brush")
      .attr("transform", (d, i) => `translate(${this.state.xScale(i)},0)`)
      .call(brush)


  }


  render() {

    const st = this.state;
    const props = this.props;

    // avoid milli, micro,...
    const format = (d) => Math.abs(d) < 1 ? d3.format('.3f')(d) : d3.format(".3s")(d);


    function lineClasses(d: number[], i) {
      const filterlist = Object.entries(st.filters)

      const isInRange = ([key, [min, max]]) => min <= d[st.measureNames.indexOf(key)]
        && d[st.measureNames.indexOf(key)] <= max;

      return [
        style.line, // standard style
        // is selected ?
        props.highlighted
          .indexOf(st.datasetNames[i]) > -1 ? style.selected : '',
        // LineFilters
        filterlist.length > 0 ?
          (filterlist.every(isInRange) ?
            style.lineVisible : style.lineInvisible)
          : ''
      ].join(' ');
    }

    return <svg height={270}
                width={this.state.measureNames.length * PCP.slotWidth + 50}>
      <g transform={"translate(30,20)"}>
        <g className={"bg"}></g>
        <g className={"labels"}>
          {st.measureNames
            .map((m, i) =>
              <text
                transform={`translate(${st.xScale(i)},${PCP.height + 25})rotate(30)`}
                className={style.label}
                style={{fill: this.props.cm.getColorForMeasure(m)}}
                key={m}>{this.props.config.common_metrics[m].show_as}</text>)}
        </g>
        <g className={"yAxes"}>
          {st.measureNames.map((m, i) =>
            <line
              key={m}
              className={style.yAxis}
              x1={st.xScale(i)}
              x2={st.xScale(i)}
              y1={-5}
              y2={PCP.height + 5}
              style={{stroke: this.props.cm.getColorForMeasure(m)}}
            />
          )}
        </g>
        <g className={"minMaxValues"}>
          {st.yScales.map((yS, i) =>
            <React.Fragment key={st.measureNames[i]}>
              <text
                // key={st.measureNames[i]}
                className={[style.extremaLabelTop, style.textNon].join(' ')}
                transform={`translate(${st.xScale(i)},-7)`}
              >{format(yS.domain()[1])}</text>
              <text
                // key={st.measureNames[i]+"_low"}
                className={[style.extremaLabelBtm, style.textNon].join(' ')}
                transform={`translate(${st.xScale(i)},${PCP.height + 7 + 7})`}
              >{format(yS.domain()[0])}</text>
            </React.Fragment>
          )}
        </g>

        <g className={"dataLines"}>
          {st.datasetMatrix.map((d, i) =>
            <Tippy followCursor={true}
                   theme={"translucent"}
                   content={st.datasetNames[i]}
                   plugins={[followCursor]}
                   key={st.datasetNames[i]}
            >
              <path d={this.lineGen(d)}
                    className={lineClasses(d, i)}
                    onMouseEnter={() => props.onDatasetHover(st.datasetNames[i], true)}
                    onMouseLeave={() => props.onDatasetHover(st.datasetNames[i], false)}
              />
            </Tippy>
          )}
        </g>

        <g className={"brushes"} ref={this.brushes}>

        </g>

      </g>
    </svg>;
  }

  selectDataset = (datasetName: any) => {
    this.setState({selectedDatasets: [datasetName]});

    // return function (p1: React.MouseEvent<SVGPathElement>) {
    // };
  }

}
