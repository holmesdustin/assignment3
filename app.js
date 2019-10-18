var http = require('http');
var path = require('path');
var request = require('request');
const express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ encoded: true }));

var task = ["clean", "cook"];
var complete = ["eat", "sleep"];

app.get('/', function(req, res) {
    var url = "https://xkcd.com/info.0.json";
    var img_url;
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var object = JSON.parse(body);
            img_url = object.img;
        }
    });

    //var title;
    //var year;

    var url = "https://imgs.xkcd.com/comics/percent_milkfat.png";
    res.render("index", { img_url: url});
});

app.get('/random_comic', function(req, res) {
    res.render("random_comic");
});


http.createServer(app).listen(port, function() {

});