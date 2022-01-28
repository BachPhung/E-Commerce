const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('./verifyToken')
const Order = require('../models/Order')
const orderRouter = require('express').Router()


//CREATE
orderRouter.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//CHANGE
orderRouter.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
orderRouter.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted order successfully")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ORDER
orderRouter.get('/find/:userId',verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.find({userId:req.params.userId})
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL 
orderRouter.get('/',verifyTokenAndAdmin, async(req,res)=>{
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET MONTHLY INCOME
orderRouter.get('/income', verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const preMonth = new Date(date.setMonth(lastMonth.getMonth()-1))
    try{
        const income = await Order.aggregate([
            {$match: {createdAt:{$gte: preMonth}}},
            {
                $project:{
                month:{$month:'$createdAt'},
                sales: '$amount'
            },
            $group:{
                _id:'$month',
                total:{$sum: '$sales'}
            }
            }
        ])
        res.status(200).json(income)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = orderRouter