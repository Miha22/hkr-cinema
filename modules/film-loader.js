const Film = require('../models/film');

async function getFilms(date){
    // var filter = { 
    //     $and: [
    //         { "$expr": { "$eq": [{ "$year": "$start_date" }, date.getFullYear()] } },
    //         { "$expr": { "$eq": [{ "$month": "$start_date" }, date.getMonth() + 1] } },
    //         { "$expr": { "$eq": [{ "$dayOfMonth": "$start_date" }, date.getUTCDate() + 1] } }
    //       ]
    // };
    const films = await Film.find().select({ _id: 0, __v: 0 });
    //console.log(JSON.stringify(films));

    return films;
}

async function loadFilms(socket) {
    return new Promise(resolve => {
        const films = getFilms(null);

    });
}

module.exports = {
    loadFilms
};