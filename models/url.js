const mongoose = require("mongoose");

// Define schema for storing URLs
const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true },
    visitHistory: { type: Number, default: 0 }
}, { timestamps: true });

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
