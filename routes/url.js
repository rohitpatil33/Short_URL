const express = require('express');
const {handleGenerateNewUrl} = require("../controller/url");
const router = express.Router();

router.post('/',handleGenerateNewUrl);

module.exports = router ;