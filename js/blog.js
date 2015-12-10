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

// home tab
blog.homeTab = function() {
  $('#home').on('click', function(event) {
    event.preventDefault();
    $('#articles').addClass('active');
    $('#aboutContent').removeClass('active');
  });
};

// about tab
blog.aboutTab = function() {
  $('#about').on('click', function(event) {
    event.preventDefault();
    $('#aboutContent').addClass('active');
    $('#articles').removeClass('active');
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

// method to call other methods after the data is retrieved from the server
blog.onDataReady = function() {
  blog.sortRawData();
  blog.createArticles();
  blog.truncateArticles();
  blog.authorPopulate();
  blog.categoryPopulate();
  blog.handleFilter();
  blog.homeTab();
  blog.aboutTab();
};

// ajax call to retrieve article data from server
function ajaxArticles() {
  return $.ajax ( {
    url: 'data/blogArticles.json',
    method: 'GET',
    ifModified: false
  });
}

// ajax call to get the template from template file
function ajaxTemplate() {
  return $.ajax ( {
    url: '/template/article.html',
    method: 'GET'
  });
}

$.when(ajaxTemplate(), ajaxArticles()).done(function(template, rawData) {
  Article.prototype.template = Handlebars.compile(template[0]);
  console.log(rawData);

  blog.rawData = rawData[0];
  blog.onDataReady();
});
