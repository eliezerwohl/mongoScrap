var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var PORT = 3000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));


mongoose.connect('mongodb://localhost/abesimpson');
var db = mongoose.connection;
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var Schema = mongoose.Schema;

var Article = new Schema({
  article: String
});

var Title = mongoose.model('Title', Article);




app.use(express.static('public'));
var request = require('request');
var cheerio = require('cheerio');

app.get('/', function(req, res) {
  res.sendfile("index.html");
});

app.post("/submit", function(req, res) {
  var article = new Title(req.body)

  article.save(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });

})

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

app.listen(PORT, function() {
  console.log('App running on port '+ PORT);
});
