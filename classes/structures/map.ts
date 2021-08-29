import { findDoubleArrayIndex } from "../utils/array";
import { IMap, SquareLength, coordinates } from "./imap";

export class Bigmap extends IMap<number[][]> {
  public get center(): coordinates {
    const inOne = this.array.reduce((a, v) => a.concat(v)).filter(x => x[0][0])
    let y = this.array.map((x, i) => x.map(y => y[0][0] ? i+0.5 : 0)).reduce((a, v) => a.concat(v)).reduce((a, v) => a + v) / inOne.length * SquareLength
    let x = this.array.map(x => x.map((y, j) => y[0][0] ? j+0.5 : 0)).reduce((a, v) => a.concat(v)).reduce((a, v) => a + v) / inOne.length * SquareLength

    return { x, y }
  }
  
  public findShack(): coordinates[] {
    let a: coordinates[] = []
    this.array.forEach((x, i) => x.forEach((y, j) => {
      if (y[0][0] === 7) {
        a = findDoubleArrayIndex(y, 7).map(z => ({'x': z.x + i * SquareLength, 'y': z.y + j * SquareLength}))
      }
    }))
    return a
  }
}