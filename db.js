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

exports.logIn = function logIn(email) {
    let q = "SELECT id, email, password FROM users WHERE email= $1";
    let params = [email];

    return db.query(q, params);
};

exports.getUserById = function getUserById(id) {
    let q = "SELECT id, first, last, img_url FROM users WHERE id= $1";
    let params = [id];

    return db.query(q, params);
};

exports.uploadImg = function uploadImg(imgUrl) {
    let q = "";
    let params = [imgUrl];

    return db.query(q, params);
};
