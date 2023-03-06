const express = require('express');

const api = express.Router();

const sucursalController = require('../controllers/sucursal.controller');


api.get('/test', sucursalController.test);

api.post('/add',sucursalController.addSucursal);

api.get('/get',sucursalController.getSucursales);

api.put('/update/:id',sucursalController.updateSucursal);

api.delete('/delete/:id',sucursalController.deleteSucursal);

module.exports = api;