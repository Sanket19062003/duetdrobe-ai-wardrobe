const express = require('express');
const Wardrobe = require('../models/Wardrobe');
const authenticateToken = require('../middleware/auth');

const router = express.Router();


//get all clothes for a user
router.get('/',authenticateToken, async (req, res) => {
    try{
        const clothes = await Wardrobe.find({ userId: req.user.userId});
        res.json(clothes);
    } catch (err){
        res.status(500).json({ message: 'Server error', error: err.message});
    }
});

// Add a new clothing item
router.post('/',authenticateToken, async (req, res) => {
    try{
        const { name, category, color, season, imageUrl, tags } = req.body;
        const newItem = new Wardrobe({
            userId: req.user.userId,
            name,
            category,
            color,
            season,
            imageUrl,
            tags: tags || []
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch(err){
        res.status(500).json({ message: 'Server error', error: err.message});
    }
});

//Update a clothing item
router.put('/:id', authenticateToken, async(req,res) => {
    try{
        const item = await Wardrobe.findOneAndUpdate(
            {
                _id: req.params.id, userId: req.user.userId
            },
            req.body,
            { new: true}
        );
        if (!item){
            return res.status(404).json({message: 'Item not found'});
        }
        res.json(item);
    } catch (err){
        res.status(500).json({ message: 'Server error', error: err.message});
    }
});

//Toggle favourite status
router.patch('/:id/favorite', authenticateToken, async(req,res) => {
    try{
        const item = await Wardrobe.findOneAndUpdate(
            {
                _id:req.params.id, userId: req.user.userId
            },
            {
                $set: { isFavorite: !req.body.isFavorite}
            },
            {
                new: true
            }
        );

        if(!item){
            return res.status(404).json({message: 'Item not found'});
        }
        res.json(item);
    }catch(err){
        res.status(500).json({message: 'Server error', error: err.message});
    }
});

module.exports = router;