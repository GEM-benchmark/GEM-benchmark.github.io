import React from "react";
import {EvalConfiguration} from "../lib/results";
import style from "./vis_measure_matrix.module.css"
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import {ColorManager} from "../lib/vis_color_manager";

export class MeasureMatrix extends React.Component<{ config: EvalConfiguration, cm:ColorManager }, any> {
  state = {}

  render() {
    const all_measures = this.props.config.measures;
    const md = this.props.config.common_metrics
    const rows = Object.keys(all_measures).sort().map((metaName, metaIndex) => {
      const metaColor = this.props.cm.getColorForMeasure(metaName);
      const measures = all_measures[metaName].map(measure => {
        return <Tippy key={measure} content={md[measure].description} delay={0}>
          <div  className={style.measureBox}
               style={{borderColor: metaColor}}>{md[measure].show_as}</div>
        </Tippy>
      })
      return <div key={metaName}
                  style={{display: "flex", flexDirection: "row"}}>
        <div className={[style.metaBox].join(" ")}
             style={{background: metaColor}}>{metaName}</div>
        <div>{measures}</div>
      </div>
    })

    return <div className={[style.matrix].join(" ")}>{rows}</div>;
  }

}
