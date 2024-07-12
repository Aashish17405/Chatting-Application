const jwt=require("jsonwebtoken");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifymessage,emailSchema,passwordSchema } = require('./zod');
const { message } = require('./db');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error("MongoDB URI is not defined");
    process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    const jwtPassword="secret";
function jwtsign(username,password){
    const usernameResponse=emailSchema.safeParse(username);
    const passwordResponse=passwordSchema.safeParse(password);
    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }
    const signature=jwt.sign({
        username
    },jwtPassword);
    return signature;
}

app.post('/', (req, res) => {
    const createPayload = req.body.username;
    const newUser = emailSchema.safeParse(createPayload);
    console.log(req.body);
    console.log(newUser);
    res.send("Hello world");
});

app.post('/send', async (req, res) => {
    await message.create({
        username:req.body.username,
        mess: req.body.message
    });
    res.json({ msg: "Successfully created todo" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
