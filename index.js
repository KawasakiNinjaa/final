const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./db");
const bcrypt = require("./bcrypt");

app.use(cookieParser());
app.use(
    cookieSession({
        //name: session
        secret: `I'm always horny.`,
        maxAge: 1000 * 60 * 60 * 24 * 14 //cookies last two weeks
    })
);
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
                    res.json(results);
                })
                .catch(err => {
                    console.log("err in submitUserInfo: ", err);
                    res.json({ error: true });
                });
        });
    }
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
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
