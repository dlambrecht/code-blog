var blog = {};
blog.blogArticles = [];

// sort articles by latest first
blog.sortRawData = function() {
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

// create articles
blog.createArticles = function() {
  Article.truncateTable();
  for (var i = 0; i < blog.rawData.length; i++) {
    var art = new Article(blog.rawData[i]);
    blog.blogArticles.push(art);
    art.insertRecord();
    $('#blog').prepend(art.toHTML());
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  };
};

// read on functionality
blog.truncateArticles = function() {
  $('article p:not(:first-child)').hide();
  $('.read-on').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('p').fadeIn();
    $(this).hide();
  });
};

// author filter
blog.authorPopulate = function() {
  for(var i = 0; i < blog.blogArticles.length; i++) {
    var currentAuthor = blog.blogArticles[i].author;
    var $popAuthor = $('#author-filter').clone();
    $popAuthor.removeAttr('id').text(currentAuthor);
    $('#author').append($popAuthor);
  }
};

// category filter
blog.categoryPopulate = function() {
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
blog.handleFilter = function() {
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

blog.handleAdd = function() {
  $('#add-article-btn').on('click', function(e) {
    var article = blog.createArticles();
    article.insertRecord();
  });
};

blog.handleUpdate = function() {
  $('#update-article-btn').on('click', function() {
    var id = $(this).data('article-id');
    var article = blog.createArticles();
    article.id = id;
  });
};

blog.handleDelete = function() {
  $('#delete-article-btn').on('click', function() {
    var id = $(this).data('article-id');
    art.deleteRecord();
  });
};

// method to call other methods after the data is retrieved from the server
blog.onDataReady = function() {
  blog.sortRawData();
  blog.createArticles();
  blog.truncateArticles();
  blog.authorPopulate();
  blog.categoryPopulate();
  blog.handleFilter();
};

// ajax call to get the template from template file
function ajaxTemplate() {
  return $.ajax ( {
    url: '/template/article.html',
    method: 'GET'
  });
}

$.when(ajaxTemplate()).done(function(template, rawData) {
  Article.prototype.template = Handlebars.compile(template[0]);
  console.log(rawData);

  blog.rawData = rawData[0];
  blog.onDataReady();
});

webDB.init();
