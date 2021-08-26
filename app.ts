import { Realm, CreateRealms, GroupByCollections } from "./classes/realm"
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
    helpers: {
      'get_item_from_array': (array: any[], index: number) => {
        return array[index]
      },
      'log_item': (item: any) => {
        console.log(item)
        return item
      },
      'eachInMap': (map: any, block: any) => {
        let out = '';
        [...map.keys()].forEach((prop: string) => {
          out += block.fn({ key: prop, value: map.get(prop) })
        });
        return out;
      },
      "each": (context: any, options: any) => {
        let ret = "";
        for (var i = 0, j = context?.length | 0; i < j; i++) {
          let a = {
            item: context[i],
            _i: i
          }
          ret += options.fn(a);
        }
        return ret;
      }
    }
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
  res.render('layouts/minimap', { array: r.minimap.array, colors: r.minimap.NumberToColor })
})

app.get('/:realmName', (req: any, res: any, next: any) => {
  const { realmName } = req.params
  const realm = realms.filter(x => x.title === realmName)[0]
  if (!realm) {
    return next()
  }
  res.render('realm', { array: realm.map.array, colors: realm.map.NumberToColor })
})

app.get('/', async (req: any, res: any) => {
  const grouped = GroupByCollections(realms)
  res.render('index', { grouped })
})

app.listen(config.PORT, () => {
  console.log(`Example app listening at http://localhost:${config.PORT}`)
})
