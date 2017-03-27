const express = require('express')
const app = express()
const path = require('path')

//Give access to assets directories
app.use(express.static('public'))

const indexesDir = path.join(__dirname+'/../public/html/')
const redirectToIndexFn = (req, res) => res.sendFile(indexesDir+'/index.html')

//Routes
app.get('/', (req,res) => res.redirect('/home'))
app.get('/home', redirectToIndexFn)
app.get('*', (req,res) => res.redirect('/home'))

//Start listening
app.listen(8080)