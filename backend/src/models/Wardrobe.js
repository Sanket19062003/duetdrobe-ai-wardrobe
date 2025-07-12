const mongoose = require('mongoose');

const wardrobeSchema = new mongoose.Schema({
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['top','bottom','dress','outerwear','shoes','accessories']
    },
    color: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true,
        enum: ['spring', 'summer', 'fall', 'winter', 'all']
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags: [String],
    isFavorite: {
        type: Boolean,
        default: false
    }
},{ timestamps: true});

module.exports = mongoose.model('Wardrobe', wardrobeSchema);