const express = require('express');
const URL = require('../models/url');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allUrls = await URL.find({}); // Fetch all URLs from the database

        return res.render('home', {
            urls: allUrls // Pass the data to the template
        });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.render('home', { urls: [] }); // Pass an empty array in case of error
    }
});

module.exports = router;
