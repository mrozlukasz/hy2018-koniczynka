var config = {
    db: process.env.MONGODB_URI || "mongodb://localhost/test",
    test_db: "mongodb://localhost/test"
};
module.exports = config;