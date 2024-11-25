const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const { env } = require('./src/db/models/index')

const app = express()

const corsOptions = {
    origin: [
        'http://example.com'
    ],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/image', express.static('./images'))
app.use(express.json())
app.use(require('./src/routes/routes'))

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`ENV on ${env}`)
    console.log(`Listening on port: ${port}`)
})
