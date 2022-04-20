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
        .status(200)
        .type('json')
        .json(films);
    });
});

router.get('/book/:name', async (req, res) => {
    const name = req.params.name;
    console.log('name film: ' + name);

    res.render('seats', {
        script: '../../scripts/bundle-seats.js'
    });
});

async function getFilms(page){
    const films = await Film.find().select({ _id: 0, __v: 0 });
    //console.log(JSON.stringify(films));

    return films;
}

async function getSeats(film){
    const films = await Film.find().select({ _id: 0, __v: 0 });
    //console.log(JSON.stringify(films));

    return films;
}
module.exports = router;