const authRouter = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
//REGISTER
authRouter.post('/register', async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString()
    })
    try{
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//LOGIN
authRouter.post('/login', async(req,res)=>{
  try{
      const user = await User.findOne({username:req.body.username})
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET)
      const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      !user && res.status(401).json('Wrong credential')
      Originalpassword !== req.body.password && res.status(401).json('Wrong credential')
      const accessToken = jwt.sign({
        id:user._id,
        isAdmin: user.isAdmin  
      }, process.env.SECRET_JWT, {expiresIn:'5d'})
      const {password, ...info} = user._doc;
      res.status(200).json({...info, accessToken})
  }
  catch(err){
      res.status(500).json(err)
  }
})
module.exports = authRouter