import express from 'express'
import products from './routes/products.router.js'
import carts from './routes/carts.router.js'

const srv = express()

srv.use('/api/products/', products)
srv.use('/api/carts/',carts)

srv.listen(8080,()=>{return "OK"})