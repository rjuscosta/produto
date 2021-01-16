const express = require('express');
const { MongoClient } = require('mongodb');
const  mongoose  = require('mongoose');
const router = express.Router();

require('../Model/Produto');
const Produto = mongoose.model('Produtos');


router.post('/cadastro/produtos', async(req, res) => {
    await Produto.create(req.body).then(produtos => {
            return res.json({ message: 'Produto cadastrado com sucesso!' })
    }).catch(err => {
        return res.status(400).json({ message: 'Erro ao cadastrar o produto!' +err})
    })

    
});

router.get('/produtos', async (req, res) => {
    Produto.find().then((produtos) => {
    
        return res.json(produtos)
    }).catch((err) => {
        res.json({message: 'Nenhum produto encontrado!'})
    })
});


router.put('/produtos/categorias/:id', async (req, res) => {

    const {category} = req.body;
    
    await Produto.findOneAndUpdate(req.params.id, req.body.category, { new: true }).then((produtos) => {
        return res.json(produtos)

    }).catch((err) => {
        res.status(400).json({message: 'Houve um erro ao atualizar o produto'})
    })

});


router.get('/produtos', async (req, res) => {

    
   res.send('title: ' +req.query.title)
})


router.put('/produtos/:id', async (req, res) => {
    
    await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((produtos) => {

            res.send(produtos)

    }).catch((err) => {
        res.status(400).json({message: 'Houve um erro ao atualizar o produto'})
    })

});

router.delete('/produtos/delete/:id', async (req, res) => {
    await Produto.findByIdAndDelete(req.params.id).then(() => {
        res.json({message: 'Produto deletado com sucesso!'})
    }).catch((err) => {
        res.status(400).json({message: 'Houve um erro ao deletar produto!'})
    })
});

module.exports = router;