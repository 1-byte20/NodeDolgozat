import express from 'express'
import cors from 'cors'
import productsRoutes from './routes/products.js'
import { initialize } from './datas/database.js'

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())

app.use("/products", productsRoutes)

try{
    await initialize()
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}. Let's see if you can catch it ;)`)
    } )
} catch (err){
    console.log(err.message)
}