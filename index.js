const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./db");
const s3 = require("./s3");
const bcrypt = require("./bcrypt");
const csurf = require("csurf");

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

/// upload///////////////////////////
var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
///////////////////////////

app.use(cookieParser());
app.use(
    cookieSession({
        //name: session
        secret: `I'm always horny.`,
        maxAge: 1000 * 60 * 60 * 24 * 14 //cookies last two weeks
    })
);
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
app.use(bodyParser.json({}));

app.use(express.static("./wintergreen-socialnetwork"));

app.use(express.static("public"));

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// app.get('/', (req, res) => {
//     res.redirect('/welcome');
// });

app.post("/registration", (req, res) => {
    console.log("body: ", req.body);
    let first = req.body.first;
    let last = req.body.last;
    let email = req.body.email;
    let password = req.body.password;
    //null constraint is not enough, it accepts an empty string
    if (first == "" || last == "" || password == "" || email == "") {
        throw new Error("all fields required");
    } else {
        bcrypt.hashPassword(password).then(hashedPass => {
            db.submitUserInfo(first, last, email, hashedPass)
                .then(results => {
                    console.log("results in submitUserInfo: ", results);
                    // set cookies so that res.redirect in GET welcome works. user is logged in
                    req.session.userId = results.rows[0].id;
                    res.json({ success: true });
                })
                .catch(err => {
                    console.log("err in submitUserInfo: ", err);
                    res.json({ error: true });
                });
        });
    }
});

app.post("/login", (req, res) => {
    console.log("body in post/login: ", req.body);
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    db.logIn(userEmail)
        .then(results => {
            console.log("results in login: ", results);
            let psswdOnDb = results.rows[0].password;
            let userId = results.rows[0].id;

            bcrypt
                .checkPassword(userPassword, psswdOnDb)
                .then(itsAMatch => {
                    if (itsAMatch) {
                        req.session.userId = userId;

                        res.json({ success: true });
                    } else {
                        res.json({ error: true });
                    }
                })
                .catch(err => {
                    console.log("err in checkPassword: ", err);
                    res.json({ error: true });
                });
        })
        .catch(err => {
            console.log("err in login: ", err);
            res.json({ error: true });
        });
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

function requireLoggedInUser(req, res, next) {
    if (!req.session.userId) {
        res.sendStatus(403);
    } else {
        next();
    }
}
app.get("/user", requireLoggedInUser, (req, res) => {
    db.getUserById(req.session.userId).then(({ rows }) => {
        console.log("rows in getUserById: ", rows);
        // const user = rows.pop();
        // if (!user.image_url) {
        //     user.image_url = "default.jpg";
        // }
        res.json([req.session.userId, rows[0]]);
    });
});

app.post(
    "/upload-profilepic",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        console.log("req.file in upload: ", req.file);
        let file = req.file;
        if (file) {
            let imgUrl = `https://s3.amazonaws.com/spicedling/${file.filename}`;
            db.uploadImg(imgUrl, req.session.userId).then(results => {
                console.log("results in uploadImg: ", results);
                res.json(results.rows[0]);
            });
        } else {
            res.json({
                success: false
            });
        }
    }
);

app.get("/getbio", (req, res) => {
    db.getBioById(req.session.userId).then(results => {
        console.log("results in getBioById: ", results.rows[0]);
        res.json(results.rows[0]);
    });
});

app.post("/setbio", (req, res) => {
    console.log("body in setbio: ", req.body.biotext);
    db.setBio(req.body.biotext, req.session.userId).then(results => {
        console.log("results in setBio: ", results.rows[0]);
        res.json(results.rows[0]);
    });
});

app.get("/api-user/:id", async (req, res) => {
    if (req.params.id == req.session.userId) {
        res.json({ match: true });
    } else {
        const userStuff = await db.getUserById(req.params.id);
        console.log("userStuff: ", userStuff.rows[0]);
        res.json(userStuff.rows[0]);
    }
});

app.get("/get-initial-status/:id", async (req, res) => {
    let myId = req.session.userId;
    let otherId = req.params.id;
    console.log("get-inital-status running");
    const initialStatus = await db.getInitialStatus(myId, otherId);
    console.log("initialStatus: ", initialStatus);
    res.json(initialStatus.rows[0]);

    //db query to gwt initial status of friendship, res.json the status to the friendbutton component
});

app.post("/new-friendship-status", async (req, res) => {
    let otherId = req.body.otherId;
    let myId = req.session.userId;

    if (req.body.action == "add") {
        const sendReq = await db.sendFriendReq(otherId, myId);
        console.log("sendReq: ", sendReq);
        res.json(sendReq.rows[0]);
    } else if (req.body.action == "cancel") {
        const cancelReq = await db.cancelReq(myId, otherId);
        console.log("cancelReq: ", cancelReq);
        res.json({ success: true });
    } else if (req.body.action == "accept") {
        const acceptReq = await db.acceptReq(myId, otherId);
        res.json({ success: true });
    }
});

app.get("/friends-wannabes", async (req, res) => {
    let myId = req.session.userId;
    const friendsAndWannabes = await db.getFriendsAndWannabes(myId);
    console.log("friendsAndWannabes: ", friendsAndWannabes.rows);
    res.json(friendsAndWannabes.rows);
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
