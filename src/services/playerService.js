const {Player} = require('../models/Player.js');

exports.getAllPlayers = () =>{
    return Player.find();
};

exports.createPlayer =  (data) =>{
    return Player.create(data);
};
exports.getOnePlayer = (id) =>{
    return Player.findById(id);
};

exports.deletePlayer = (id) =>{
    return Player.findByIdAndDelete(id);
};

exports.editPlayer = (id,data) =>{
    return Player.findByIdAndUpdate(id, data, {new: true});
}
