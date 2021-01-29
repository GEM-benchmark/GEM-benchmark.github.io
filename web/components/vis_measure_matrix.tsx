import React from "react";
import {EvalConfiguration} from "../lib/results";
import style from "./vis_measure_matrix.module.css"

export class MeasureMatrix extends React.Component<{ config: EvalConfiguration }, any> {
  state = {}

  colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']
  drawColor = (i: number) => {
    return this.colors[i % (this.colors.length)]
  }
  colorMap: { [key: string]: string } = {}

  render() {
    const all_measures = this.props.config.measures;
    const cm = this.colorMap;
    const rows = Object.keys(all_measures).sort().map((metaName, metaIndex) => {
      const metaColor = this.drawColor(metaIndex);
      cm[metaName] = metaColor;
      const measures = all_measures[metaName].map(measure =>{
        cm[measure] = metaColor;
        return <div key={measure} className={style.measureBox}>{measure}</div>
      })
      return <div key={metaName}
                  style={{display: "flex", flexDirection: "row"}}>
        <div className={[style.box].join(" ")} style={{background:metaColor}}>{metaName}</div>
        <div>{measures}</div>
      </div>
    })

    return <div className={[style.matrix].join(" ")}>{rows}</div>;
  }

  public colorForMeasure = (measureID: string) => {
    if (measureID in this.colorMap) return this.colorMap[measureID];
    else return "";
  }

}
