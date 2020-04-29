const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require ('express-session')

const app = express();

//DB confing
const db = require('./config/keys').MongoURI;

//Mongo connection
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Error', err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(bodyParser.urlencoded({ extended: false }))

//Express Session
app.use(session({
    secret: 'caesar',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

//Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error.success_msg = req.req.flash('error_msg');
    next();
})

//Routes

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port: ${PORT}`))
