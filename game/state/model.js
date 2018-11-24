var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Defining schema for our State API
var StateSchema = Schema({
    _id: String, // sender Id
    conversation: {
        id: String,
        name: String
    },
    games: [], //  3 gry
    /**
     *
     */
    coupons: [
        /**
         * id kuponu
         * data losowania
         * array 6 cyfr
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

module.exports = StateModel;