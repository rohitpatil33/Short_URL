const express = require('express');
const path = require('path');
const urlRoute = require("./routes/url");
const { ConnectToMongoDB } = require("./connect");
const URL = require("./models/url");
const app = express();
const staticRoute = require("./routes/staticRouter");
const port = 8001;

ConnectToMongoDB('mongodb://localhost:27017/short_url').then(() => {
    console.log('Mongodb connected');
});

app.use('/', staticRoute);

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home');
    // return res.end(`
    //     <html>
    //     <head>
    //     </head>
    //     <body>
    //     <ol>
    //     ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}
    //     </ol>
    //     </body>
    //     </html>
    // `)
});

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    });

    if (entry && entry.redirectURL) {
        // If entry and redirectURL exist, redirect
        res.redirect(entry.redirectURL);
    } else {
        // If entry is not found or redirectURL is missing, return 404
        res.status(404).send('Short URL not found');
    }
});

app.listen(port, () => {
    console.log(`server started at port number ${port}`);
});
