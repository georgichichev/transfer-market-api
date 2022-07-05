const router = require('express').Router();
const playerService = require('../services/playerService.js');

router.get('/', async (req, res) => {
    const players = await playerService.getAllPlayers();

    res.json(players);
})

module.exports = router;