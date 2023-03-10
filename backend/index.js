const express = require('express');
const {Server} = require('socket.io');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/authRouter');
const session = require('express-session');
const redisClient = require('./redis');
const redisStore = require('connect-redis')(session);
const server = require('http').createServer(app);
require("dotenv").config();  // Import the dotenv package to access the .env file

const port = process.env.PORT || 4000;

//PRODUCTION
//const useferoute = 'https://dsanmart-recipeapp2-fe-prod.azurewebsites.net';

//LOCAL DEVELOPMENT
const useferoute = 'http://localhost:3000';

const io = new Server(server, {
    cors: {
        origin: useferoute, // <-- location of the react app were connecting to
        credentials: "true",
    }
});

app.use(helmet()); // <-- security
app.use(cors({  // <-- Cross-Origin Resource Sharing (CORS) allows to make requests to the server deployed at a different domain than the one where the backend is hosted on.
    origin: useferoute,
    credentials: true
}));

app.use(express.json()); // <-- allows to parse JSON bodies
app.use(session({ // <-- session middleware
    secret: process.env.COOKIE_SECRET, // <-- secret used to sign the session ID cookie
    credentials: true, // <-- allow session cookie from browser to pass through
    name: 'sid', // <-- name of session ID cookie
    store: new redisStore({client: redisClient}), // <-- connect express-session to connect-redis
    resave: false,
    saveUninitialized: false, // <-- don't save unmodified (saves resources)
    cookie: {
        secure: process.env.ENVIRONMENT === 'production' ? "true" : "auto", // To use cookies in development
        httpOnly: true,
        expires: 1000 * 60 * 60 * 24 * 2, // 2 days
        sameSite: process.env.ENVIRONMENT === 'production' ? "none" : "lax", // Whether to share cookies between different domains
    }
}));

app.use('/auth', authRouter);
app.use('/api', require('./routers/recipeRouter'));

io.on('connection', (socket) => {}); // <-- socket.io connection

server.listen(port, () => {
    console.log('listening', useferoute);
});