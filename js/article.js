// constructor
var Article = function(props) {
  this.title = props.title;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.category = props.category;
  this.markdown = props.markdown;
  // this.body = props.body;
  this.markedBody = marked(this.markdown);
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
