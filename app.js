const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//Passport Config
require('./config/passport')(passport);

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
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

// Global Variables/Flash Messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port: ${PORT}`))
