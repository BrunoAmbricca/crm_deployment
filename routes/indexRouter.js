const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteControllers')
const productoController = require('../controllers/productosController')
const pedidoController = require('../controllers/pedidoController')
const usuarioController = require('../controllers/usuarioController')
const auth = require('../middlewares/auth')


module.exports = function() {

    router.post('/clientes', clienteController.nuevoCliente)
    router.get('/clientes', auth, clienteController.mostrarClientes)
    router.get('/clientes/:idCliente', clienteController.mostrarCliente)
    router.put('/clientes/:idCliente', clienteController.actualizarCliente)
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)


    router.post('/productos', productoController.subirArchivo, productoController.nuevoProducto)
    router.get('/productos', productoController.mostrarProductos)
    router.get('/productos/:idProducto', productoController.mostrarProducto)
    router.put('/productos/:idProducto', productoController.subirArchivo, productoController.actualizarProducto)
    router.delete('/productos/:idProducto', productoController.eliminarProducto)
    router.post('/productos/busqueda/:query', productoController.buscarProducto)

    router.post('/pedidos', pedidoController.nuevoPedido)
    router.get('/pedidos', pedidoController.mostrarPedidos)
    router.get('/pedidos/:idPedido', pedidoController.mostrarPedido)
    router.put('/pedidos/:idPedido', pedidoController.actualizarPedido)
    router.delete('/pedidos/:idPedido', pedidoController.eliminarPedido)

    router.post('/crear-cuenta', usuarioController.registrarUsuario)
    router.post('/iniciar-sesion', usuarioController.autenticarUsuario)

    return router
}
