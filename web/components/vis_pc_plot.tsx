import React from "react";
import {ColorManager} from "../lib/vis_color_manager";
import {EvalConfiguration, Scores} from "../lib/results";

export class PCP
  extends React.Component<{
    cm: ColorManager,
    config: EvalConfiguration,
    scores: Scores[]
  }, any> {


  render() {
    return <div>{JSON.stringify(this.props.scores)}</div>;
  }

}
