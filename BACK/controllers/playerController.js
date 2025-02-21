const playerService = require('../services/playerService');

exports.createPlayer = async (req, res) => {
    try {
        const player = await playerService.createPlayer(req.body);
        res.status(201).json(player);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllPlayers = async (req, res) => {
    try {
        const players = await playerService.getAllPlayers();
        res.json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPlayerById = async (req, res) => {
    try {
        const player = await playerService.getPlayerById(req.params.id);
        if (!player) return res.status(404).json({ error: 'Player not found' });
        res.json(player);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePlayer = async (req, res) => {
    try {
        const player = await playerService.updatePlayer(req.params.id, req.body);
        if (!player) return res.status(404).json({ error: 'Player not found' });
        res.json(player);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePlayer = async (req, res) => {
    try {
        const player = await playerService.deletePlayer(req.params.id);
        if (!player) return res.status(404).json({ error: 'Player not found' });
        res.json({ message: 'Player deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
