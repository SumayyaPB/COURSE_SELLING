import express from 'express'
import 'dotenv/config'
import connectDB from './config/dbConfig.js'
import userRouter from './Router/userRouter.js'
const app = express()
const port = 3000

connectDB()
app.use(express.json())
app.use('/user',userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})