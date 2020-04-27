const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


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


//Routes

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port: ${PORT}`))
