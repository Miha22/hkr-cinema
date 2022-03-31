const express = require('express');
const router = express.Router();
const Film = require('../models/film');

router.get('/', async (req, res) => {
    //const films = getFilms(null);
    res.render('films', {
        title: 'List of films',
        isFilms: true
    });
});

router.get('/:page', async (req, res) => {
    const page = req.params.page;
    console.log('Page: ' + page);

    getFilms(page).then(films => {
        res
        .json({ data: films });
    });
});

async function getFilms(page){
    const films = await Film.find().select({ _id: 0, __v: 0 });
    //console.log(JSON.stringify(films));

    return films;
}

module.exports = router;