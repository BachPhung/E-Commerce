const stripeRouter = require('express').Router()
require('dotenv').config()
const stripe = require('stripe')(process.env.SECRET_STRIPE)

stripeRouter.post('/payment',async(req,res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'eur',
    },(stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }
        else{
            res.status(200).json(stripeRes)
        }
    })
})

module.exports = stripeRouter