import * as mongoose from 'mongoose'
require('dotenv').config()

const CONNECTION = process.env.MONGOURI

export default mongoose.connect(CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

