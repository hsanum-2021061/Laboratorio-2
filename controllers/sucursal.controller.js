const Sucursal = require('../models/sucursal.model');

exports.test = (req,res)=>{
    res.send({message: 'En ejecuccion'});
}

exports.defaultSucursal = async()=>{
    try{
        let data = {
            name: 'Default',
            description: 'Default'
        }
        let existSucursalDefault = await Sucursal.findOne({name: 'Default'});

        if(existSucursalDefault) return console.log('');
        let defSucursal = new Sucursal(data);

        await defSucursal.save();
        return console.log('Sucursal creada');

    }catch(err){

        return console.error(err);
    }
}

exports.addSucursal = async(req,res)=>{

    try{
        
        let data = req.body;

        let existsSucursal = await Sucursal.findOne({name: data.name});

        if(existsSucursal){

            return res.send({message: 'La sucursal ya esta creada'});
        }
        let sucursal = new Sucursal(data);

        await sucursal.save();

        return res.status(201).send({message: 'La sucursal ya esta creada'});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Ha ocurrido un error al guardar la sucursal'});
    }
}


exports.getSucursales = async(req, res)=>{
    try{

        let sucursales = await Sucursal.find();

        return res.send({message: 'Se a encontrado sucursales refistradas', sucursales})

    }catch(err){

        console.error(err);

        return res.status(500).send({message: 'Error en las sucursales'});
    }
}


exports.updateSucursal = async(req, res)=>{

    try{

        let sucursalId = req.params.id;
 
        let data = req.body;

        let updatedSucursal = await Sucursal.findOneAndUpdate(

            {_id: sucursalId},
            data,
            {new: true}
        )

        if(!updatedSucursal) return res.send({message: 'No se encuntra sucursal para actualizar'});

        return res.send({message:'La sucursal ha sido actualizada', updatedSucursal});

    }catch(err){

        console.error(err);

        return res.status(500).send({message: 'Ha ocurrido un erro al actualizar sucursal'});
    }
}


exports.deleteSucursal =async(req,res)=>{

    try{

        let sucursalId = req.params.id;
   
        let defaultSucursal = await Sucursal.findOne({name: 'Default'});

        if(defaultSucursal._id == sucursalId) return res.send({message: 'No se puede eliminar la sucursal'});

        await Sucursal.updateMany({sucursal: sucursalId}, {sucursal: defaultSucursal._id});
 
        let deletedSucursal = await Sucursal.findOneAndDelete({_id: sucursalId});

        if(!deletedSucursal) return res.status(404).send({message: 'No se encuentra sucursal para eliminar'});

        return res.send({message: 'Se a eliminado la sucursal'});

    }catch(err){

        console.error(err);

        return res.status(500).send({message: 'Ha ocurrido un error en la sucursal'});
    }
}