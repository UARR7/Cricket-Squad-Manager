const Player = require('../models/player');

exports.createPlayer = async (data) => new Player(data).save();
exports.getAllPlayers = async () => Player.find();
exports.getPlayerById = async (id) => Player.findById(id);
exports.updatePlayer = async (id, data) => Player.findByIdAndUpdate(id, data, { new: true });
exports.deletePlayer = async (id) => Player.findByIdAndDelete(id);