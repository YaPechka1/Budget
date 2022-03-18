    const keys = require('../config/keys')
const conn = require('./../config/config')

const JwtStategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const options ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}
module.exports = function(passport){
passport.use(
    
        new JwtStategy(options,function(payload,done) {
         
       conn.query('select id_user, login_user, id_role from users where id_user ='+payload.id_user,
        function(err,result){
            if (err) console.log('err')
            if (result.length<1) done(null,false);
            else{
                var user ={
                   id_user: result[0].id_user,
                    login_user: result[0].login_user,
                    id_role: result[0].id_role
                     
                }
                done(null,user)
            }
        } )
        })
    )
}