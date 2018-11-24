var config = {
    db: process.env.MONGODB_URI || "mongodb://localhost:27017/test",
    test_db: "mongodb://localhost:27017/test"
};
module.exports = config;