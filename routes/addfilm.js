const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
const Film = require('../models/film');

router.get('/', async (req, res) => {
    res.render('add-film', {
        title: 'Adding new film',
        isAddFilm: true
    }); 
});

router.post('/', upload.single('img-film'), async (req, res) => {
    console.log(req.body);
    console.log(JSON.stringify(req.file));
    const { title, price, trailer, description } = req.body;
    
    res.redirect('/films');
});

module.exports = router;