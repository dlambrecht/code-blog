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
  for(var i = 0; i < blog.blogArticles.length; i++) {
    var currentAuthor = blog.blogArticles[i].author;
    var $popAuthor = $('#author-filter').clone();
    $popAuthor.removeAttr('id').text(currentAuthor);
    $('#author').append($popAuthor);
  }
};

// category filter
articleView.categoryPopulate = function() {
  for (var i = 0; i < blog.blogArticles.length; i++) {
    var currentCategory = blog.blogArticles[i].category;
    // $.each($.unique(blog.blogArticles.category), function(i, value) {
    var $popCategory = $('#category-filter').clone();
    $popCategory.removeAttr('id').text(currentCategory);
    $('#category').append($popCategory);
  // });
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

articleView.sortRawData = function() {
  blog.rawData.sort(function(a, b) {
    if (a.publishedOn > b.publishedOn) {
      return 1;
    }
    if (a.publishedOn < b.publishedOn) {
      return -1;
    }
    return 0;
  });
};


articleView.onDataReady = function() {
  articleView.sortRawData();
  articleView.truncateArticles();
  articleView.authorPopulate();
  articleView.categoryPopulate();
  articleView.handleFilter();
};
