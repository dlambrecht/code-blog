var articleView = {};

articleView.loadTemplate = function(articles) {
  $.get('/template/article.html', function(data, msg, xhr) {
    articleView.template = Handlebars.compile(data);
    articleView.authorPopulate();
    articleView.categoryPopulate();
    articleView.handleFilter();
    articleView.renderGroup(articles);
    articleView.truncateArticles();
  });
};

articleView.renderGroup = function(articleList) {
  $('#blog')
    .hide()
    .fadeIn(3000)
    .empty()
    .append(
      articleList.map(function(a) {
        return articleView.render(a);
      })
    )

    .siblings().hide();
};

articleView.index = function() {
  articleView.loadTemplate(Article.all);
};

articleView.render = function(article) {
  $('#articles').show();
  $('#aboutContent').hide();
  return articleView.template(article);
};

articleView.show = function(articles) {
  articleView.loadTemplate(articles);
};


// read on functionality
articleView.truncateArticles = function() {
  $('article p:not(:first-child)').hide();
  $('.read-on').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('p').fadeIn();
    $(this).hide();
  });
};

// author filter
articleView.authorPopulate = function() {
  _.uniq(Article.all, function(article) {
    return article.author;
  }).map(function(article) {
    var $popAuthor = $('#author-filter').clone();
    $popAuthor.removeAttr('id').text(article.author);
    $('#author').append($popAuthor);
  });
};

// category filter
articleView.categoryPopulate = function() {
  _.uniq(Article.all, function(article) {
    return article.category;
  }).map(function(article) {
    var $popCategory = $('#category-filter').clone();
    $popCategory.removeAttr('id').text(article.category);
    $('#category').append($popCategory);
  });
};

articleView.handleFilter = function() {
  $('#category').on('change', function() {
    page('/category/' + $(this).val());
    // e.preventDefault();

  });

  $('select[id="author"]').change(function() {
    page('/author/' + $(this).val());
  });
};
