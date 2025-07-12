const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//Load environment variables from .env file
dotenv.config();

//Create express app
const app = express();

//Enable CORS for all routes
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const wardrobeRoutes = require('./routes/wardrobe');
app.use('/api/wardrobe',wardrobeRoutes);

const outfitRoutes = require('./routes/outfits');
app.use('/api/outfits',outfitRoutes);

//Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({status: 'ok', message: 'Wardrobe AI backend is running'});
});

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');

    //Start server only after DB connection
    app.listen(process.env.PORT, ()=> {
        console.log(`Server running on port ${process.env.PORT}`)
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});
