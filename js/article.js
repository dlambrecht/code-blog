// constructor
var Article = function(props) {
  this.title = props.title;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.category = props.category;
  this.body = props.body;
  this.markedBody = marked(this.body);
  this.publishedOn = props.publishedOn;
  this.calculateDaysOld();
};

// create HTML from template
Article.prototype.toHTML = function() {
  return this.template(this);
};

// date method
Article.prototype.calculateDaysOld = function() {
  var currentDate = new Date();
  var publishedDate = new Date(this.publishedOn);
  var diffDays = Math.floor((currentDate.getTime() - publishedDate.getTime())/1000/60/60/24);
  this.daysOld = diffDays;
};

// AJAX call to get template
$.ajax ( {
  url: '/template/article.html',
  method: 'GET',
  async: false
})
.done(function(res) {
  Article.prototype.template = Handlebars.compile(res);
})
.fail(function(err) {
  console.log(err);
})
