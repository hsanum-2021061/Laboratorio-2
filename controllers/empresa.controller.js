
const {createToken} = require('../helpers/jwt')
const Empresa = require('../models/empresa.model');
const Sucursal = require('../models/sucursal.model');

const { validateData, encrypt, checkPassword } = require('../helpers/validate');


exports.test = (req,res)=>{

    res.send({message: 'En ejecuccion'});
}

exports.login = async(req,res)=>{
    try{
        let data = req.body;
        let cretentials ={
            name: data.name,
            password: data.password
        }
        let msg = validateData(cretentials);
        if(msg) return res.status(400).send(msg);
        let empresa = await Empresa.findOne({name: data.name});

        if(empresa && await checkPassword(data.password, empresa.password)){
            let token = await createToken(empresa);
            return res.send({message: 'Su usuario ha sido registrado exitosamente', token});
        } 
        return res.status(401).send({message: 'La credencian ingresada es invalida'});
        
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Un error a ocurrido al logearse'});
    }
}

exports.addEmpresa = async(req,res)=>{
    try{
        let data = req.body;
        let existsSucursal= await Sucursal.findOne({_id: data.sucursal});
        if(!existsSucursal) return res.status(404).send({message: 'La sucursal no ha sido encontrada'});

        let existsEmpresa = await Empresa.findOne({name: data.name});
        if(existsEmpresa){
            return res.send({message: 'La empresa ya ha sido creada'});
        }

        data.password = await encrypt(data.password);
        let empresa = new Empresa(data);
        await empresa.save();
        return res.status(201).send({message: 'Creacion De Empresa'});

    }catch(err){

        console.error(err);

        return res.status(500).send({message: 'Ha ocurrido un error al guardar la empresa'});
    }
}

//ver las empresas
exports.getEmpresas = async(req, res)=>{
    try{

        let empresas = await Empresa.find();

        return res.send({message: 'La empresa ha sido encontrada', empresas})

    }catch(err){

        console.error(err);
        
        return res.status(500).send({message: 'No se encontro ni una empresa'});
    }
}


exports.updateEmpresa = async(req, res)=>{
    try{
        let empresaId = req.params.id;
  
        let data = req.body;
 
        let existsEmpresa = await Empresa.findOne({name: data.name});

        if(existsEmpresa){
            
            return res.send({message: 'La empresa ya ha sido creada'});
        }


        let updatedEmpresa = await Empresa.findOneAndUpdate(
            {_id: empresaId},
            data,
            {new: true}
        )

        if(!updatedEmpresa) return res.send({message: 'La empresa no ha sido encontrada ni actulizada'});

        return res.send({message:'La empresa ha sido actualizada', updatedEmpresa});

    }catch(err){
        console.error(err);

        return res.status(500).send({message: 'Ha ocurrido un error al actualizar la empresa'});
    }
}


exports.deleteEmpresa =async(req,res)=>{
    try{

        let empresaId = req.params.id;

        let deletedEmpresa = await Empresa.findOneAndDelete({_id: empresaId});

        if(!deletedEmpresa) return res.status(404).send({message: 'No se encontro ni una empresa'});

        return res.send({message: 'La empresa ha sido eliminada'});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Ha ocurrido un error al eliminar la empresa'});
    }
}