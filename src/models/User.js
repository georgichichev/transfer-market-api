const {mongoose} = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        validate: {
            validator: function(email) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
            },
            message: 'Please enter a valid email address!'
        },
        required: true
    },
    username:{
        type: String,
        minLength: [4, 'Username must be at least 4 characters long.'],
        maxLength: [20, 'Username cannot be more than 20 characters long.'],
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

exports.User = User;