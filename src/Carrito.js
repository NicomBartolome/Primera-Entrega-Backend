import fs from 'fs'


export class Carrito{

    constructor(path){
        this.path = path

        if(fs.existsSync(this.path)){
            this.cart = JSON.parse(fs.readFileSync(this.path,"utf-8"))
        }else{
            fs.writeFileSync(this.path,JSON.stringify([]))
            this.cart = []
        } 
    }

    GenIDCart = () => {
        if(this.cart.length > 0){
            this.cart.id = this.cart.length + 1
        }else{
            this.cart.id = 1
        }

        return this.cart.id
    }

    addCart = () => {
        const NewCart = {
            idCart:this.GenIDCart(),
            products:[]
        }

        this.cart.push(NewCart)
        fs.writeFileSync(this.path,JSON.stringify(this.cart,null,3))
        return true

    }

    addItem = (idCt,idProducto) => {
        const NuevoProducto = {
            product:idProducto,
            quantity:1
        }

        let CarritoExistente = this.cart.find(idC => idC.idCart == idCt)
        console.log(CarritoExistente)
        if(CarritoExistente.products.length === 0){
            CarritoExistente.products.push(NuevoProducto)
            fs.writeFileSync(this.path,JSON.stringify(this.cart,null,3))
            console.log("OK: Producto carrito correctamente")
        }else{
            console.log("ahora si papa")
            if(CarritoExistente.products[0].product == idProducto){
                CarritoExistente.products[0].quantity++
            }else{
                CarritoExistente.products.push(NuevoProducto)
            }
            fs.writeFileSync(this.path,JSON.stringify(this.cart,null,3))
            
        }

        /* if(this.cart.find(idC => idC.idCart == idCt)){
            let CarritoExistente = this.cart.find(idC => idC.idCart == idCt)
            CarritoExistente.products[quantity] + 1
            console.log(CarritoExistente)
        }else{
            this.cart.push(NuevoProducto)
            fs.writeFileSync(this.path,JSON.stringify(this.cart,null,3))
            console.log("OK: Producto carrito correctamente")
        } */

    }

    getCartByID = (id) => {

        if(this.cart.find(idBuscado => idBuscado.idCart === id)){
            console.log("Si")
            return this.cart.find(idBuscado => idBuscado.idCart === id)
        }else{
            return "ID no encontrado"
        }
     }


}