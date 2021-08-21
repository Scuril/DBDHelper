import { promises } from 'fs'
import { join } from 'path'
const { readFile, readdir } = promises

function getArrayDepth<T>(v: T): number {
  return Array.isArray(v) ? 1 + Math.max(...v.map(getArrayDepth)) : 0
}
const SquareLength = 8
const NumberToColor = [
  'nothing',
  'clear-area',
  'object',
  'construction',
  'dynamic-structure',
  'static-structure',
  'main',
  'shack'
]

type coordinates = {
  x: number,
  y: number
}
type minimapArray = number[][]
type mapArray = minimapArray[][]
type preHtmlMinimap = {
  color: string,
  coors: coordinates
}[][]
type preHtmlMap = preHtmlMinimap[][]

export class Realm {
  private minimap: minimapArray

  public readonly collection: string
  public readonly title: string

  constructor(collection: string, title: string, mapArray: minimapArray) {
    this.collection = collection
    this.title = title
    this.minimap = mapArray
  }

  private get map(): mapArray {
    return Realm.makeBigMap(this.minimap)
  }

  public get center(): coordinates {
    return Realm.getCenter(this.minimap)
  }

  public rotate(): void {
    if (this.minimap.length === 0)
      throw new Error("Array isn't exist, but tried to rotate")

    this.minimap = this.minimap[0].map((_, j) => this.minimap.map(x => x[j]))
  }

  public makeHtmlMinimap(): Promise<string> {
    return Realm.toHtml(this.minimap)
  }
  public makeHtmlMap(): Promise<string> {
    return Realm.toHtml(this.map)
  }


  public static getCenter(array: minimapArray): coordinates {
    const inOne = array.reduce((a, v) => a.concat(v)).filter(x => x)
    let x = array.map((x, i) => x.map(y => y ? i+0.5 : 0)).reduce((a, v) => a.concat(v)).reduce((a, v) => a + v) / inOne.length
    let y = array.map(x => x.map((y, j) => y ? j+0.5 : 0)).reduce((a, v) => a.concat(v)).reduce((a, v) => a + v) / inOne.length

    return { x, y }
  }
  public static makeBigMap(array: minimapArray): mapArray {
    return array.map(x => x.map(y =>
        new Array(SquareLength).fill(new Array(SquareLength).fill(y))
      )
    )
  }
  public static prepareToHtml(array: minimapArray | mapArray): preHtmlMinimap | preHtmlMap {
    if (getArrayDepth(array) === 2) {
      array = array as minimapArray
      return array.map((x, i) => x.map((y, j) => ({
        color: NumberToColor[y],
        coors: {
          'x': j,
          'y': i
        }
      })))
    }
    if (getArrayDepth(array) === 4) {
      array = array as mapArray
      return array.map((w, i0) => w.map((x, j0) => x.map((y, i) => y.map((z, j) => ({
        color: NumberToColor[z],
        coors: {
          'x': j0 * SquareLength + j,
          'y': i0 * SquareLength + i
        }
      })))))
    }

    throw new Error("Bad array depth")
  }
  public static async toHtml(array: minimapArray | mapArray): Promise<string> {
    const classes = Realm.prepareToHtml(array)

    let file = 'views/layouts/'
    if (getArrayDepth(array) === 2) {
      file += 'minimap.hbs'
    }
    else if (getArrayDepth(array) === 4) {
      file += 'map.hbs'
    }
    else {
      throw new Error("Bad array depth")
    }

    const data = (await readFile(file)).toString()
    return require('handlebars').compile(data)({ classes })
  }
}

export async function CreateRealms(): Promise<Realm[]> {
  let realms: Realm[] = []

  const base = 'MapStructures/'
  const folders = await readdir(base)
  for (const folder of folders) {
    const files = await readdir(join(base, folder))
    for (const file of files) {
      const data = (await readFile(join(base, folder, file))).toString()
      
      if (data.indexOf('[') === -1) continue

      realms.push(new Realm(folder, file.replace('.txt', '').split('-').map(val => val[0].toUpperCase() + val.substr(1)).join(' '), JSON.parse(data)))
    }
  }

  return realms
}