import { connect } from 'mongoose'
require('dotenv').config()

const CONNECTION = process.env.MONGOURI

connect(CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})