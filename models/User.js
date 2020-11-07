const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true , useUnifiedTopology:true});

var userSchema = mongoose.Schema({
    uid: String,
    email:String,
    name:String,
    pic:String
})

module.exports = mongoose.model('user',userSchema)