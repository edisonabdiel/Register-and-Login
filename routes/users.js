const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
    res.render('login')
});

//Register page
router.get('/register', (req, res) => {
    res.render('register')
});

//Register Handler
router.post('/register', (req, res) => {
    console.log(req.body)
    const { name, email, password, password2 } = req.body;
    let errors = [];
    //Check for required fields
    if (!name || !email, !password || !password2) {
        errors.push({ msg: "Please fill in all the fields" });
    }
    if (password != password2) {
        errors.push({ msg: "Passwords don't match" });
    }
    if (password.length < 6) {
        errors.push({ msg: "Password should be at least 6 characters" })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        res.send('pass');
    }
});


    module.exports = router;