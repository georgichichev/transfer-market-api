const router = require('express').Router();
const playerService = require('../services/playerService.js');
const {isAuth} = require('../middlewares/auth.js');

router.get('/', async (req, res) => {
    const players = await playerService.getAllPlayers();

    res.json(players);
});

router.post('/', isAuth, async (req, res) => {
   const player = await playerService.createPlayer(req.body);

   res.json(player);
});

router.get('/:id', async(req, res) => {
    try{
        const player = await playerService.getOnePlayer(req.params.id);

        res.json(player);
    }
    catch (err){
        console.log(err);
        res.status(400).json({message: 'Player not found.'})
    }
});

router.delete('/:id',async (req, res) => {
    try {
        await playerService.deletePlayer(req.params.id);
    }
    catch (err){
        console.log(err);
        res.status(400).json({message: 'Player not found.'});
    }
});

router.put('/:id',async (req, res) => {
    try {
        const player = await playerService.editPlayer(req.params.id, req.body);

        res.json(player);
    }
    catch (err){
        console.log(err);

        res.status(400).json({message: 'Player not found.'});
    }
})

module.exports = router;