// constructor
var Article = function(props) {
  this.title = props.title;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.category = props.category;
  this.body = props.body;
  this.publishedOn = props.publishedOn;
  this.calculateDaysOld();
};

// create HTML from template
Article.prototype.toHTML = function() {
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  var result = template(this);
  return result;
};

// date method
Article.prototype.calculateDaysOld = function() {
  var currentDate = new Date();
  var publishedDate = new Date(this.publishedOn);
  var diffDays = Math.floor((currentDate.getTime() - publishedDate.getTime())/1000/60/60/24);
  this.daysOld = diffDays;
};

// once you've used AJAX to request your template from the server, you can go ahead and compile it and store the resulting function on the Article prototype
// Article.prototype.template = Handlebars.compile(data);
// .template() function available to all instances of Article
