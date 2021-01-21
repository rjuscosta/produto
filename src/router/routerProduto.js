const express = require('express');
const { MongoClient } = require('mongodb');
const  mongoose  = require('mongoose');
const router = express.Router();

require('../Model/Produto');
const Produto = mongoose.model('Produtos');

//cadastro do produto
router.post('/cadastro/produtos', async(req, res) => {
    await Produto.create(req.body).then(produtos => {
            return res.json({ message: 'Produto cadastrado com sucesso!' })
    }).catch(err => {
        return res.status(400).json({ message: 'Erro ao cadastrar o produto!' +err})
    })

    
});
//listagem do produto
router.get('/produtos', async (req, res) => {
    Produto.find().then((produtos) => {
    
        return res.json(produtos)
    }).catch((err) => {
        res.json({message: 'Nenhum produto encontrado!'})
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

//procurar title do categoria e produto(porém não consegui fazer esse a tempo)
router.get('/produtos/search', async (req, res) => {

    const { title, category } = req.query

    await Produto.find({$or:[{category: req.query.category}, {title: req.query.title}]}).then(produtos => {      
        res.json(produtos)
    }).catch((err) => {
        res.status(400).json({message: 'Não possivel encontrar esse produto'})
    })


   

    console.log(req.query)
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