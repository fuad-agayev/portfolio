// backend/server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
//app.use(express.static('frontend')); 
const PORT = 5500;

// Middleware
//app.use(cors());
app.use(cors({ origin: 'http://localhost:5500', methods: ['POST']})); //fontend url

app.use(bodyParser.json());

// POST Endpoint
app.post('/load', async (req, res) => {
    res.send("Mesaj yasildi")
    const { name, email, message } = req.body;
    // Nodemailer Config
    const transporter = nodemailer.createTransport({
        service: 'gmail', // veya kullandığınız e-posta servisi
        auth: {
            user: process.env.EMAIL_USER, // .env dosyasından gelecek
            pass: process.env.EMAIL_PASS, // .env dosyasından gelecek
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL, // E-postaların gideceği adres
        subject: `Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

