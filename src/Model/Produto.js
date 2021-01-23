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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorias",
        required: true
    },
    data:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Produtos', ProdutoSchema);