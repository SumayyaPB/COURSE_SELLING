import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY 

const generateToken = (email)=>{
    return jwt.sign({data:email},secretKey,{expiresIn:'1d'})
}

export default generateToken