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
    // var request = new XMLHttpRequest();
    // var imgURL;
    // request.open('GET', 'https://xkcd.com/info.0.json', true);
    // request.onload = function() {
    //     var data = JSON.parse(this.response)
    //     imgURL = data.img;
    // };
    // request.send();
    var xmlhttp = new XMLHttpRequest();
    var img_url;
    //var title;
    //var year;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            img_url = myObj.img;
            //title = myObj.title;
            //year = myObj.year;
        }
    };
    xmlhttp.open("GET", "https://xkcd.com/info.0.json", true);
    xmlhttp.send();
    //var url = "https://imgs.xkcd.com/comics/percent_milkfat.png";
    res.render("index", { img_url: img_url});
});

app.get('/random_comic', function(req, res) {
    res.render("random_comic");
});


http.createServer(app).listen(port, function() {

});