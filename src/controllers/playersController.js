const router = require('express').Router();
const playerService = require('../services/playerService.js');
const {isAuth, preloadPlayer, isOwner} = require('../middlewares/auth.js');
const {errorMapper} = require('../util.js');


router.get('/', async (req, res) => {
    const players = await playerService.getAllPlayers();

    res.json(players);
});

router.post('/', isAuth, async (req, res) => {
    try{
        const player = await playerService.createPlayer(req.body, req.user.id);

        res.json(player);
    }
    catch (err){
        console.log(err)

        const message = errorMapper(err);
        res.status(400).json({message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const player = await playerService.getOnePlayer(req.params.id);

        res.json(player);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Player not found.'})
    }
});

router.delete('/:id', isAuth, preloadPlayer, isOwner, async (req, res) => {
    try {
        await playerService.deletePlayer(req.params.id);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Player not found.'});
    }
});

router.put('/:id', isAuth, preloadPlayer, isOwner, async (req, res) => {
    try {
        const player = await playerService.editPlayer(req.params.id, {...req.body, creator: req.user._id});

        res.json(player);
    } catch (err) {
        const message = errorMapper(err);
        res.status(400).json({message});
    }
});

module.exports = router;
