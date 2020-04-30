const express = require('express');
const router = express.Router();
const { ensureAthenticated } = require('../config/auth')

//Welcome Page
router.get('/', (req, res) => 
    res.render('welcome')
);

//Dashboard
router.get('/dashboard', ensureAthenticated, (req, res) =>
    res.render('dashboard', {
        name: req.user.name
    })
);

module.exports = router