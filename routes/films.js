const express = require('express');
const router = express.Router();
const Film = require('../models/film');

router.get('/', async (req, res) => {
    await getFilms(null);
    res.render('films', {
        title: 'List of films',
        isFilms: true
    }); 
});

async function getFilms(date){
    // var filter = { 
    //     $and: [
    //         { "$expr": { "$eq": [{ "$year": "$start_date" }, date.getFullYear()] } },
    //         { "$expr": { "$eq": [{ "$month": "$start_date" }, date.getMonth() + 1] } },
    //         { "$expr": { "$eq": [{ "$dayOfMonth": "$start_date" }, date.getUTCDate() + 1] } }
    //       ]
    // };
    const films = await Film.find();
    console.log(JSON.stringify(films));

    return JSON.stringify(films);
}

module.exports = router;