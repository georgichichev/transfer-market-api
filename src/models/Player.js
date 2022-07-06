const {mongoose} = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength:[3, 'Name must be at least 3 characters long.'],
        maxLength:[50, 'Name cannot be more than 50 characters long.'],
        required: true
    },
    age: {
        type: Number,
        min:[15, 'Age must be between than 15 and 45.'],
        max:[45, 'Age must be between than 15 and 45.'],
        required: true
    },
    country: {
        type: String,
        minLength:[4, 'Country must be at least 4 characters long.'],
        maxLength:[56, 'Country cannot be more than 56 characters long.'],
        required: true
    },
    position: {
        type: String,
        minLength:[4, 'Position must be at least 4 characters long.'],
        maxLength:[30, 'Position cannot be more than 30 characters long.'],
        required: true
    },
    team: {
        type: String,
        minLength:[4, 'Team must be at least 4 characters long.'],
        maxLength:[30, 'Team cannot be more than 30 characters long.'],
        required: true
    },
    price: {
        type: Number,
        min:[1, 'Price cannot be less than 1.'],
        required: true
    },
    creator:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Player = mongoose.model('Player', playerSchema);

exports.Player = Player;