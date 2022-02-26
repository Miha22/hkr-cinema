const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('add-film', {
        title: 'Adding new film',
        isAddFilm: true
    }); 
});

router.post('/', async (req, res) => {
    console.log(req.body);
    
    res.redirect('/films');
});

module.exports = router;