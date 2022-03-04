const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')
const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            minlength:8
        },
        email:{
            type:String, 
            //required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
    },{timestamps:true}
)
UserSchema.plugin(validator)
module.exports = mongoose.model('User', UserSchema)