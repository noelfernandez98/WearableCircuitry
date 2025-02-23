require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;


const handleCookieSessions = require('./middleware/handleCookieSessions');
const logRoutes = require('./middleware/logRoutes');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const devicesRouter = require('./routers/devicesRouter');



// middleware
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend

app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/devices', devicesRouter);



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) return next();
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});