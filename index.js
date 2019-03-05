const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
    cookieSession({
    //name: session
        secret: `I'm always horny.`,
        maxAge: 1000 * 60 * 60 * 24 * 14 //cookies last two weeks
    })
);
app.use(
    bodyParser.json({})
);

app.use(express.static("./wintergreen-socialnetwork"));

app.use(express.static("public"));

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// app.get('/', (req, res) => {
//     res.redirect('/welcome');
// });


// app.post('/registration', (req, res) =>{
//
//
// });

app.get('/welcome', (req,res)=>{
    if(req.session.userId){
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('*', function(req, res) {
    if(!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }

});



app.listen(8080, function() {
    console.log("I'm listening.");
});
