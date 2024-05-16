import express from 'express'
import {doSignup , doLogin} from '../Controller/userController.js'
const userRouter = express.Router()

userRouter.post('/',doSignup)

userRouter.post('/login',doLogin)

export default userRouter