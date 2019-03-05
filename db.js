const spicedPg = require("spiced-pg");

const dbUrl =
    process.env.DATABASE_URL ||
    `postgres:postgres:postgres@localhost:5432/wintergreen-socialnetwork`;

const db = spicedPg(dbUrl);

exports.submitUserInfo = function submitUserInfo(first, last, email, password) {
    let q =
        "INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
    let params = [first, last, email, password];

    return db.query(q, params);
};
