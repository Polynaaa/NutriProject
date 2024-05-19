const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const recController = require("../controllers/recController")
const recommendController = require("../controllers/recommendController")
const { register, login } = require("../controllers/controllers");
const { checkUser } = require("../middleware/utils")
const jwt = require("jsonwebtoken")

router.get('/restaurants', (req, res) => {
    const restaurants = schemas.Restaurants
    const restData = restaurants.find({})
        .then((restData) => {
//            console.log('Restaurants', restData)
            res.json(restData)
        })
});

router.get('/filtered', async (req, res) => {
    const restaurants = schemas.Restaurants
    const { q, keywords } = req.query;
    let query = {};

    if (q) {
        const searchWords = new RegExp(q, 'i');
        query = {
            $or: [
                { name: { $regex: searchWords } },
                { description: { $regex: searchWords } },
                { keywords: { $regex: searchWords } }
            ]
        };
    }
    if (keywords) {
        const keywordArray = keywords.split(',').map(kw => kw.trim());
        query.keywords = { $all: keywordArray };
    }
    try {
        const filteredData = await restaurants.find(query);
        res.json(filteredData);
    } catch (error) {
        console.error('Error fetching filtered restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/', checkUser)
router.post('/register', register)
router.post('/login', login)

router.get('/profile', async (req, res) => {
    try {
        // Get the JWT token from the request cookies
        const token = req.cookies.jwt;

        // Check if the token exists
        if (!token) {
            return res.status(405).json({ message: 'No token' });
        }

        // Verify the token
        jwt.verify(token, "super secret key", async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                // If the token is valid, get the user's ID from the decoded token
                const userId = decodedToken.id;

                // Find the user in the database using the ID
                const user = await schemas.Users.findById(userId);
                console.log(user);
                // Check if the user exists
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json(user);
            }
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/recommendations', async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken = jwt.verify(token, "super secret key");
        const userId = decodedToken.id;

        const user = await schemas.Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userPreferences = user.preferences;
        console.log("Received user preferences in routes:", userPreferences);
        const restaurantData = await schemas.Restaurants.find({});
        console.log("Received restaurant data in routes:", restaurantData);

        const recommendations = await recommendController.generateRestRecommendations( userPreferences, restaurantData);
        res.json({ recommendations });
        console.log("Recommendations:", recommendations)
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router