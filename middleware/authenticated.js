const jwt = require('jsonwebtoken');


exports.ensureAuth = (req, res, next)=>{

    if(!req.headers.authorization){

        return res.status(403).send({message: `Doesnt contain header "AUTHORIZATION"`});

    }else{

        try{

            let token = req.headers.authorization.replace(/['"]+/g, '');

            var payload = jwt.decode(token, `${process.env.SECRET_KEY}`);

            if(Math.floor(Date.now() / 1000) >= payload.exp){

                return res.status(401).send({message: 'Tiempo de toquen expirado'});
            }
        }catch(err){
            console.error(err);
            return res.status(400).send({message: 'El Token es invalido'});
        }

        req.user = payload;
        
        next()
    }
}
