require('dotenv').config()

const { application } = require('express');

const mongoConfig = require('./db/mongo');

const app = require('./db/app');

const sucursalController = require('./controllers/sucursal.controller');

mongoConfig.connect();

app.initServer();

sucursalController.defaultSucursal();
