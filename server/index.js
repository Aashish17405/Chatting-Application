const jwt=require("jsonwebtoken");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifymessage,emailSchema,passwordSchema,idSchema } = require('./zod');
const { message } = require('./db');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;
const jwtPassword=process.env.JWT_SECRET;

if (!mongoURI) {
    console.error("MongoDB URI is not defined");
    process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



// JWT Signing Middleware
function jwtSign(req, res, next) {
    const { userId, username, password } = req.body;

    const userIdResponse = idSchema.safeParse(userId);
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if (!userIdResponse.success || !usernameResponse.success || !passwordResponse.success) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const token = jwt.sign({ id: userIdResponse.data }, jwtPassword);
    res.locals.token = token;
    next();
}

// Routes
app.post('/', jwtSign, (req, res) => {
    console.log(req.body);
    res.json({ token: res.locals.token });
});

app.post('/send', async (req, res) => {
    try {
        await message.create({
            username: req.body.username,
            mess: req.body.message
        });
        res.json({ msg: "Message successfully created" });
    } catch (err) {
        console.error('Error creating message:', err);
        res.status(500).json({ msg: "Failed to create message" });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});