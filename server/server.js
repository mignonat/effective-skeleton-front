var express = require('express');

var app = express();
var path = require('path');

//Give access to assets directories
app.use(express.static('public')) ;
app.use(express.static('node_modules/vue/dist/')) ;
app.use(express.static('node_modules/vue-router/dist/')) ;
app.use(express.static('node_modules/vuex/dist/')) ;

var redirectToIndex = (req, res) => {
    res.sendFile(path.join(__dirname+'/../index.html'));
}

//Routes
app.get('/', redirectToIndex);
app.get('/care', redirectToIndex);
app.get('/clean', redirectToIndex);
app.get('/weelbeing', redirectToIndex);
app.get('/testimony', redirectToIndex);
app.get('/contact', redirectToIndex);

//Start listening
app.listen(8080);