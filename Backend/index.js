import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
import router from './routes/url.js'
const port = 3000
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}))

mongoose.connect('mongodb://localhost:27017/url',()=>{
    console.log('MongoDB Connected');
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
