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
        password:{
            type:String,
            required:true
        },
        avatar:{
            type:String,
            default:null
        },
        isAdmin:{
            type: Boolean,
            default: false
        },

    },{timestamps:true}
)
UserSchema.plugin(validator)
module.exports = mongoose.model('User', UserSchema)