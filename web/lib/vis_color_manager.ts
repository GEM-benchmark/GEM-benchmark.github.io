import {EvalConfiguration} from "./results";

export class ColorManager {
  private colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']
  private colorMap: { [key: string]: string } = {}


  public drawColor = (i: number) => {
    return this.colors[i % (this.colors.length)]
  }

  public getColorForMeasure = (measureID: string) => {
    if (measureID in this.colorMap) return this.colorMap[measureID];
    else return "";
  }


  public static generateForEvalConfig(ec: EvalConfiguration) {
    const cm = new ColorManager()
    const all_measures = ec.measures;
    Object.keys(all_measures).sort().map((metaName, metaIndex) => {
      const metaColor = cm.drawColor(metaIndex);
      cm.colorMap[metaName] = metaColor;
      all_measures[metaName].map(measure => {
        cm.colorMap[measure] = metaColor;
      })
    })

    return cm;
  }


}
