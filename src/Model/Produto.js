const mongoose = require('mongoose');

const ProdutoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    }, 
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        ref: "categorias",
        required: true
    },
});

module.exports = mongoose.model('Produtos', ProdutoSchema);