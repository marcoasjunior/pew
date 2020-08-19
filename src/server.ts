import * as express from 'express'
import * as dotenv from "dotenv"
import router from './routes/router'
import * as bodyParser from 'body-parser'

dotenv.config()

const port = process.env.PORT || 3333

const app = express()

app.use(bodyParser.json())

app.use(router)

app.listen(port, () => {

    console.log('On ' + port)

})