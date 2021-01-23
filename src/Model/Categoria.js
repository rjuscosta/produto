const mongoose = require('mongoose')


const categoriaSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    data:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Categorias', categoriaSchema)