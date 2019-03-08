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

exports.uploadImg = function uploadImg(imgUrl, id) {
    let q = "UPDATE users SET img_url= $1 WHERE id=$2 RETURNING img_url";
    let params = [imgUrl, id];

    return db.query(q, params);
};

exports.setBio = function setBio(bioText, userId) {
    let q = "UPDATE users SET bio= $1 WHERE id= $2 RETURNING bio";
    let params = [bioText, userId];

    return db.query(q, params);
};

exports.getBioById = function getBioById(userId) {
    let q = "SELECT bio FROM users WHERE id=$1";
    let params = [userId];

    return db.query(q, params);
};
