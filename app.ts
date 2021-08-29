import { Realm, CreateRealms, GroupByCollections } from "./classes/realm"
import { IMap, SquareLength } from "./classes/structures/imap"
import { config } from './config'

const expressHbs = require('express-handlebars')
const express = require('express')
const hbs = require('hbs')

hbs.registerPartials(__dirname + '/views/layouts')

const app = express()

app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/layouts/',
    defaultLayout:'main',
    extname: 'hbs',
    helpers: require('./hbs-helpers')
  })
)
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.json())

var realms: Realm[]
CreateRealms().then(e => realms = e)

app.get('/test', (req: any, res: any) => {
  const r = realms[realms.length - 1]
  r.minimap.rotate()
  res.render('layouts/minimap', { array: r.minimap.array, colors: IMap.NumberToColor })
})

app.get('/:realmName', (req: any, res: any, next: any) => {
  const { realmName } = req.params
  let { rotate } = req.query
  rotate |= 0
  if (!realmName) {
    return next()
  }
  var realm = realms.filter(x => x.title === realmName)[0]
  if (!realm) {
    return next()
  }
  

  if (rotate && parseInt(rotate)) {
    rotate = parseInt(rotate) % 4
    realm = Realm.CreateFrom(realm)
    realm.minimap.array = realm.minimap.rotate(rotate)
  }

  const map = realm.map
  const array = map.array
  const colors = IMap.NumberToColor
  const center = JSON.stringify(map.center)
  const shack = JSON.stringify(map.findShack())
  
  res.render('realm', { array, colors, center, shack, SquareLength, rotate })
})

app.get('/', async (req: any, res: any) => {
  const grouped = GroupByCollections(realms)
  const colors = IMap.NumberToColor
  res.render('index', { grouped, colors })
})

app.listen(config.PORT, () => {
  console.log(`Example app listening at http://localhost:${config.PORT}`)
})
