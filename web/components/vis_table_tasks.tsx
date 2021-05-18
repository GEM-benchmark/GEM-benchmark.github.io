import React from "react";
import {ColorManager} from "../lib/vis_color_manager";
import {EvalConfiguration, Scores} from "../lib/results";
import * as d3 from "d3"
import {D3BrushEvent, scaleLinear} from "d3"
import style from "./vis_table_tasks.module.css"
import Tippy from "@tippyjs/react";
import {followCursor} from "tippy.js";
import 'tippy.js/themes/translucent.css';
import {throttle} from "lodash";
import {string} from "prop-types";
import {fontSize} from "@material-ui/system";

interface Table_Props {
  cm: ColorManager,
  config: EvalConfiguration,
  scores: Scores[],
  tableMode: number,
  columnFilter: string,
  // highlighted: string[],
  // onDatasetSelect: (datasets: string[]) => void,
  // onDatasetHover: (dataset: string, hover: boolean) => void,
  // onFilterChange: (datasets: string[]) => void
}

interface ChallengeName {
  challenge: string;
  ds: string;
  rs: number;
}

export class TableTask extends React.PureComponent<Table_Props, any> {

  static defaultProps = {
    onDatasetHover: () => {
    },
    onFilterChange: () => {
    },
    onDatasetSelect: () => {
    },
    tableMode: 5,
    columnFilter: ''
    // highlighted: []
  }
  state = {
    // datasetMatrix: [] as number[][], // dataset x measures
    // datasetNames: [] as string [], // dataset names - indices correspond to matrix
    measureNames: [],
    challengeResults: {} as {
      [key: string]:
        { [key: string]: { value: number, sn: string }[] }
    },
    challengeNames: [] as ChallengeName[],
    columnFilter:''
    // axis: [],
    // xScale: null,
    // yScales: [] as d3.ScaleLinear<number, number>[],
    // filters: {} as { [key: string]: number[] }
  }

  static getDerivedStateFromProps(nextProps: Table_Props, prev) {
    // console.log("props updated--- ", nextProps, Object.keys(prev.challengeResults).length);
    if ((Object.keys(prev.challengeResults).length>0)
      && (prev.columnFilter === nextProps.columnFilter)) return {}

    const columnFilter = nextProps.columnFilter
    // console.log(" STATE--- ");

    const possibleMetaMeasures = Object.entries(nextProps.config.measures).sort();
    let measureNames = []
    const measureEntries: { [key: string]: any } = {}
    possibleMetaMeasures.forEach(([k, v]) => {
      if (nextProps.columnFilter === '' || nextProps.columnFilter === k) {
        measureNames = [...measureNames, ...v]
        v.forEach(vv => measureEntries[vv] = [])
      }
    })

    const challenges = nextProps.config.challenges;
    const challengeNames = [] as ChallengeName[];

    const challengeResults = {};
    Object.entries(challenges)
      .forEach(([challenge, ch_data]) => {
        const res = {};
        ch_data.datasets.forEach((ds, i) => {
          challengeNames.push({
            challenge,
            ds,
            rs: i === 0 ? ch_data.datasets.length : -1
          })
          const measures = {}
          measureNames.forEach(mn => measures[mn] = [])
          challengeResults[ds] = measures
        })
        // challengeResults[ch_name] = res;
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
        // ignore non-submissions:
        if (datasubset == "submission" || typeof scoreData == "string") return;
        // only accept either val or test set:
        if (datasubset) {
          const dataset = datasubset;
          if (challengeResults[dataset]) {
            measureNames.map(dim => {
              const value = dim in scoreData ? extractValue(dim, scoreData[dim]) : null;
              if (value) {
                challengeResults[dataset][dim].push({value, sn})
              }
            })
          }
          // )
        }
      })
    })

    Object.entries(challengeResults).forEach(([k, ds]) => {
      Object.entries(ds).forEach(([k2, ress]) => {
        ress.sort((a, b) => b.value - a.value)
      })
    })


    // console.log(challengeResults, "--- challengeResults");
    //
    // console.log(nextProps.config, "--- nextProps.config");
    // console.log(nextProps.scores, "--- nextProps.scores");
    return {measureNames, challengeResults, challengeNames, columnFilter}
  }

  componentDidMount() {

  }

  render() {
    // console.log("render VTT--- ");
    const st = this.state;
    const format = (d) => Math.abs(d) < 1 ? d3.format('.3f')(d) : d3.format(".3s")(d);

    return <table className={"table"}
                  style={{
                    fontSize: "8pt",
                    borderCollapse: "collapse",
                    cursor: "crosshair",
                    marginBottom: '40px',
                    marginTop: '10px'
                  }}>
      <thead>
      <tr style={{height: '70px'}}>
        <th></th>
        <th></th>
        {st.measureNames.map(mn =>
          <th className={style.header}
              key={mn}
              style={{color: this.props.cm.getColorForMeasure(mn)}}>
            <div className={style.rot}>
              {mn}
            </div>
          </th>)}

      </tr>
      </thead>
      <tbody>
      {st.challengeNames
        .map(({challenge, ds, rs}) => {
          const results = st.challengeResults[ds];


          const val_cells = st.measureNames.map(mn => {
            const res = results[mn]
            let scale = x => 1;
            if (res.length > 1) {
              const linearScale = scaleLinear()
                .domain([res[res.length - 1].value, res[0].value])
              scale = x => linearScale(x)
            }


            return <td className={style.td_measure}
                       key={mn}
                       style={{borderLeft: "1px solid " + this.props.cm.getColorForMeasure(mn)}}>
              {res
                // .sort((a, b) => b.value - a.value)
                .filter((x, i) => i < this.props.tableMode)
                // .map(val => <Tippy theme={"translucent"} content={val.sn}><div>{format(val.value)}</div></Tippy>)}
                .map((val, i) => <Tippy theme={"translucent"}
                                        content={format(val.value)}
                                        key={val.sn}
                >
                  <div style={{
                    fontWeight: i == 0 ? 900 : 400,
                    whiteSpace: 'nowrap'
                    // fontSize: '6pt'
                  }}
                       className={style.measure}


                  >
                    <svg height={10} width={30}>
                      <rect width={scale(val.value) * 20 + 1}
                            height={10}
                            className={style.measureBar}
                        // style={{fill: "lightgray"}}
                      >

                      </rect>
                    </svg>
                    {val.sn}</div>
                </Tippy>)}
            </td>
          })
          return <tr className={style.tr_measure} key={ds}>
            {rs > 0 ?
              <td rowSpan={rs} key={"1st"}
                  style={{position: "sticky", left: "0px"}}
                  className={style.challenge}>{challenge}</td> : null}
            <td className={style.td_measure}
                key={"2nd"}
                style={{
                  position: "sticky",
                  left: "75px",
                  backgroundColor: "#eee"
                }}>{ds.split("_").join(' ')}</td>
            {val_cells}
          </tr>
        })}
      </tbody>

    </table>;
  }


}
