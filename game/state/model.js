var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Defining schema for our State API
var StateSchema = Schema({
    conversation: {
        id: String,
        name: String
    },
    games: [],
    created_at: {
        type: Date,
        default: Date.now
    }
});
//Exporting our model
var StateModel = mongoose.model('State', StateSchema);

module.exports = StateModel;