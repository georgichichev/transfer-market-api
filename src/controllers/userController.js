const router = require('express').Router();
const userService = require('../services/userService.js');
const {errorMapper} = require('../util.js');

router.post('/register',async (req, res) => {
    try{
        const user = await userService.register(req.body);

        res.json(user);
    }
    catch (err){
        const message = errorMapper(err);
        res.status(400).json({message});
    }
});

router.post('/login',async (req, res) => {
    try {
        const user = await userService.login(req.body);

        res.json(user);
    }
    catch (err){
        const message = errorMapper(err);

        res.status(400).json({message});
    }
});

router.get('/logout', (req, res) => {
    userService.logout(req.token);

    res.status(204).end();
})

module.exports = router;