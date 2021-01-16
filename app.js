const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerProduto = require('./src/router/routerProduto');

const app = express();


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/produtos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

});

app.use('/', routerProduto);

const PORT = 3333;
app.listen(PORT, () => {
    console.log('Server is running');
});