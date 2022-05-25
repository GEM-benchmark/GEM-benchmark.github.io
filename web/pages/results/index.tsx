import Layout from "../../components/layout";
import React from "react";
import {
  EvalConfiguration,
  getEvalConfiguration,
  getSubmissionScores, Scores,
} from "../../lib/results";
import {MeasureMatrix} from "../../components/vis_measure_matrix";
import {ColorManager} from "../../lib/vis_color_manager";
import {PCP} from "../../components/vis_pc_plot";
import {SubmissionMatrixInv} from "../../components/vis_submission_matrix_inv";
import {SubmissionMatrix} from "../../components/vis_submission_matrix";
import {TableTask} from "../../components/vis_table_tasks";

const URL_RESULTS_HF = "https://huggingface.co/datasets/GEM-submissions/submission-scores/resolve/main/filtered_scores.json"

export async function getStaticProps() {
  const evalConfig = getEvalConfiguration();
  return {
    props: {
      evalConfig
    },
  };
}

interface MainVisProps {
  evalConfig: EvalConfiguration,
  // scores: Scores[], // NO PROP ANYMORE but STATE
  cm: ColorManager
}


class MainVis extends React.PureComponent<MainVisProps, any> {
  state = {
    submissionFilter: null as string[] | null,
    highlighted: [] as string[],
    tableMode: 5,
    columnFilter: '',
    loadingState: true as boolean,
    scores:[] as Scores[]
  }

  componentDidMount() {
    fetch(URL_RESULTS_HF).then(res => res.json()).then(res => {
      this.setState({loadingState: false, scores: res})
    })

  }


  render() {
    if (this.state.loadingState) return <> loading ...</>
    else if (this.state.scores.length<1) return <> No data available </>
    else return <>
      {/*<pre>{JSON.stringify(this.props.scores,null,2)}</pre>*/}
      <div style={{
        display: "flex", alignItems: "stretch", flexWrap: "wrap"
      }}>
        <div style={{flex: 1}}>
          <h4 style={{marginBottom: "5px"}}> Submissions & Scores </h4>
          <div style={{maxHeight: "200px", overflowY: "auto"}}>
            <SubmissionMatrix
              config={this.props.evalConfig}
              scores={this.state.scores}
              submissionFilter={this.state.submissionFilter}
              onHover={(ds, hover) => {
                this.setState({highlighted: hover ? ds : []})
              }}
              highlighted={this.state.highlighted}
            />
          </div>
        </div>
        <div style={{flex: 1}}>
          < h4 style={{marginBottom: "5px"}}> Measures </h4>
          <div style={{maxHeight: "200px", overflowY: "auto"}}>
            <MeasureMatrix
              config={this.props.evalConfig}
              cm={this.props.cm}/>
          </div>

        </div>
      </div>
      <div>
        < h4 style={{marginBottom: "5px"}}> Visualization </h4>
        <div style={{textAlign: "center"}}>
          <PCP cm={this.props.cm}
               config={this.props.evalConfig}
               scores={this.state.scores}
               onFilterChange={(list) => {
                 this.setState({submissionFilter: list})
               }}
               highlighted={this.state.highlighted}
               onDatasetHover={(ds, hover) => {
                 this.setState({highlighted: hover ? [ds] : []})
               }}
          />

        </div>
      </div>
      <div>
        < h4 style={{marginBottom: "5px"}}> Table </h4>
        <div>
          Results:
          <select className={"select"}
                  onChange={(e) => {
                    this.setState({tableMode: +e.target.value})
                    // console.log(e.target.value, "--- ")
                  }}
                  defaultValue={5}
          >
            <option value={Infinity}>all</option>
            <option value={5}>top 5</option>
            <option value={1}>top 1</option>
          </select>,
          Measures:
          <select className={"select"}
                  onChange={(e) => {
                    this.setState({columnFilter: e.target.value})
                    // console.log(e.target.value, "--- ")
                  }}
                  defaultValue={''}
          >
            <option value=""> all</option>
            {Object.keys(this.props.evalConfig.measures)
              .map(k => <option value={k} key={k}>{k}</option>)}
          </select>
        </div>
        <div style={{overflowX: "scroll"}}>
          <TableTask cm={this.props.cm}
                     config={this.props.evalConfig}
                     scores={this.state.scores}
                     tableMode={this.state.tableMode}
                     columnFilter={this.state.columnFilter}
            // onFilterChange={(list) => {
            //   // this.setState({submissionFilter: list})
            // }}
            // highlighted={this.state.highlighted}
            // onDatasetHover={(ds, hover) => {
            //   // this.setState({highlighted: hover ? [ds] : []})
            // }}
          />

        </div>
      </div>
    </>
  }
}


export default function index(props) {
  const cm = ColorManager
    .generateForEvalConfig(props.evalConfig);


  return <Layout home={false} nlAugmenter={false} wideContainer={true}>
    <MainVis evalConfig={props.evalConfig}
             cm={cm}/>
  </Layout>;

}

