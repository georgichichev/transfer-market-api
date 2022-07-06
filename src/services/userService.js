const {User} = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const secret = 'hd1kg2k 1g23ghjabn1£"!"d';

const jwtSign = promisify(jwt.sign);

exports.register = async (data) =>{
    const {email, username, password} = data;

    const isExisting = await User.findOne({email});

    if (isExisting){
        throw new Error('Email is already taken.')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({email, username, password: hashedPassword});
};

exports.login = async (data) =>{
    const {email, password} = data;

    const user = await User.findOne({email});

    if (!user){
        throw new Error('Invalid email or password.');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match){
        throw new Error('Invalid email or password.');
    }

    const payload = {id: user._id, email};

    const token = await jwtSign(payload, secret, {expiresIn: '2h'});

    return {
        email,
        accessToken: token,
        _id: user._id
    }
}
