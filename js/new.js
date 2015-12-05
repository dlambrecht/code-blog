function renderPreview(event) {
  event.preventDefault();
  var title = $('#article-title').val();
  var category = $('#article-category').val();
  var author = $('#article-author').val();
  var authorUrl = $('#article-author-url').val();
  var body = $('#article-body').val();
  $('#preview').append(marked(body));
  var stored = {title: title, category: category, author: author, authorUrl: authorUrl, publishedOn: new Date(), body: body};
  console.log(stored);
  var newArt = new Article(stored);
  $('#preview').append(newArt.toHTML());
  console.log(newArt);
  var storedArt = JSON.stringify(stored);
  $('#article-json').append(storedArt);
};

$(document).ready(function() {
  $('#input-new-article').submit(renderPreview);
});
