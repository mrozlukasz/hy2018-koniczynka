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
        max: 1,
        state: "IN_PROGRESS"
    },
    GUESS_WINNERS: {
        code : "GUESS_WINNERS",
        progress: 0,
        max: 1,
        state: "IN_PROGRESS"
    }

};


exports.types = {
    FIVE_IN_ROW:"FIVE_IN_ROW",
    GO_TO:"GO_TO",
    GUESS_WINNERS:"GUESS_WINNERS"
};

exports.subscribe = function (senderId, gameCode) {
    return model.getOrCreate(senderId)
        .then(state => {
            let game  = _(state.games).filter({code:gameCode}).first();

            if (!game) {
                game = GAMES[gameCode];
                state.games.push(game);
                state.save();
                return game;
            }else {
                return game;
            }
        })
};

exports.gamesProgress = function(senderId){
    return model.getOrCreate(senderId)
        .then(state => {
            _(state.games)
                .map(g => {
                    return {
                        code: g.code,
                        progress: `${g.progress}/${g.max}`,
                        state: g.state
                    }
                })
        })
};


exports.addProgress = function (senderId, gameCode, progress = 1) {
    return model.getOrCreate(senderId)
        .then(state => {
            let game = _(state.games).filter({code:gameCode}).first();
            if(game == null ){
                return "NO_STARTED"
            }
            game.progress += progress;
            if(game.progress >= game.max) {
                state.games = _(state.games).filter(g => g.code !== gameCode).value();
                state.coins++;
                state.save();
                return "FINISHED";
            }
            return "IN_PROGRESS";
        })
};

