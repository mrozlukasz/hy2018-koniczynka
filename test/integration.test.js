var should = require('should'),
    sinon = require('sinon'),
    mongoose = require('mongoose');
var expect = require('chai').expect;
require('sinon-mongoose');

var config = require('../config/config');
var StateModel = require('../game/state/model');

describe('Database Tests', function() {
    //Before starting the test, create a sandboxed database connection
    //Once a connection is established invoke done()
    before(function (done) {
        mongoose.connect(config.test_db);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
            done();
        });
    });

    describe('addTwoNumbers()', function () {
        it('should add two numbers', function () {

            // 1. ARRANGE
            var x = 5;
            var y = 1;
            var sum1 = x + y;

            // 2. ACT
            var sum2 = x + y;

            // 3. ASSERT
            expect(sum2).to.be.equal(sum1);

        })
    });

    //After all tests are finished drop database and close connection
    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });
});
