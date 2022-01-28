const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('./verifyToken')
const Cart = require('../models/Cart')
const cartRouter = require('express').Router()


//CREATE
cartRouter.post('/', verifyToken, async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//CHANGE
cartRouter.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
cartRouter.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted cart successfully")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET CART
cartRouter.get('/find/:userId',verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Product.findById({userId:req.params.userId})
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL 
cartRouter.get('/',verifyTokenAndAdmin, async(req,res)=>{
    try{
        const cart = await Cart.find()
        res.status(200).json(cart)
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = cartRouter