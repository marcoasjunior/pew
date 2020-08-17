import * as express from 'express'
import * as dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 3333

const app = express()

app.listen(port, () => {

    console.log('On ' + port)

})