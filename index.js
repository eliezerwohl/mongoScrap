var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));
var request = require('request');
var cheerio = require('cheerio');



app.get('/', function(req, res) {
  res.send("herro there");
});

app.get("/huffscrape", function(req, res){
  request('http://www.huffingtonpost.com/', function (error, response, body) {
  var results = [];
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);

    $('h2').each(function(i, elem){
      results.push({
        title: $(this).children("a").text(),
        // link: "http://www.reddit.com" + $(this).children().attr("href")
      })
    });
  }
debugger
  console.log(results)
})


})

app.listen(3000, function() {
  console.log('App running on port 3000!');
});
