import React from "react";
import {ColorManager} from "../lib/vis_color_manager";
import {EvalConfiguration, Scores} from "../lib/results";
import style from "./vis_submission_matrix.module.css"
import * as d3 from "d3";


interface SubMatProps {
  config: EvalConfiguration,
  scores: Scores[],
  subset: string,
  submissionFilter: string[] | null,
  onHover: (s: string[], hovered: boolean) => void,
  highlighted: string[],
  // onDatasetSelect: (datasets: string[]) => void,
  // onDatasetHover: (dataset: string, hover: boolean) => void
}

interface DSHierarchy {
  task: string,
  datasets: { ds: string, submissions: string[] }[]
}


interface SubMatStates {
  datasetHierarchy: DSHierarchy[]
}

export class SubmissionMatrix
  extends React.PureComponent<SubMatProps, SubMatStates> {

  state = {
    datasetHierarchy: [] as DSHierarchy[]
  }

  static defaultProps = {
    submissionFilter: null,
    onHover: (sn, hov) => console.log(sn, hov, "--- sn,hov"),
    highlighted: []
  }

  static getDerivedStateFromProps(props: SubMatProps, oldStates) {

    const dsFullName = (ds) => `${ds}_${props.subset}`
    const datasetHierarchy = Object.keys(props.config.challenges)
      .sort()
      .map(task => {
        const datasets =
          props.config.challenges[task].datasets
            .map(dsPart => {
              const ds = dsFullName(dsPart)
              const submissions = props.scores
                .filter(score => ds in score)
                .map(score => score.submission_name)
              return {ds, submissions}
            })
            .filter(x => x.submissions.length > 0)
            .sort((a, b) =>
              d3.ascending(a.ds, b.ds))
        return {task, datasets}
      })
    return {datasetHierarchy}
  }


  render() {
    console.log(this.state.datasetHierarchy, "--- this.state.datasetHierarchy");
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


    const tasklist = this.state.datasetHierarchy.map(t => {
      const datasets = t.datasets.map(dd => {
        const ds = dd.ds;
        const submissions = dd.submissions
          .map(sn => <div
            key={sn}
            className={submissionClasses(sn, ds)}
            onMouseEnter={() => this.props.onHover([`${sn}.${ds}`], true)}
            onMouseLeave={() => this.props.onHover([`${sn}.${ds}`], false)}
          >{sn}</div>)
        return <div key={dd.ds} style={{display: "flex"}}>
          <div
            className={style.metaBox}
            onMouseEnter={() => this.props.onHover(dd.submissions.map(sn=>`${sn}.${ds}`), true)}
            onMouseLeave={() => this.props.onHover(dd.submissions.map(sn=>`${sn}.${ds}`), false)}
          >{dd.ds}</div>
          <div>{submissions}</div>
        </div>
      })
      return <div key={t.task} style={{display: "flex", margin: "2pt 0"}}>
        <div className={style.metaMetaBox}>{t.task}</div>
        <div>{datasets}</div>
      </div>
    })

    return <div className={style.matrix}>{tasklist}</div>

    // const submissions = this.props.scores.map(submission => {
    //
    //
    //   const sn = submission.submission_name;
    //   const datasets = Object.keys(submission)
    //     .filter(ds => ds.endsWith("_" + this.props.subset))
    //     //   && !(typeof ds == "string"))
    //     .map(ds =>
    //       <div key={ds}
    //            className={submissionClasses(sn, ds)}
    //            onMouseEnter={() => this.props.onHover(`${sn}.${ds}`, true)}
    //            onMouseLeave={() => this.props.onHover(`${sn}.${ds}`, false)}
    //       >{ds}</div>)
    //
    //
    //   return <div key={sn}
    //               style={{display: "flex", flexDirection: "row"}}>
    //     <div className={[style.metaBox].join(" ")}
    //     >{sn}</div>
    //     <div>{datasets}</div>
    //   </div>
    // })
    //
    //
    // return <div className={style.matrix}>{submissions}</div>;
  }

}
