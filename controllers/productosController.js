const Productos = require('../models/Productos.js')
const multer = require('multer')
const shortId = require('shortid')

const configuracionMulter = {
    storage : multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, __dirname + '../../uploads/')
        },
        filename: function(req, file, cb) {
            const extension = file.mimetype.split('/')[1]
            cb(null, `${shortId.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true)
        }
        else{
            cb(new Error('Formato no valido'))
        }
    }
}

const upload = multer(configuracionMulter).single('imagen')

exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error){
        if(error){
            res.json({mensaje: error, msg: 'No se guardo'})
        }
        return next()
    })
}

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body)

    try{

        if(req.file){
            producto.imagen = req.file.filename
        }

        await producto.save()
        res.json({ mensaje:'Se guardo el producto' })
    }catch(error){
        console.log(error)
        next()
    }
}

exports.mostrarProductos = async (req, res, next) => {

    try{
        const productos = await Productos.find({})
        res.json(productos)
    }catch(error){
        console.log(error)
        next()
    }
}

exports.mostrarProducto = async (req, res, next) => {

    const producto = await Productos.findById(req.params.idProducto)

    if(!producto){
        res.json({mensaje: 'Ese producto no existe'})
        next()
    }
    else{
        res.json(producto)
    }
}

exports.actualizarProducto = async (req, res, next) => {

    try{  

        let nuevoProducto = req.body

        if(req.file){
            nuevoProducto.imagen = req.file.filename
        }else{
            const productoAnterior = await Productos.findById(req.params.idProducto)
            nuevoProducto.imagen = productoAnterior.imagen
        }

        const producto = await Productos.findOneAndUpdate({_id: req.params.idProducto},
            nuevoProducto, {
                new: true
            }    
        )
        res.json(producto)
    }catch(error){
        console.log(error)
        next()
    }

}

exports.eliminarProducto = async (req, res, next) => {

    try{
        await Productos.findOneAndDelete({_id: req.params.idProducto})
        res.json({mensaje: 'El producto se ha eliminado'})
    }catch(error){
        console.log(error)
        next()
    }

}

exports.buscarProducto = async (req, res, next) => {

    try{
        const {query} = req.params
        const producto = await Productos.find({nombre: new RegExp(query, 'i')})
        res.json(producto)
    }catch(error){
        console.log(error)
        next()
    }

}