const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifymessage } = require('./zod');
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

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.post('/a', async (req, res) => {
    await message.create({
        username:"aashish",
        mess: "hello bro whatsapp"
    });
    res.json({ msg: "Successfully created todo" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
