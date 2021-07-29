const express = require('express');
const  mongoose  = require('mongoose');
const router = express.Router();

require('../Model/Produto');
const Produto = mongoose.model('Produtos');

require('../Model/Categoria');
const Categoria = mongoose.model('Categorias');

