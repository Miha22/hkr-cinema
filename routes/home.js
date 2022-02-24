const express = require('express');
const router = express.Router();
const path = require('path');
const moment = require('moment-timezone');

router.get('/', async (req, res) => {
    res.render('home', {
        title: 'This is start page',
        isIndex: true
    }); 
});

module.exports = router;

// res
//         .type('html')
//         .render('finger-printing', {
//             title: 'Fingerprint capture',
//             token,
//             layout: 'empty'
//         });

// res
//             .status(404)
//             .send("No such token exists: " + token);

// res.render('test', {
//     layout: 'empty-true-test'
// }); 