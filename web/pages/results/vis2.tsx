import Layout from "../../components/layout";
import React from "react";
import {getEvalConfiguration, getSubmissionScores,} from "../../lib/results";
import {MeasureMatrix} from "../../components/vis_measure_matrix";
import {ColorManager} from "../../lib/vis_color_manager";
import {PCP} from "../../components/vis_pc_plot";


export async function getStaticProps() {
  const evalConfig = getEvalConfiguration();
  const scores = getSubmissionScores();
  return {
    props: {
      evalConfig,
      scores
    },
  };
}

class SimpleVis extends React.Component {
  state = {myName: "Hendrik", showMe: false}


  render() {
    return <div>
      <h1>Hello World {this.state.myName}</h1>
      {this.state.showMe && <h3>Subtitle</h3>}
      <button onClick={this.setName}> Hen</button>
      <button onClick={this.setName}> None</button>
    </div>

  }

  setName = (event) => {
    console.log(this.props, "--- this.props");
    this.setState({myName: event.target.textContent})
    this.setState({showMe: !this.state.showMe})
  }
}


export default function vis2(props) {
  const cm = ColorManager
    .generateForEvalConfig(props.evalConfig);

  return <Layout home={false}>
    <h4> Measures </h4>
    {/*<SimpleVis></SimpleVis>*/}
    {/*<pre style={{fontSize:"6pt"}}>{JSON.stringify(x, null,2)}</pre>*/}
    <MeasureMatrix config={props.evalConfig} cm={cm}/>
    <PCP cm={cm} config={props.evalConfig} scores={props.scores}></PCP>
  </Layout>;

}

