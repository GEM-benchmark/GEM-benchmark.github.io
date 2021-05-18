import React from "react";
import {ColorManager} from "../lib/vis_color_manager";
import {EvalConfiguration, Scores} from "../lib/results";
import style from "./vis_submission_matrix.module.css"


interface SubMatProps {
  config: EvalConfiguration,
  scores: Scores[],
  subset: string,
  submissionFilter: string[] | null,
  onHover: (s: string, hovered: boolean) => void,
  highlighted: string[],
  // onDatasetSelect: (datasets: string[]) => void,
  // onDatasetHover: (dataset: string, hover: boolean) => void
}

export class SubmissionMatrixInv
  extends React.PureComponent<SubMatProps, any> {

  static defaultProps = {
    submissionFilter: null,
    // onHover: (sn, hov) => console.log(sn, hov, "--- sn,hov"),
    highlighted: []
  }

  render() {
    const filters = this.props.submissionFilter;
    const highligted = this.props.highlighted
    const submissionClasses = (s, ds) => {
      return [style.dsBox,
        highligted.indexOf(`${s}.${ds}`) > -1 ? style.dsBoxHover : '',
        filters ?
          (filters.indexOf(`${s}.${ds}`) > -1 ?
            style.selected : style.nonSelected)
          : ''
      ].join(" ")
    }

    const submissions = this.props.scores.map(submission => {


      const sn = submission.submission_name;
      const datasets = Object.keys(submission)
        .filter(ds => ds.endsWith("_" + this.props.subset))
        //   && !(typeof ds == "string"))
        .map(ds =>
          <div key={ds}
               className={submissionClasses(sn, ds)}
               onMouseEnter={() => this.props.onHover(`${sn}.${ds}`, true)}
               onMouseLeave={() => this.props.onHover(`${sn}.${ds}`, false)}
          >{ds}</div>)


      return <div key={sn}
                  style={{display: "flex", flexDirection: "row"}}>
        <div className={[style.metaBox].join(" ")}
        >{sn}</div>
        <div>{datasets}</div>
      </div>
    })


    return <div className={style.matrix}>{submissions}</div>;
  }

}
