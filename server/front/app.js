const express = require('express')
const path = require('path')
const compression = require('compression')
const debug = require('debug')('http')

const app = express()

console.log('Environment : '+process.env.NODE_ENV) ;
debug('Starting application')

//Give access to assets directories
app.use(express.static('public'))

//Compress data to reduce network package size
app.use(compression())

const htmlDir = path.join(__dirname+'/../../public/html/')

const homePageFn = (req, res) => res.sendFile(htmlDir+'/index.html')
const notFoundFn = (req, res) => res.status(404).sendFile(htmlDir+'/404.html')

//Routes
app.get('/', (req, res) => res.redirect("/home"))
app.get('/home', homePageFn)
app.get('/care', homePageFn)
app.get('/clean', homePageFn)
app.get('/wellbeing', homePageFn)
app.get('/testimony', homePageFn)
app.get('/contact', homePageFn)
app.get('/error', homePageFn)
app.get('*', notFoundFn)

//Start listening
app.listen(8080)
