const _ = require('lodash');


exports.extract = function(lines) {

     let withNumbersIndex = _(lines)
        .filter(l => l.Words.length === 7)
        .filter(l => l.Words[0].WordText.match("\\w:"))
         .map(l => _(l.Words).drop())
        .filter(l => l.map("WordText").every(n => n.match("\\d\\d")))
         .map(l => l.map("WordText").map(_.parseInt).value())
        .value();

    let withoutNumbersIndex = _(lines)
        .filter(l => l.Words.length === 6)
        .map(l => _(l.Words).map("WordText"))
        .filter(l => l.every(n => n.match("\\d\\d")))
        .map(l => l.map(_.parseInt).value())
        .value();

    return _.concat(withNumbersIndex, withoutNumbersIndex)


};