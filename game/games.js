const model = require("./state/model");
const _ = require('lodash');

const GAMES={
    FIVE_IN_ROW : {
        code : "FIVE_IN_ROW",
        progress: 0,
        max: 5,
        state: "IN_PROGRESS"
    },
    GO_TO: {
        code : "GO_TO",
        progress: 0,
        max: 3,
        state: "IN_PROGRESS"
    },
    GUESS_WINNERS: {
        code : "GUESS_WINNERS",
        progress: 0,
        max: 1,
        state: "IN_PROGRESS"
    }

};


exports.subscribe = function (senderId, game) {
    model.getOrCreate(senderId)
        .then(state => {
            if(_(state.games).filter({code:game}).any()){
                console.log("User already subscribed to this game");
                throw "User already subscribed";
            } else {
                state.games.push(GAMES[game]);
                state.save();
            }
        })
};


exports.addProgress = function (senderId, gameCode, progress = 1) {
    return model.getOrCreate(senderId)
        .then(state => {
            let game = _(state.games).filter({code:gameCode}).first();
            if(game == null ){
                console.log("User wasn't subscribed to this game", gameCode);
                throw "User wasn't subscribed to game" + gameCode;
            }
            game.progress += progress;
            if(game.progress >= game.max) {
                game.state = "FINISHED";
            }
            return game.state;
        })
};

exports.games = _.keys(GAMES);