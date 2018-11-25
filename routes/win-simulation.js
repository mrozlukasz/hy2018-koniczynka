const express = require('express');
const router = express.Router();
const _ = require('lodash');
const model = require('../game/state/model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    try {

        let ctx;
        let arr;
        if (_.isEmpty(req.query.win)) {
            ctx = "Proszę podać parametr win i wartości";
            arr = "nic nie podano"
        } else {
            ctx = "Zwycięzcy są powiadamiani";
            arr = req.query.win.split(",");
            _.each(arr, item => item.RuleDetailID = parseInt(item.RuleDetailID, 10));
        }

        model.findWinners(arr);

        res.render('win-simulation', {
            title: 'Symulowanie losowania....',
            arr: arr,
            ctx: ctx
        });
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;
