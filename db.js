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
    let q = "SELECT id, first, last, img_url, bio FROM users WHERE id= $1";
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

exports.getInitialStatus = function getInitialStatus(myId, otherId) {
    let q = `SELECT * FROM friendships
     WHERE (receiver=$1 AND sender=$2)
     OR (receiver=$2 AND sender=$1)`;
    let params = [myId, otherId];

    return db.query(q, params);
};

exports.sendFriendReq = function sendFriendReq(otherId, myId) {
    let q = `INSERT INTO friendships (receiver, sender) VALUES($1, $2) RETURNING *`;
    let params = [otherId, myId];

    return db.query(q, params);
};

exports.cancelReq = function cancelReq(myId, otherId) {
    let q = `DELETE FROM friendships WHERE (receiver=$2 AND sender=$1) OR (receiver=$1 AND sender=$2)`;
    let params = [myId, otherId];

    return db.query(q, params);
};

exports.acceptReq = function acceptReq(myId, otherId) {
    let q = `UPDATE friendships SET accepted= true WHERE (receiver=$2 AND sender=$1) OR (receiver=$1 AND sender=$2)`;
    let params = [myId, otherId];

    return db.query(q, params);
};
