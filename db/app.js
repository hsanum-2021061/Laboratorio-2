const express = require('express');

const morgan = require('morgan');

const helmet = require('helmet');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 8080;

const sucursalRoutes = require('../routers/sucursal.routes');

const empresaRoutes = require('../routers/empresa.routes');


app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.use('/empresa', empresaRoutes);

app.use('/sucursal', sucursalRoutes);


exports.initServer = ()=>{

    app.listen(port);
    
    console.log(`Servidor Corriendo ${port}`)
}