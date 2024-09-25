const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 5000

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.listen(PORT,()=>{
    console.log(`Server is successfully running at port ${PORT}`);
})