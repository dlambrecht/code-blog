var articleView = {};

articleView.index = function() {
  var renderAll = function() {
    $articles = $('#blog');
    $articles.show().siblings().hide();
    Article.all.forEach(function(article) {
      $articles.append(articleView.render(article));
    });
  };

  if (articleView.template) {
    renderAll();
  } else {
    $.get('/template/article.html', function(data, msg, xhr) {
      articleView.template = Handlebars.compile(data);
      renderAll();
    });
  }
};

articleView.render = function(article) {
  return articleView.template(article);
};
