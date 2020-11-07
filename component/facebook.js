const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy
const User = require('../models/User')




passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_KEY,
    callbackURL: "/facebook/callback",
    profileFields   : ['id','displayName','name','picture.type(large)','email']
  }, function(accessToken, refreshToken, profile, done) {
    
    process.nextTick(function () {
      User.findOne({'uid':profile.id},function(err,user){
        if(err) {return done(err)}
        if(user) {return done(null,user)}
  
        else {
          let newUser = new User()
          newUser.uid = profile.id,
          newUser.name = profile.displayName,
          newUser.email = profile.emails[0].value
          newUser.pic = profile.photos[0].value
      
          newUser.save((err)=>{
            if(err) {throw err}
            else return done(null,newUser)
          })
        }
      })
      
    });
  }));
  

  
