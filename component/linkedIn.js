const passport = require('passport')
const linkedinStrategy = require('passport-linkedin-oauth2').Strategy
const User = require('../models/User')




passport.use(new linkedinStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_KEY,
    callbackURL: "/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({'uid':profile.id},function(err,user){
        if(err) {return done(err)}
        if(user) {return done(null,user)}
  
        else {
          let newUser = new User()
          newUser.uid = profile.id,
          newUser.name = profile.displayName,
          newUser.email = profile.emails[0].value,
          newUser.pic = profile.photos[3].value
      
          newUser.save((err)=>{
            if(err) {throw err}
            else return done(null,newUser)
          })
        }
      })
      
    });
  }));
  

  
