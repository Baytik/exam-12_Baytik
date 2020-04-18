const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;