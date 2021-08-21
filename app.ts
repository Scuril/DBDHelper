import { Realm, CreateRealms } from "./map"
import { config } from './config'

const expressHbs = require('express-handlebars')
const express = require('express')
const axios = require('axios')
const hbs = require('hbs')

const app = express()

app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout:'main',
    extname: 'hbs'
  })
)
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.json())

app.get('/', async (req: any, res: any) => {
  const rs = await CreateRealms()
  const minimap = await rs[0].makeHtmlMap()
  console.log(rs[0].center)
  res.render('index', { minimap })
})

app.listen(config.PORT, () => {
  console.log(`Example app listening at http://localhost:${config.PORT}`)
})
