const _ = require('lodash');

exports.extract = function (event) {
    return _(event.message.attachments)
        .filter({type: 'image'})
        .map('payload')
        .map('url')
        .first();
};