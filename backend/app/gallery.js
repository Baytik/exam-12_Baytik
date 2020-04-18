const express = require('express');
const router = express.Router();
const config = require('../config');
const path = require('path');
const {nanoid} = require('nanoid');
const multer = require('multer');

const Gallery = require('../models/Gallery');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});
const upload = multer({storage});

router.get('/', async (req, res) => {
    const gallery = await Gallery.find().populate('user', {username: 1});
    return res.send(gallery)
});

router.get('/:id', async (req, res) => {
    const gallery = await Gallery.find({user: req.params.id}).populate('user', {username: 1});
    return res.send(gallery)
});

router.post('/', upload.single('image'), auth, async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }

    const user = req.user;
    const object = {
        user: user._id,
        title: req.body.title,
        image: req.body.image
    };

    const gallery = new Gallery(object);

    try {
        await gallery.save();
        return res.send(gallery);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const user = req.user;
    const findGallery = await Gallery.findOne({_id: req.params.id});
    if (JSON.stringify(user._id) === JSON.stringify(findGallery.user)) {
        await Gallery.deleteOne({_id: req.params.id});
        try {
            return res.send({message: 'Was deleted'})
        } catch (e) {
            return res.status(400).send(e);
        }
    } else {
        res.status(403).send({message: 'Not found'});
    }
});

module.exports = router;