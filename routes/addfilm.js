const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('add-film', {
        title: 'Adding new film',
        isAddFilm: true
    }); 
});

module.exports = router;