const mongoose = require('mongoose');


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