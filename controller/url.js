const shortId = require('shortid');
const URL = require('../models/url');



async function handleGenerateNewUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "url is required"})
    const shortID = shortId(8);

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],

    })

    return res.render('home',{id:shortID})
    // return res.json({ id : shortID});
}

module.exports = {
    handleGenerateNewUrl,
}