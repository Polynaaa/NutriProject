const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const restSchema = new Schema({
    _id: { type: String },
    name: { type: String },
    description: { type: String },
    keywords: { type: [String] },
    rating: { type: String },
    photo: { type: String },
    lat: { type: Number },
    lng: { type: Number },
})

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        unique: true,
    },
    preferences: {
        type: String,
        required: true,
    }
})

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect username");
};

const Restaurants = mongoose.model('Restaurants', restSchema, 'restaurants')
const Users = mongoose.model('Users', userSchema, 'users')
const mySchemas = { 'Restaurants': Restaurants, 'Users': Users }

module.exports = mySchemas