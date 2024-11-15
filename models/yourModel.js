const mongoose = require('mongoose');

const YourSchema = new mongoose.Schema({
    // Define fields based on your Excel columns
    // Example:
    name: String,
    age: Number,
    email: String
    // Add other fields as needed
});

module.exports = mongoose.model('YourModel', YourSchema);