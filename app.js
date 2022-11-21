import { mongdbConnection } from './src/config/db.js'
import express from 'express'
import routes from './src/routers/index.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

const { json, urlencoded } = bodyParser

mongdbConnection.connection()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))
app.use('/core', routes)

export default app