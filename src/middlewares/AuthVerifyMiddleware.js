var Jwt = require('jsonwebtoken');
module.exports = (req, res, next) =>{
    let Token = req.headers['token'];
    Jwt.verify(Token,'SecretKey1234', function(err, decoded){
        if(err){
            console.log(Token);
            res.status(401).json({status: "Unauthorized", data: err});
        } else {
            let email = decoded['data'];
            console.log(email);
            req.headers.email = email;
            next();
        }
    })
};
