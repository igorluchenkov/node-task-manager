const express = require('express')
const tasksRoutes = require('./routes/tasks')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })
	.then(() => console.log('connected to MongoDB...'))
	.catch(console.error)

app.use(express.json())
app.use('/tasks/', tasksRoutes)

const port = process.env.port || 3000
app.listen(port)