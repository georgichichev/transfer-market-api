const secret = 'hd1kg2k 1g23ghjabn1£"!"d';
const playerService = require('../services/playerService.js');
const {validateToken} = require('../services/userService.js');

exports.auth = async (req, res, next) =>{
    const token = req.headers['x-authorization'];

    if (token){
        try{
            const user = await validateToken(token, secret);
            req.user = user;
            req.token = token;
        }
        catch (err){
           return res.status(401).json({message: 'Invalid access token.'});
        }
    }

    next();
};

exports.isAuth = (req, res, next) =>{
    const user = req.user;

    if (!user){
       return res.status(401).json({message: 'Please provide an access token.'})
    }

    next();
};

exports.preloadPlayer = async(req, res, next) =>{
    const item = await playerService.getOnePlayer(req.params.id);

    if (!item){
        return res.status(404).json({message: 'Player not found.'});
    }

    res.locals.player = item;
    next();
}

exports.isOwner = (req, res, next) =>{
    console.log(req.user);

    if (req.user.id == res.locals.player.creator){
        next();
    }
    else{
        res.status(403).json({message: 'You have no permission to do this.'});
    }
}