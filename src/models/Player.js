const {mongoose} = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    creator:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;