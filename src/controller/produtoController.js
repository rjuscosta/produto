const mongoose = require('mongoose');

require('../ModelProduto')
const Produto = mongoose.model('Produtos');

require('../Model/Categoria');
const Categoria = mongoose.model('Categorias');

module.exports = {
    
//cadastro de categorias
 async createCategorias(req, res)  {
    await Categoria.create(req.body).then(categorias => {

            return res.json({ message: 'categoria cadastrada com sucesso!' })
    }).catch(err => {
        return res.status(400).json({ message: 'Erro ao cadastrar a categoria!' +err})
    })

    
},

//listagem do produto
 async getProdutos(req, res)  {
   await Produto.find().lean().populate("categoria").sort().then((produtos) => {
        return res.json(produtos)
    }).catch((err) => {
        res.json({message: 'Nenhum produto encontrado!'})
    })
},



//Aqui busca as categorias cadastradas

 async getCategorias(req, res)  {
    await Categoria.find().then(categorias => {
            return res.json(categorias)
    }).catch(err => {
        return res.status(400).json({ message: 'Erro ao encontrar as categorias!' +err})
    })
    
},
//cadastro do produto
 async createProduto(req, res)  {

    const novoProduto = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
    }

    new Produto(novoProduto).save().then(() => {
        res.json({message: 'Produto cadastrado com sucesso!'})
    }).catch((err) => {
        return res.status(400).json({ message: 'Erro ao cadastrar o produto!' +err})
    })
   
    
},


//Edição da categoria do produto
 async updateCategoria(req, res)  {

    const {category} = req.body;
    
    await Produto.findOneAndUpdate(req.params.id, req.body.category, { new: true }).then((produtos) => {

        return res.json(produtos)

    }).catch((err) => {
        res.status(400).json({message: 'Houve um erro ao atualizar o produto'})
    })

},

//procurar title do categoria e produto
 async findTitleCategoria(req, res)  {

    const { title, category } = req.query
    

    await Produto.find({$or:[{title: req.query.title}, {category: req.query.category}]}).lean().populate("categoria").then(produtos => {      
        res.json(produtos)
    }).catch((err) => {
        res.status(400).json({message: 'Não foi possivel encontrar esse produto'})
    })

},

//atualizar o produto
 async updateProduto(req, res) {
    
    await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((produtos) => {

            res.send(produtos)

    }).catch((err) => {
        res.status(400).json({message: 'Houve um erro ao atualizar o produto'})
    })

},

//deletar um produto
 async deleteProduto(req, res) {
    await Produto.findByIdAndDelete(req.params.id).then(() => {
        res.json({message: 'Produto deletado com sucesso!'})
    }).catch((err) => {
        res.status(400).json({message: 'Houve um erro ao deletar produto!'})
    })
 }

}
