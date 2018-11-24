const mongoose = require('mongoose');
const _ = require('lodash');

let GamesSchema = mongoose.Schema({
    code: String,
    progress: Number,
    max: Number,
    state: String
});

// Defining schema for our State API
var StateSchema = mongoose.Schema({
    _id: String, // sender Id
    conversation: {
        id: String,
        name: String
    },
    games: [GamesSchema], //  3 gry
    /**
     *
     */
    coupons: [
        /**
         * id kuponu
         * data losowania
         * array 6 liczb
         */
    ],
    coins: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});
//Exporting our model
var StateModel = mongoose.model('State', StateSchema);

exports.StateModel = StateModel;

function getOrCreate(senderId) {
    return new Promise((resolve, reject) => {
        StateModel.findById(senderId).exec((err, state) => {
            if (err) {
                StateModel.create({_id: senderId, coins: 0}, function (err, ctx) {
                    if (err) {
                        reject(err);
                    }
                    console.log("created new state for sender id ", senderId);
                    resolve(ctx);
                });
            }
            console.log("found state for sender id ", senderId);
            resolve(state);
        });
    });
}

exports.getCoins = function (senderId) {
    return getOrCreate(senderId).then((state) => {
        return state.coins;
    });
};

exports.incCoins = function (senderId, increment) {
    return getOrCreate(senderId).then((state) => {
        console.log("state -> ", state);
        state.coins = state.coins + increment;
        state.save();
        return state.coins;
    });
};

exports.registerCoupons = function (senderId, coupons) {
    StateModel.update(
        {_id: senderId},
        {
            $push: {
                coupons: {
                    $each: coupons
                }
            }
        }
    );
};

exports.getOrCreate = getOrCreate;