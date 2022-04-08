module.exports.people_plus = function(req,res){
code ='12'
sql = "UPDATE `users` SET `code` = '"+code+"' WHERE `users`.`id` = '"+req.user.id_user+"'"
    const conn = require('./../config/config')
    conn.query(sql,function(error,yra){
        if (error) { console.log("error_people_plus");res.json({message:"error_people_plus"})}
        else {
            res.json({message:code})
        }
    })
}
module.exports.people_minus = function(req,res){
    const conn = require('./../config/config')
    sql="UPDATE `users` SET `id_admin`= NULL where `id_admin` = '"+req.user.id_user+"' and id = '"+req.body.id_user+"'"
    conn.query(sql,function(error1,yra1){
        if (error1) {console.log("error_people_minus");res.json({message: sql})}
        else {res.json({message:yra1})}
    })
   
}
module.exports.people_minus_byID = function(req,res){
    code ='12'
    sql = "UPDATE `users` SET `code` = '"+code+"' WHERE `users`.`id` = '"+req.user.id_user+"'"
    const conn = require('./../config/config')
    conn.query(sql,function(error,yra){
        if (error) { console.log("error_people_plus");res.json({message:"error_people_plus"})}
        else {
console.log('yra')
      }
    })
    sql="UPDATE `users` SET `id_admin`= NULL where `id_admin` = '"+req.user.id_user+"' and `id` = '"+req.body.id_user+"'"
    conn.query(sql,function(error1,yra1){
        if (error1) {console.log("error_people_minus");res.json({message: sql})}
        else {res.json({code:code})}
    })
   
}
module.exports.people_display = function(req,res){
    sql = "select id ,user, login from users where id_admin = '"+req.user.id_user+"'"
    const conn = require('./../config/config')
    conn.query(sql,function(error,yra){
        if (error) {console.log("people_display_error");res.json("people_display_error");}
        else{
            res.json({message:yra}); 
        }
    })
}
module.exports.category_display_income_view = function(req,res){
    const conn = require('./../config/config')
    const sql = "select income, description from income_group INNER JOIN `users` ON `id_owner` =`users`.`id` WHERE `income_group`.`id_owner`='"+req.body.id_user+"' AND id_admin='"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_category_display_income'); res.json({message:"error_category_display_income"});}
        else {res.json({message:yra});}
        
    })
}
module.exports.category_display_costs_view  = function(req,res){
    const conn = require('./../config/config')
    const sql = "select cost, description from cost_group  INNER JOIN `users` ON `id_owner` =`users`.`id` WHERE `id_owner`='"+req.body.id_user+"' AND id_admin='"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_category_display_costs'); res.json({message:"error_category_display_costs"});}
        else res.json({message:yra})
    })
        
}

module.exports.income_display_view = function(req,res){
    const conn = require('./../config/config')
    const sql = "SELECT `income_group`.`income` as 'q',  SUM(`income`.`sum`) as 's' FROM `income` INNER JOIN `income_group` on `income_group`.`id` =`income`.`income` INNER JOIN `users` ON `id_owner` =`users`.`id` WHERE `id_owner`='"+req.body.id_user+"' AND id_admin='"+req.user.id_user+"' GROUP by `income_group`.`income`"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_income_display'); res.json({message:"error_income_display"});}
        else res.json({message:yra})
        
    })
}
module.exports.costs_display_view  = function(req,res){
    const conn = require('./../config/config')
    const sql = "SELECT `cost_group`.`cost` as 'q', SUM(`cost`.`sum`) as 's' FROM `cost` INNER JOIN `cost_group` on `cost_group`.`id` =`cost`.`cost` INNER JOIN `users` ON `id_owner` =`users`.`id` WHERE `id_owner`='"+req.body.id_user+"' AND id_admin='"+req.user.id_user+"' GROUP by `cost_group`.`cost`"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_costs_display'); res.json({message:"error_costs_create"});}
        else res.json({message:yra})
        
    })
}
module.exports.income_and_costs_display_view = function(req,res){
    let q=[]
    const conn = require('./../config/config')
    const sql = "SELECT id, sum, income, date FROM `income` INNER JOIN `income_group` ON `income`.`income`=`income_group`.`id` INNER JOIN `users` ON `income`.`id_user` =`users`.`id` WHERE `income_group`.`id_owner`='"+req.body.id_user+"' AND id_admin='"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_income_display'); res.json({message:"error_income_display"});}
        else {q=yra   }
    })
  
    const sql1 = "SELECT id, sum, cost, date FROM `cost` INNER JOIN `cost_group` ON `cost`.`cost` = `cost_group`.`id`INNER JOIN `users` ON `cost`.`id_user` =`users`.`id` WHERE `cost_group`.`id_owner`='"+req.body.id_user+"' AND id_admin='"+req.user.id_user+"'"
    conn.query(sql1,function(error,yra){
        if (error){console.log(sql1); res.json({message:"error_costs_create"});}
        else {res.json({message:yra, q:q} ); }
        
    })
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
 module.exports.generateCode = function(req,res){
    let code =""
    for (let i=0;i<12;i++)
    {
        if (getRandomIntInclusive(0,1)==0)
        {
           code = code +(String.fromCharCode(getRandomIntInclusive(65,90)))
 
        }
        else code = code+(String.fromCharCode(getRandomIntInclusive(48,57)))

    }
    const conn = require('./../config/config')
    const sql = "UPDATE `users` SET `code` = '"+code+"' WHERE `users`.`id` = '"+req.user.id_user+"' and id_role='1'"
    conn.query(sql,function(error,yra){
        if (error){console.log(sql); res.json({message:"error_generateCode"});}
        else {res.json({message:code})   }
    })
   
}
module.exports.getCode  = function(req,res){
    const conn = require('./../config/config')
    const sql = "SELECT code from users where id = '"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_costs_display'); res.json({message:"error_costs_create"});}
        else res.json({message:yra[0].code})
        
    })
}

