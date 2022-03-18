module.exports.category_create_income = function(req,res){
const conn = require('./../config/config')
const sql = "INSERT INTO `income_categories` (`id_income_categories`, `income_categories_name`, `description`, `id_owner`) VALUES (NULL, '"+req.body.income_categories_name+"', '"+req.body.description+"', '"+req.user.id_user+"')"
console.log(sql)
conn.query(sql,function(error,yra){
    if (error){console.log('error_create_cat_income'); res.json({message:"error_create_cat_income"});}
    else res.json({message:yra})
    
})
}

module.exports.category_display_income = function(req,res){
    const conn = require('./../config/config')
    const sql = "select id_income_categories,income_categories_name, description from income_categories where id_owner = '"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_category_display_income'); res.json({message:"error_category_display_income"});}
        else {res.json({message:yra});}
        
    })
}
module.exports.category_delete_income_byID = function(req,res){
    const conn = require('./../config/config')
    const sql = "delete from income_categories where id_income_categories = '"+req.body.id_income_categories+"' and id_owner = '"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_category_delete_income_byID'); res.json({message:"error_category_delete_income_byID"});}
        else res.json({message:yra})
        
    })
}
module.exports.category_delete_income = function(req,res){
    const conn = require('./../config/config')
    const sql = "delete from income_categories where id_owner = '"+req.user.id_user+"' and income_categories_name = '"+req.body.income_categories_name+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_category_delete_income'); res.json({message:"error_category_delete_income"});}
        else {res.json({message:yra}); console.log(sql+"\n")}
        
    })
}
module.exports.category_create_costs = function(req,res){
    const conn = require('./../config/config')
    const sql = "INSERT INTO `costs_categories` (`id_cost_categories`, `cost_categories_name`, `description`, `id_owner`) VALUES (NULL, '"+req.body.cost_categories_name+"', '"+req.body.description+"', '"+req.user.id_user+"')"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_create_cat_costs'); res.json({message:"error_create_cat_costs",sql:sql});}
        else res.json({message:sql})
        
    })
}
module.exports.category_display_costs  = function(req,res){
    const conn = require('./../config/config')
    const sql = "select id_cost_categories,cost_categories_name, description from costs_categories where id_owner = '"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_category_display_costs'); res.json({message:"error_category_display_costs",sql:sql});}
        else res.json({message:yra})
        
    })
}
module.exports.category_delete_costs_byID = function(req,res){
    const conn = require('./../config/config')
    const sql = "delete from costs_categories where id_costs_categories = '"+req.body.id_costs_categories+"' and id_owner = '"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_category_delete_costs_byID'); res.json({message:"error_category_delete_costs_byID"});}
        else res.json({message:yra})
        
    })
}
module.exports.category_delete_costs = function(req,res){
    const conn = require('./../config/config')
    const sql = "delete from costs_categories where id_owner = '"+req.user.id_user+"' and cost_categories_name = '"+req.body.cost_categoties_name+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_category_delete_cost'+"\n"+sql); res.json({message:"error_category_delete_cost"});}
        else {res.json({message:yra});console.log(sql)}
        
    })
}
module.exports.income_create  = function(req,res){
    const conn = require('./../config/config')
    const sql = "INSERT INTO `budget_income` (`id_budget_income`, `income_sum`, `income_category`, `date`, `id_user`) VALUES (NULL, '"+req.body.income_sum+"', '"+req.body.income_category+"', '"+req.body.date+"', '"+req.user.id_user+"')"
    console.log(sql)
    conn.query(sql,function(error,yra){
        if (error){console.log("123456780123456789012345678901234567892345672345672345678"+sql); res.json({message:"error_income_create"});}
        else {res.json({message:yra});}
        
    })
}
module.exports.income_delete   = function(req,res){
    const conn = require('./../config/config')
    const sql = "delete from budget_income where id_user = '"+req.user.id_user+"' and id_budget_income = '"+req.body.id_budget_income+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_income_delete'+" "+sql); res.json({message:"error_income_delete"});}
        else res.json({message:yra})
        
    }) 
}
module.exports.income_delete_byID = function(req,res){
    const conn = require('./../config/config')
    const sql = "delete from budget_income where id_user = '"+req.user.id_user+"' and id_budget_income = '"+req.body.id_budget_income+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_income_delete'); res.json({message:"error_income_delete"});}
        else res.json({message:yra})
        
    }) 
}
module.exports.income_display = function(req,res){
    const conn = require('./../config/config')
    const sql = "SELECT `income_categories`.`income_categories_name` as 'q',  SUM(`budget_income`.`income_sum`) as 's' FROM `budget_income` INNER JOIN `income_categories` on `income_categories`.`id_income_categories` =`budget_income`.`income_category` where `budget_income`.`id_user`='"+req.user.id_user+"' GROUP by `income_categories`.`income_categories_name`"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_income_display'); res.json({message:"error_income_display"});}
        else{ res.json({message:yra});}
        
    })
}
module.exports.costs_create  = function(req,res){
    const conn = require('./../config/config')
    const sql = "INSERT INTO `budget_cost` (`id_budget_cost`, `cost_sum`, `cost_category`, `date`, `id_user`) VALUES (NULL, '"+req.body.cost_sum+"', '"+req.body.cost_category+"', '"+req.body.date+"', '"+req.user.id_user+"')"
    conn.query(sql,function(error,yra){
        if (error){console.log(sql); res.json({message:"error_costs_create"});}
        else {res.json({message:yra}); console.log(sql+" !!!!!!!!!!!!!!!!!!!!")}
        
    })
}
module.exports.costs_delete   = function(req,res){
    const conn = require('./../config/config')
    const sql = "delete from budget_cost where id_user = '"+req.user.id_user+"' and id_budget_cost = '"+req.body.id_budget_cost+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_cost_delete '+sql); res.json({message:"error_cost_delete"});}
        else res.json({message:yra})
        
    }) 
}
module.exports.costs_delete_byID = function(req,res){
    const conn = require('./../config/config')
    const sql = "delete from budget_cost where id_user = '"+req.body.id_user+"' and id_budget_cost = '"+req.body.id_budget_cost+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_income_delete'); res.json({message:"error_income_delete"});}
        else res.json({message:yra})
        
    }) 
}
module.exports.costs_display = function(req,res){
    const conn = require('./../config/config')
    const sql = "SELECT `costs_categories`.`cost_categories_name` as 'q', SUM(`budget_cost`.`cost_sum`) as 's' FROM `budget_cost` INNER JOIN `costs_categories` on `costs_categories`.`id_cost_categories` =`budget_cost`.`cost_category` where `budget_cost`.`id_user`='"+req.user.id_user+"' GROUP by `costs_categories`.`cost_categories_name`"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_costs_display'); res.json({message:"error_costs_create"});}
        else res.json({message:yra})
        
    })
}
module.exports.costs_and_income_display = function(req,res){
    let q=[]
    const conn = require('./../config/config')
    const sql = "SELECT * FROM `budget_income` INNER JOIN `income_categories` ON `budget_income`.`income_category` = `income_categories`.`id_income_categories` WHERE `income_categories`.`id_owner`='"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_income_display'); res.json({message:"error_income_display"});}
        else {q=yra   }
    })
  
    const sql1 = "SELECT * FROM `budget_cost` INNER JOIN `costs_categories` ON `budget_cost`.`cost_category` = `costs_categories`.`id_cost_categories` WHERE `costs_categories`.`id_owner`='"+req.user.id_user+"'"
    conn.query(sql1,function(error,yra){
        if (error){console.log(sql1); res.json({message:"error_costs_create"});}
        else res.json({message:yra, q:q})
        
    })
    
}
module.exports.update_income = function(req,res){
    const conn = require('./../config/config')
    const sql = "update income_categories set income_categories_name = '"+req.body.income_categories_name+"', description ='"+req.body.description+"' where income_categories_name = '"+req.body.income_categories_name_old+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log('error_update_income'+'\n'+sql); res.json({message:"error_update_income"});}
        else {res.json({message:yra})   }
    })  
}
module.exports.update_cost = function(req,res){
    const conn = require('./../config/config')
    const sql = "update costs_categories set cost_categories_name = '"+req.body.cost_categories_name+"', description ='"+req.body.description+"' where cost_categories_name = '"+req.body.cost_categories_name_old+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log(sql); res.json({message:"error_income_display"});}
        else {res.json({message:yra})   }
    })  
}
module.exports.updateZapIncome = function(req,res){
    const conn = require('./../config/config')
    const sql = "UPDATE `budget_income` SET `income_sum` = '"+req.body.income_sum+"', `income_category` = '"+req.body.income_category+"', `date` = '"+req.body.date+"' WHERE `budget_income`.`id_budget_income` = '"+req.body.id_budget_income+"' and id_user ='"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log(sql); res.json({message:"error_updateZapIncome"});}
        else {res.json({message:yra})   }
    })  
}
module.exports.updateZapCost = function(req,res){
    const conn = require('./../config/config')
    const sql = "UPDATE `budget_cost` SET `cost_sum` = '"+req.body.cost_sum+"', `cost_category` = '"+req.body.cost_category+"', `date` = '"+req.body.date+"' WHERE `budget_cost`.`id_budget_cost` = '"+req.body.id_budget_cost+"' and id_user ='"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log(sql); res.json({message:"error_updateZapCost"});}
        else {res.json({message:yra})   }
    })  
}
module.exports.setAdmin = function(req,res){
    let temp=''
    const conn = require('./../config/config')
    const sql = "SELECT DISTINCT id_user FROM `users` WHERE `code`='"+req.body.code+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log(sql); res.json({message:"error_setAdmin"});}
        else {temp=yra[0].id_user;
            const sql1="UPDATE `users` SET `id_admin` = '"+temp+"' WHERE id_user ='"+req.user.id_user+"'"
            conn.query(sql1,function(error,yra){
            if (error){console.log(sql1+" <> "+temp); res.json({message:"error_setAdmin"});}
            else {res.json({message:yra});console.log(temp);}
    })   
        }
    })  
    
}
module.exports.getAdmin = function(req,res){
    const conn = require('./../config/config')
    const sql = "SELECT `user_name`,`id_user` FROM `users` WHERE id_user=(SELECT`id_admin` FROM `users` WHERE id_user='"+req.user.id_user+"')"
    conn.query(sql,function(error,yra){
        if (error){console.log(sql); res.json({message:"error_getAdmin"});}
        else {res.json({message:yra[0]});console.log(JSON.stringify(yra))   }
    })  
}
module.exports.deleteAdmin = function(req,res){
    
    const conn = require('./../config/config')
    const sql = "UPDATE `users` SET `id_admin` = NULL WHERE `users`.`id_user` = '"+req.user.id_user+"'"
    conn.query(sql,function(error,yra){
        if (error){console.log(sql); res.json({message:"error_updateZapCost"});}
        else {res.json({message:yra})   }
    })  
}


