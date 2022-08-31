require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')

const PORT = process.env.PORT || 5002

// Connect to Database
connectDB();

app.use(logger)

app.use(credentials)

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

// Routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/auth'))
app.use('/logout', require('./routes/logout'))
app.use('/users', require('./routes/api/users'))
app.use('/refresh', require('./routes/refresh'))

// app.use(verifyJWT);

app.get("/", (req, res) => {
    res.json({
        message: 'Hello! Welcome to Card Store.'
    })
})

app.post('/post', (req, res) => {
    console.log('Connected to react!')
    res.redirect('/')
})

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
