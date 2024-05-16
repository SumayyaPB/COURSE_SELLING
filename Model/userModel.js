import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required : true,
        minLength : 3,
        maxLength :10,
    },
    lastName:{
        type:String,
        required: true,
        minLength : 3,
        maxLength :10
    },
    email:{
        type:String,
        required : true,
        unique :true
    },
    password:{
        type:String,
        required:true,
        
    }

})

const User = mongoose.model('Users',userSchema)
export default User