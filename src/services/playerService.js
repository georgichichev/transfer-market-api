const {Player} = require('../models/Player.js');

exports.getAllPlayers = () =>{
    return Player.find();
};