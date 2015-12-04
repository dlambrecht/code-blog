// constructor
var Article = function(props) {
  this.title = props.title;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.category = props.category;
  this.body = props.body;
  this.publishedOn = props.publishedOn;
};

// add new data to the DOM
Article.prototype.toHTML = function() {
  this.calculateDaysOld();
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  var result = template(this);
  $('#blog').prepend(result);
};

// date method
Article.prototype.calculateDaysOld = function() {
  var currentDate = new Date();
  var publishedDate = new Date(this.publishedOn);
  var diffDays = Math.floor((currentDate.getTime() - publishedDate.getTime())/1000/60/60/24);
  this.daysOld = diffDays;
};
