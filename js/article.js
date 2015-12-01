var Article = function(props) {
  this.author = props.author;
  this.title = props.title;
  this.body = props.body;
  this.publishedOn = props.publishedOn;
};

// add new data to the DOM
Article.prototype.toHTML = function() {
  return '<article>' +
  '<h1>' + this.title + '</h1>' +
  '<h2>' + this.author + '</h2>' +
  '<p>' + this.publishedOn + '</p>' +
  '<div>' + this.body + '</div>' +
  '</article>';
};





// need to use jQuery .clone()

// show most recent articles on top
// relative timestamps to show when an article was written
// name linked to site so readers can learn more about me
// site to look reasonable so that it can be read on any device


// Use good Object Oriented code: Create a blog object, and a constructor function for articles.
//Leave as little in the window (global) namespace as possible: attach functions to objects, etc.
//Create the markup for an example Article in the DOM, then use jQuery to clone that for each article.
//Your Article prototype should have a .toHtml() function that adds new data to the DOM.
//Add basic styles: a css reset, content in a single centered column, reasonable margins, etc.
