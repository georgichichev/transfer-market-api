const {User} = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const {JWT_SECRET} = require('../constants.js');

const jwtVerify = promisify(jwt.verify);
const jwtSign = promisify(jwt.sign);

const tokenBlacklist = new Set();


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

    const payload = {_id: user._id, email};

    const token = await jwtSign(payload, JWT_SECRET, {expiresIn: '2h'});

    return {
        email,
        accessToken: token,
        _id: user._id
    }
};

exports.logout = (token) =>{
    tokenBlacklist.add(token);
};

exports.validateToken = (token) =>{
    if (tokenBlacklist.has(token)){
        throw new Error('Invalid access token.')
    }

    return jwtVerify(token, JWT_SECRET);
}
