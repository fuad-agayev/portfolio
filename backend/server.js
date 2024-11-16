// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Email göndermek için
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// İletişim formu gönderim endpoint'i
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // E-posta gönderimi için yapılandırma
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Örneğin Gmail kullanabilirsiniz
        auth: {
            user: 'agayevfuad', // E-posta adresinizi buraya yazın
            pass: 'your-email-password' // E-posta şifrenizi buraya yazın
        }
    });

    const mailOptions = {
        from: email,
        to: 'agayevfuad99851@yahoo.com', // Kendi e-posta adresiniz
        subject: `Message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent successfully!');
    });
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
