import express from 'express'
import { dbAll, dbGet, dbRun } from '../datas/database.js'

const router = express.Router()

router.get("/", async (req, res) => {
    try{
        console.log('Get all')
        const rows = await dbAll('SELECT * FROM products')
        console.log('Rows: '+ rows)
        res.status(200).json(rows)
    } catch (err) {
        console.log(`Error: ${err.message}`)
        res.status(500).json({message: err.message})
    }
})

router.post("/", async (req, res) => {
    const {name, brand, description, price } = req.body;
  if (!name && !brand && !description && !price) {
    return res.status(400).json({ message: "Missing data" });
  }
  try {
    const car = await dbRun(
      "INSERT INTO cars (name, brand, description, price) VALUES (?, ?, ?, ?)",
      [name, brand, description, price]
    );
    res.status(201).json({ message: "Created successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
    try{
        const product = await dbGet("SELECT * FROM WHERE id = ?", [req.params.id])
        if (!product){
            return res.status(404).json({message: "Product not found"})
        }
    } catch (err) {
        console.log(`Error: ${err.message}`)
        res.status(500).json({message: err.message})
    }
})

router.put("/:id", async (req, res) => {
    const {name, brand, description, price} = req.body
    if (!name && !brand && !description && !price) {
        return res.status(400).json({ message: "Missing data" });
      }
    try{
        const product = await dbGet("SELECTR * FROM products WHERE id = ?", [req.params.id])
        if (!product){
            return res.status(404).json({message: "Update succesful"})
        }
    } catch (err) {
        console.log(`Error: ${err.message}`)
        res.status(500).json({message: err.message})
    }
})

router.delete("/products/:id", async (req, res) => {
    try{
        const product = await dbGet("SELECT * FROM products WHERE id = ?", [req.params.id])
        if(!product){
            return res.status(400).json({message: "Not found"})
        }
        await dbRun("DELETE FROM product WHERE id = ?", [req.params.id])
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

export default router