// constructor
var Article = function(props) {
  this.title = props.title;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.category = props.category;
  this.body = props.body;
  this.publishedOn = props.publishedOn;
  this.domHandle = null;
};

// add new data to the DOM
Article.prototype.toHTML = function() {
  var $article = $('.article').first().clone();
  $article.find('.title').text(this.title);
  $article.find('.author').attr('href', this.authorUrl).html(this.author); $article.find('.time').text(this.publishedOn);
  $article.find('.category').text('Category: ' + this.category);
  $article.find('.body').html(this.body);
  $('main').prepend($article);
  this.domHandle = $article;
};
