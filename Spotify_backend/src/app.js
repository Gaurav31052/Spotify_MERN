require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/db');
const dns = require('dns');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/auth.route');
const musicRoutes = require('./Routes/music.route');

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);
connectDB();






module.exports = app;