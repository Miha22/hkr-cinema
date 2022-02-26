const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('films', {
        title: 'List of films',
        isFilms: true
    }); 
});

module.exports = router;