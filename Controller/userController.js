import User from '../Model/userModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'

const doSignup = async(req,res)=>{
    console.log('hitted');
    try {
        const {firstName , lastName , email , password }= req.body;
        const userExist = await User.find({email})
        
        if(!userExist){
            return res.status(200).json('user already exist')
        }
        
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password,saltRounds)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashPassword
        })

        const userCreated =await newUser.save();

        console.log(userCreated);

        if(userCreated){
            res.status(201).json(userCreated)
        }
        try {
            const token = generateToken(email)
            res.status(200).json({ token: token });
            
        } catch (error) {
            res.status(500).json({error:'token is not created'})
            console.log(error);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'})
    }
}

const doLogin =async(req,res)=>{
    try {
        const {email,password}=req.body

        const user = await User.findOne({email})


        if(!user){
            return res.send('user not exist')
        }
         
        const matchPassword =await bcrypt.compare(password,user.hashPassword)

        if(!matchPassword){
            return res.send('password is incorrect')
        }
          
        const token = generateToken(email)
        res.send(token)
        
    } catch (error) {
        res.send(500).json({error:'internal server error'})
        console.log(error);
    }
}

export {doSignup,doLogin}