var config = {
    db: process.env.MONGOLAB_URI || "mongodb://localhost/test",
    test_db: "mongodb://localhost/test"
};
module.exports = config;