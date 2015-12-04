// constructor
var Article = function(props) {
  this.title = props.title;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.category = props.category;
  this.body = props.body;
  this.publishedOn = props.publishedOn;
};

// date method

// add new data to the DOM
Article.prototype.toHTML = function() {
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  var result = template(this);
  $('#blog').prepend(result);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
};
