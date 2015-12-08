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
  for (var i = 0; i < blog.rawData.length; i++) {
    var art = new Article(blog.rawData[i]);
    blog.blogArticles.push(art);
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
//method to handle filter
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

blog.loadData = function() {
  // TODO: check eTag and only call getJSON if eTag is different
  if(true) {
    // eTag is different, get new data from server
    $.getJSON('/data/blogArticles.json', function(rawData) {
      blog.rawData = rawData;
      localStorage.setItem('blogArticles', JSON.stringify(rawData));
      blog.onDataReady();
    })
    .fail(function() {
      blog.rawData = [];
    });
  } else {
    // eTag is the same, retrieve data from local storage
    blog.rawData = JSON.parse(localStorage.getItem('blogArticles'));
    blog.onDataReady();
  }
};

$(document).ready(function() {
  blog.loadData();
});
