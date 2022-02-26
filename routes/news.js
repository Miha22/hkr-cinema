const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('news', {
        title: 'News',
        isNews: true
    }); 
});

module.exports = router;