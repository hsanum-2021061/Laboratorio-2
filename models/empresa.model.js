const mongoose = require('mongoose')

const empresaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sucursal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: true
    }
});

module.exports = mongoose.model('Empresa', empresaSchema);