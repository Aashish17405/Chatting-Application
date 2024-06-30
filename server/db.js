const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect("mongodb+srv://Aashish17405:Aashish17@cluster0.muslifi.mongodb.net/chat-app");

const userSchema = new mongoose.Schema({
    username: String,
    mess: String
}, { collection: 'aashish' })

const message=mongoose.model('aashish',userSchema);

module.exports={
    message
};