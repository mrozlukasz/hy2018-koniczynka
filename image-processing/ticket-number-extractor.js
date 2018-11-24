const _ = require('lodash');

exports.extract = function (lines) {
    return _(lines)
        .flatMap("Words")
        .map("WordText")
        .filter(t => t.length >= 21)
        .map(t => /\d{4}\-\d{9}\-\d{6}/.exec(t))
        .filter(m => m != null)
        .map(m => m[0])
        .first();

};