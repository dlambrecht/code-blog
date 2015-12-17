var articleView = {};

articleView.loadTemplate = function(articles) {
  $.get('/template/article.html', function(data, msg, xhr) {
    articleView.template = Handlebars.compile(data);
    articleView.renderGroup(articles);
  });
};

articleView.renderGroup = function(articleList) {
  $('#blog')
    .fadeIn()
    .append(
      articleList.map(function(a) {
        return articleView.render(a);
      })
    )
    .siblings().hide();
};

articleView.index = function() {
  articleView.loadTemplate(Article.all);
  articleView.sortRawData();
  articleView.truncateArticles();
  articleView.authorPopulate();
  articleView.categoryPopulate();
  articleView.handleFilter();

};

articleView.render = function(article) {
  $('#articles').show();
  $('#aboutContent').hide();
  return articleView.template(article);
};

articleView.show = function(articles) {
  articleView.loadTemplate(articles);
};


articleView.sortRawData = function() {
  Article.all.sort(function(a, b) {
    if (a.publishedOn > b.publishedOn) {
      return 1;
    }
    if (a.publishedOn < b.publishedOn) {
      return -1;
    }
    return 0;
  });
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
  for(var i = 0; i < Article.all.length; i++) {
    var currentAuthor = Article.all[i].author;
    var $popAuthor = $('#author-filter').clone();
    $popAuthor.removeAttr('id').text(currentAuthor);
    $('#author').append($popAuthor);
  }
};

// category filter
articleView.categoryPopulate = function() {
  for (var i = 0; i < Article.all.length; i++) {
    var currentCategory = Article.all[i].category;
    var $popCategory = $('#category-filter').clone();
    $popCategory.removeAttr('id').text(currentCategory);
    $('#category').append($popCategory);
  }
};

// method to handle filter
articleView.handleFilter = function() {
  $('select[id="category"]').change(function() {
    $('#author').find('option:first').attr('selected', 'selected');
    $('#blog').find('article').hide();
    $('.category:contains(' + $(this).val() + ')').parent().show();
  });

  $('select[id="author"]').change(function() {
    $('#category').find('option:first').attr('selected', 'selected');
    $('#blog').find('article').hide();
    $('.article:contains(' + $(this).val() + ')').show();
  });
};
