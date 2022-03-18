const mysql =require('mysql')

const conn = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"root",
    database:"systemmoney_db"

})
conn.connect(function(err){
    if (!err){
        console.log("Polychilos'")
    }
    else console.log('net')
})
setInterval(function () {
    conn.query('SELECT 1');
}, 5000);
module.exports = conn