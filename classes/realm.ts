import { promises } from 'fs'
import { join } from 'path'
import { minimapArray } from './structures/imap'
import { Minimap } from './structures/minimap'
import { Bigmap } from './structures/map'
const { readFile, readdir } = promises

export class Realm {
  public readonly minimap: Minimap
  public get map(): Bigmap {
    return this.minimap.toMap()
  }

  public readonly collection: string
  public readonly title: string

  constructor(collection: string, title: string, mapArray: minimapArray) {
    this.collection = collection
    this.title = title
    this.minimap = new Minimap(mapArray)
    
    this.minimap.normalize()
  }

  public static CreateFrom(realm: Realm) {
    return new Realm(realm.collection, realm.title, realm.minimap.array)
  }
}

export function GroupByCollections(realms: Realm[]): Map<string, Realm[]> {
  const collections = [...new Set(realms.map(x => x.collection))]
  var grouped = new Map<string, Realm[]>()
  
  for (const c of collections) {
    grouped.set(c, realms.filter(x => x.collection === c))
  }
  
  return grouped
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