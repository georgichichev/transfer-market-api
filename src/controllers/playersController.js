const router = require('express').Router();
const playerService = require('../services/playerService.js');

router.get('/', async (req, res) => {
    const players = await playerService.getAllPlayers();

    res.json(players);
});

router.post('/create', async (req, res) => {
   const player = await playerService.createPlayer(req.body);

   res.json(player);
});

router.get('/:id', async(req, res) => {
    try{
        const player = await playerService.getOnePlayer(req.params.id);

        res.json(player);
    }
    catch (err){
        res.status(400).json({message: 'Player not found.'})
    }
})

module.exports = router;