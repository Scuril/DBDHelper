export type coordinates = {
  x: number,
  y: number
}
export type minimapArray = number[][]
export type mapArray = minimapArray[][]
export type preHtmlMinimap = {
    color: string,
    coors: coordinates
}[][]
export type preHtmlMap = preHtmlMinimap[][]

export const SquareLength = 4

export class IMap<T> {
  public array: T[][]

  public static NumberToColor = [
    'nothing',
    'clear-area',
    'object',
    'construction',
    'dynamic-structure',
    'static-structure',
    'main',
    'shack'
  ]

  constructor(array: T[][]) {
    this.array = array
  }

  public get center(): coordinates {
    throw new Error("Not Implement Exception")
  }

  public rotate(count: number = 1): T[][] {
    if (this.array.length === 0)
      throw new Error("Array isn't exist, but tried to rotate")

    var a = this.array
    for (let i = 0; i < count; i++) {
      a = a[0].map((_, j) => a.map(x => x[a[0].length -1 - j]))
    }
    
    return a
  }

  public findShack(): coordinates[] {
    throw new Error("Not Implement Exception")
  }

  public normalize(): void {
    let shack: coordinates | coordinates[] = this.findShack()
    shack = shack?.[Math.floor(shack?.length / 2)]
    if (!shack) {
      return
    }
    const center = this.center
  
    const vertmap = this.array.length > this.array[0].length
    const sqmap = this.array.length === this.array[0].length
    const [top, left] = [
      shack.y < center.y,
      shack.x < center.x
    ]
    
    if (vertmap || sqmap) {
      if (top) {
        this.array = this.rotate(2)
      }
    }
    else if (!sqmap) {
      if (left) {
        this.array = this.rotate()
      }
      else {
        this.array = this.rotate(3)
      }
    }
  }
}