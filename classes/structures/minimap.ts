import { findDoubleArrayIndex } from "../utils/array";
import { IMap, SquareLength, preHtmlMinimap, coordinates } from "./imap";
import { Bigmap } from "./map";

export class Minimap extends IMap<number> {
  public get contour(): coordinates[] {
    return this.array.map((x, i) => x.map((y, j) => y ? { 'x': i, 'y': j } : 0)).reduce((a, v) => a.concat(v)).filter(x => x !== 0) as coordinates[]
  }

  public get center(): coordinates {
    const inOne = this.array.reduce((a, v) => a.concat(v)).filter(x => x)
    let x = this.array.map((x, i) => x.map(y => y ? i+0.5 : 0)).reduce((a, v) => a.concat(v)).reduce((a, v) => a + v) / inOne.length
    let y = this.array.map(x => x.map((y, j) => y ? j+0.5 : 0)).reduce((a, v) => a.concat(v)).reduce((a, v) => a + v) / inOne.length

    return { x, y }
  }

  public toMap(): Bigmap {
    const bigmapArr = this.array.map(x => x.map(y =>
      new Array(SquareLength).fill(new Array(SquareLength).fill(y))
      )
    )
    return new Bigmap(bigmapArr)
  }

  protected findShack(): coordinates {
    return findDoubleArrayIndex(this.array, 7)
  }
}