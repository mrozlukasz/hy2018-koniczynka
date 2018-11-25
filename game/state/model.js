const mongoose = require('mongoose');
const _ = require('lodash');
const conversation = require('../../routes/bots/conversation');
const request = require('request');

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

let StateModel = mongoose.model('State', StateSchema);

function getOrCreate(senderId) {
    return new Promise((resolve, reject) => {
        StateModel.findById(senderId).exec((err, state) => {
            console.log("State is ", state);
            if (err || state == null) {
                StateModel.create({_id: senderId, coins: 0}, function (err, ctx) {
                    if (err) {
                        console.log("Creating state fail", err);
                        reject(err);
                    }
                    console.log("created new state for sender id ", senderId);
                    resolve(ctx);
                });
            } else {
                console.log("found state for sender id ", senderId);
                resolve(state);
            }
        });
    });
}

function getCoins(senderId) {
    return getOrCreate(senderId).then((state) => {
        return state.coins;
    });
}

function incCoins(senderId, increment) {
    return getOrCreate(senderId).then((state) => {
        //console.log("state -> ", state);
        state.coins = state.coins + increment;
        state.save();
        return state.coins;
    });
}

function registerCoupons(senderId, coupons) {
    return getOrCreate(senderId).then((state) => {
        //console.log("state -> ", state);
        state.coupons = _.concat(state.coupons, coupons);
        state.coins = state.coins + 10;
        state.save();
        return state.coins;
    });
}

function findWinners(arr) {
    let PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

    StateModel.find({}, function (err, state) {
        if (!err) {
            console.log('state ', state);
            for (let i = 0; i < _.size(state.coupons); i++) {
                let coupon = state.coupons[i];
                console.log('c -> ', coupon);
            }
            for (var c in state.coupons) {
                console.log('c -> ', c);
                let res = _.intersection(c.numbers, arr);
                if (_.size(res) > 1) {
                    state.coins = state.coins + _.size(res) * 100;
                    console.log('win ', _.size(res));
                } else {
                    console.log("loose");
                }

                conversation.sendTextMessage(request, state._id, "Wygrana!!! " + _.size(res) > 1, PAGE_ACCESS_TOKEN);
            }
        } else {
            throw err;
        }
    });
}

//Exporting our model
exports.StateModel = StateModel;

exports.getOrCreate = getOrCreate;
exports.getCoins = getCoins;
exports.incCoins = incCoins;
exports.registerCoupons = registerCoupons;
exports.findWinners = findWinners;