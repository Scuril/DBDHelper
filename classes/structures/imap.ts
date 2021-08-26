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

  public NumberToColor = [
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

  public rotate(count: number = 1): void {
    if (this.array.length === 0)
      throw new Error("Array isn't exist, but tried to rotate")

    for (let i = 0; i < count; i++) {
      this.array = this.array[0].map((_, j) => this.array.map(x => x[this.array[0].length -1 - j]))
    }
  }

  protected findShack(): coordinates {
    throw new Error("Not Implement Exception")
  }

  public normalize(): void {
    const shack = this.findShack()
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
        this.rotate(2)
      }
    }
    else if (!sqmap) {
      if (left) {
        this.rotate()
      }
      else {
        this.rotate(3)
      }
    }
  }
}