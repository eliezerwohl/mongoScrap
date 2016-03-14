
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
  article: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref:'Note'
  }]
});

var Title = mongoose.model('Title', Article);
app.use(express.static('public'));
var request = require('request');
var cheerio = require('cheerio');

app.get('/', function(req, res) {
  res.sendfile("index.html");
});


app.get('/all', function(req, res) {
   Title.find({}, function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});



app.post("/submit", function(req, res) {
  var article = new Title({
    article: req.body.article
  })

  article.save(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });

})



app.get("/huffscrape", function(req, res) {
  request('http://www.huffingtonpost.com/', function(error, response, body) {
    var results = [];
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);

      $('h2').each(function(i, elem) {
        var theTitle = $(this).children("a").text();
        console.log(theTitle)
        var Article = new Title({
          article: theTitle
        });
        Article.save(function(err, doc) {
          if (err) {
            console.log(err)
          } else {
            console.log("saved");

          }
        });
        results.push({
          title: $(this).children("a").text(),
          // link: "http://www.reddit.com" + $(this).children().attr("href")
        })
      });
    }

  })
  res.send("complete")
})

app.listen(PORT, function() {
  console.log('App running on port ' + PORT);
});