import express from 'express'

import {ProductManager} from './ProductManager.js'

const srv = express()

const stock = new ProductManager('./src/productos.json')

srv.use(express.urlencoded({extended:true}))

srv.get('/products',(req,res)=>{
    let limit = req.query.limit
    let filter = stock.getProducts()

    if(!Number(limit) || Number(limit) < 1 ){
        return res.send(filter)
    }else{
        return res.send(filter.slice(0,Number(limit)))
    }
   
})

srv.get('/products/:pid',(req,res)=>{
    let pid = req.params.pid
    let idPr = pid.substr(1,2)
    res.send(stock.getProductsByID(Number(idPr)))
})



srv.listen(8080,()=>{return "OK"})