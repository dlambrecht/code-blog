function renderPreview(event) {
  event.preventDefault();
  var title = $('#article-title').val();
  var category = $('#article-category').val();
  var author = $('#article-author').val();
  var authorUrl = $('#article-author-url').val();
  var body = marked($('#article-body').val());

  var stored = {title: title, category: category, author: author, authorUrl: authorUrl, publishedOn: new Date(), body: body};
  var newArt = new Article(stored);
  $('#preview').html(newArt.toHTML());
  var storedArt = JSON.stringify(stored);
  $('#article-json').html(storedArt);
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};

$(document).ready(function() {
  $('#input-new-article').on('submit', renderPreview);
});
