const {Player} = require('../models/Player.js');

exports.getAllPlayers = () =>{
    return Player.find();
};

exports.createPlayer = async (data) =>{
    const player = await Player.create(data);

    return player
};
exports.getOnePlayer = async (id) =>{
    const player = await Player.findById(id);

    return player
}
