

module.exports.login = function(req,res){
    const crypto = require('crypto')
    const conn = require('./../config/config')
    const jwt = require('jsonwebtoken')
    const keys = require('./../config/keys')
    conn.query("select * from users where login = '"+req.body.login_user+"'",function(err,yra){
        if (err) {console.log('error'); res.json({
            message:"error"
        })}
        else
        {
        if (yra.length==1 ){
            if (hashPassword(req.body.password_user)==yra[0].password_user){
                console.log('вы в системе');
                const token = jwt.sign({
                    id_user: yra[0].id,
                    user_name: yra[0].user,
                    login_user:yra[0].login,
                    id_role: yra[0].id_role

                },keys.jwt,{expiresIn: 3600}) 
                res.json({
                    token: `Bearer ${token}`,
                    id_role:yra[0].id_role,
                    user_name: yra[0].user
                })
            }
            else {console.log('неверный пароль')
            res.json( {
                message: "неверный пароль"})}
        }
        else {console.log('такого пользователя нет')
    res.json({
       
        message: "такого пользователя нет"
    })
    }
    }
    }) 
   
    function hashPassword(password) {
        var hash = crypto.createHash('md5').update(password).digest('hex');
        console.log(hash)
        return hash
        
    }
}

module.exports.register = function(req,res){
    var col =0
    const crypto = require('crypto')
    const conn = require('./../config/config')
    conn.query("select * from users where login = '"+req.body.login_user+"'",function(err,yra){
        if (err){console.log('ошибка');res.json({message:"error"})}
        else
        {
        col = yra.length;
        console.log(col)
        if (col==0)
        {
        const sql ="INSERT INTO users (user,login,password,id_role) VALUES ('"+req.body.user_name+"', '"+req.body.login_user+"', '"+ hashPassword(req.body.password_user)+"', '"+req.body.id_role+"')";
        conn.query(sql,function(error,result){
            if (error) {console.log(sql);
        res.json({
            status:true,
            message: sql
        })
        }
            else{
                console.log("yra");
                res.json({
                    status:true,
                    message:"pobeda"
                })
            }
        })
        
      
        function hashPassword(password) {
            var hash = crypto.createHash('md5').update(password).digest('hex');
            console.log(hash)
            return hash
            
        }
        }
        else{
            console.log('этот логин занят, попробуйте другой')
            res.json({
                status: true,
                message:" zanyato"
            })
        }
    }
    
     
    })
    


}
      
  


 
