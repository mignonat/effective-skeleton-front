const express = require('express')
const app = express()
const path = require('path')

const supportedLocales = [ 'fr', 'en' ]
const indexesDir = path.join(__dirname+'/../public/html/')

//Give access to assets directories
app.use(express.static('public'))
app.use(express.static('node_modules/vue/dist/'))
app.use(express.static('node_modules/vue-router/dist/'))
app.use(express.static('node_modules/vuex/dist/'))

const redirectToIndexFn = (req, res) => res.sendFile(indexesDir+'/index.html')

//Routes
app.get('/', (req,res) => res.redirect('/home'))
app.get('/home', redirectToIndexFn)
app.get('/care', redirectToIndexFn)
app.get('/clean', redirectToIndexFn)
app.get('/wellbeing', redirectToIndexFn)
app.get('/testimony', redirectToIndexFn)
app.get('/contact', redirectToIndexFn)
app.get('*', (req,res) => res.redirect('/home'))

//Start listening
app.listen(8080)