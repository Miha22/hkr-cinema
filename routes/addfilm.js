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
    //console.log(req.body);
    //console.log(JSON.stringify(req.file));
    const { title, trailer, description } = req.body;
    await addFilm(title, req.file.originalname, trailer, description);
    
    res.redirect('/films');
});

async function addFilm(title, img, trailer, description) {
    await new Film({
        title, 
        img, 
        trailer,
        description
    }).save();

    return {
        error: '',
        modified: 1
    };
}

module.exports = router;