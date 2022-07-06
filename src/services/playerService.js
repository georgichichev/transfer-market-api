const {Player} = require('../models/Player.js');

exports.getAllPlayers = () =>{
    return Player.find();
};

exports.getOnePlayer = (id) =>{
    return Player.findById(id);
}

exports.createPlayer = (data, creator) =>{
    return Player.create({...data, creator});
};
exports.getOnePlayer = (id) =>{
    return Player.findById(id);
};

exports.deletePlayer = (id) =>{
    return Player.findByIdAndDelete(id);
};

exports.editPlayer = (id,data) =>{
    return Player.findByIdAndUpdate(id, data, {new: true, overwrite: true, runValidators: true});
};
