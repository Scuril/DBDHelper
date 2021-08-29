export function getArrayDepth<T>(v: T): number {
    return Array.isArray(v) ? 1 + Math.max(...v.map(getArrayDepth)) : 0
}
export function findDoubleArrayIndex<T>(array: T[][], item: T): {'x': number, 'y': number}[] {
    return array.map((x, i) => x.map((y, j) => ({y, i, j}))).reduce((a, v) => a.concat(v)).filter(x => x.y === item).map(x => ({ 'x': x.j, 'y': x.i }))
}