var express = require('express');
var router = express.Router();

const _ = require('lodash');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let ctx;
    let arr;
    if (_.isEmpty(req.query.win)) {
        ctx = "Proszę podać parametr win i wartości";
        arr = "nic nie podano"
    } else {
        ctx = "Zwycięzcy są powiadamiani";
        arr = req.query.win.split(",");
    }

    res.render('win-simulation', {
        title: 'Symulowanie losowania....',
        arr: arr,
        ctx: ctx
    });
});

module.exports = router;
