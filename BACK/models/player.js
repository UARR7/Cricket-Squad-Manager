const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: String, enum: ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'], required: true },
    team: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);