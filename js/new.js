// blog.createNewArticles = function() {
//   var newArt = new Article();
//   blog.blogArticles.push(art);
//   art.toHTML();
// };

var newArt = {};
newArt.articles = [];

function renderPreview(event) {
  event.preventDefault();
  var $title = $('#article-title').val();
  var $category = $('#article-category').val();
  var $body = $('#article-body').val();
  var $author = $('#article-author').val();
  var $authorUrl = $('#article-author-url').val();
  $('#preview').append($title);
  $('#preview').append($category);
  $('#preview').append($body);
  $('#preview').append($author);
  $('#preview').append($authorUrl);
  var stored = {title: $title, category: $category, body: $body, author: $author, authorUrl: $authorUrl};
  console.log(stored);
  var storedArt = JSON.stringify(stored);
  $('#article-json').append(storedArt);
};

$(document).ready(function() {
  $('#input-new-article').submit(renderPreview);
});
