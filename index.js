const express = require('express')
const app = express()


const passport = require('passport')
const session = require('cookie-session');
require('dotenv').config()
require('./component/linkedIn')
require('./component/facebook')




app.use(session({ secret: "cool", saveUninitialized: true, resave: true }));
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname+'/views'))





//LinkedIn
app.get('/auth/linkedin',passport.authenticate('linkedin'));


app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/homepage',
  failureRedirect: '/failed'
  }));


//Facebook
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email,user_photos' }));

app.get('/facebook/callback',passport.authenticate('facebook',{
  successRedirect: '/homepage',
  failureRedirect: '/failed'
}))


app.get('/homepage',isAuth,(req,res)=>{
    res.render('homepage.ejs',{user:req.user})
})

function isAuth(req,res,next){
  if(req.isAuthenticated()){return next()}
  res.redirect('/')
}

app.get('/failed',(req,res)=>{
    res.send("Failed")
})

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

//Passport serialize

passport.serializeUser(function(user,done){
    done(null,user)
})

passport.deserializeUser(function(id,done){
    return done(null,id)
})




  
  app.set('view engine','ejs')


app.get('/',(req,res)=>{
  res.render('index')
})
app.get('/homepage',(req,res)=>{
  res.render('homepage')
})


const host = '0.0.0.0';
const port = process.env.PORT || 5000;
app.listen(port,host)