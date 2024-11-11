const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const http = require('http');

app.use(cors());
app.use(express.static('public'));

// Додайте маршрут для кореневої сторінки
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Надсилаємо HTML-файл
});

// Ваш існуючий маршрут для перевірки геолокації
app.get('/geolocate', async (req, res) => {
    const ip = req.query.ip;
    if (!ip) {
        return res.json({ error: 'IP-адреса обов\'язкова' });
    }

    try {
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(`https://ipinfo.io/${ip}/geo?token=` + process.env.API_KEY); // Не забудьте замінити YOUR_API_KEY
        const data = await response.json();
        if (data.error) {
            res.json({ error: data.error });
        } else {
            res.json({
                ip: data.ip,
                city: data.city,
                country: data.country,
                latitude: data.loc.split(',')[0],
                longitude: data.loc.split(',')[1]
            });
        }
    } catch (error) {
        res.json({ error: 'Не вдалося отримати дані' });
    }
});

// Додайте обробку помилок при запуску сервера
app.listen(PORT, (err) => {
    if (err) {
        console.error('Не вдалося запустити сервер:', err);
    } else {
        console.log(`Сервер запущений на порту ${PORT}`);
    }
});
