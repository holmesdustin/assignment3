var http = require('http');
var path = require('path');

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
    var request = require('request');
    request("https://xkcd.com/info.0.json", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var object = JSON.parse(body);
            res.render("index", { img_url: object.img, title: object.title, year: object.year });
        } else {
            res.render("index", { title: "Failed to get title", year: "Failed to get year" });
        }
    });
});

app.get('/random_comic', function(req, res) {
    var random_number = Math.floor(Math.random() * 2217);
    getComic(random_number, res);
    //res.render("random_comic", { img_url: img_url_var, title: title_var, year: year_var });
});

app.post('/get_random_comic', function(req,res){
    res.redirect('/random_comic');
});

//var img_url_var, title_var, year_var;

function getComic(random_number, res){
    var request = require('request');
    request("https://xkcd.com/" + random_number + "/info.0.json", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var object = JSON.parse(body);
            //img_url_var = object.img;
            //title_var = object.title;
            //year_var = object.year;
            res.render("random_comic", { img_url: object.img, title: object.title, year: object.year });
        } else {
            res.render("random_comic", { title: "Failed to get title", year: "Failed to get year" });
        }
    });
}

http.createServer(app).listen(port, function() {

});