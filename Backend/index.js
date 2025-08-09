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

mongoose.connect('mongodb+srv://giddearyan222:atikaryan12@cluster0.c9rza2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',()=>{
    console.log('MongoDB Connected');
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
