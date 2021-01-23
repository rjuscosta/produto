const express = require('express');
const { MongoClient } = require('mongodb');
const  mongoose  = require('mongoose');
const router = express.Router();

require('../Model/Produto');
const Produto = mongoose.model('Produtos');

require('../Model/Categoria');
const Categoria = mongoose.model('Categorias');

//cadastro de categorias
router.post('/cadastro/categorias', async(req, res) => {
    await Categoria.create(req.body).then(categorias => {

            return res.json({ message: 'categoria cadastrada com sucesso!' })
    }).catch(err => {
        return res.status(400).json({ message: 'Erro ao cadastrar a categoria!' +err})
    })

    
})

//listagem do produto
router.get('/produtos', async (req, res) => {
   await Produto.find().lean().populate("categoria").sort().then((produtos) => {
        return res.json(produtos)
    }).catch((err) => {
        res.json({message: 'Nenhum produto encontrado!'})
    })
});



//Aqui busca as categorias cadastradas

router.get('/cadastro/produtos', async(req, res) => {
    await Categoria.find().then(categorias => {
            return res.json(categorias)
    }).catch(err => {
        return res.status(400).json({ message: 'Erro ao cadastrar o encontrar ccd as categorias!' +err})
    })
    
});

//cadastro do produto
router.post('/cadastro/produtos', async(req, res) => {

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
   
    
});


//Edição da categoria do produto
router.put('/produtos/categorias/:id', async (req, res) => {

    const {category} = req.body;
    
    await Produto.findOneAndUpdate(req.params.id, req.body.category, { new: true }).then((produtos) => {
        return res.json(produtos)

    }).catch((err) => {
        res.status(400).json({message: 'Houve um erro ao atualizar o produto'})
    })

});

//procurar title do categoria e produto
router.get('/produtos/search', async (req, res) => {

    const { title, category } = req.query
    

    await Produto.find({$or:[{title: req.query.title}, {category: req.query.category}]}).lean().populate("categoria").then(produtos => {      
        res.json(produtos)
    }).catch((err) => {
        res.status(400).json({message: 'Não possivel encontrar esse produto'})
    })

})

//atualizar o produto
router.put('/produtos/:id', async (req, res) => {
    
    await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((produtos) => {

            res.send(produtos)

    }).catch((err) => {
        res.status(400).json({message: 'Houve um erro ao atualizar o produto'})
    })

});

//deletar um produto
router.delete('/produtos/delete/:id', async (req, res) => {
    await Produto.findByIdAndDelete(req.params.id).then(() => {
        res.json({message: 'Produto deletado com sucesso!'})
    }).catch((err) => {
        res.status(400).json({message: 'Houve um erro ao deletar produto!'})
    })
});

module.exports = router;