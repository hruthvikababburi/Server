require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const authRoutes = require('./authRoutes')
const todoRoutes = require('./todoRoutes')
const profileRoutes = require('./profileRoutes')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.listen(PORT,()=>{
    console.log(`Server is successfully running at port ${PORT}`);
})

app.use('/api/auth',authRoutes)
app.use('/api/todos',todoRoutes)
app.use('/api',profileRoutes)