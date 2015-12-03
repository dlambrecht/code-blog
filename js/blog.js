var blog = {};
blog.blogArticles = [];

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

blog.createArticles = function() {
  for (var i = 0; i < blog.rawData.length; i++) {
    var art = new Article(blog.rawData[i]);
    blog.blogArticles.push(art);
    art.toHTML();
  };
};

blog.truncateArticles = function() {
  $('article p:not(:first-child)').hide();
  $('.read-on').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('p').fadeIn(); //.show()
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
    var $popCategory = $('#category-filter').clone();
    $popCategory.removeAttr('id').text(currentCategory);
    $('#category').append($popCategory);
  }
};

// method to handle filter
blog.handleFilter = function() {
  $('select[id="category"]').change(function() {
    $('#author').find('option:first').attr('selected', 'selected');
    $('main').find('article').hide();
    $('.category:contains(' + $(this).val() + ')').parent().show();
  });

  $('select[id="author"]').change(function() {
    $('#category').find('option:first').attr('selected', 'selected');
    $('main').find('article').hide();
    $('.article:contains(' + $(this).val() + ')').show();
    console.log('auhor');
  });
};

// method to create tab menu
blog.createTabMenu = function() {
  $('.tab-list').each(function() {
    var $this = $(this);
    var $tab = $this.find('li.active');
    var $link = $tab.find('a');
    var $panel = $($link.attr('href'));

    $this.on('click', '.tab-control', function(e) {
      e.preventDefault();
      var $link = $(this);
      var id = this.hash;

      if (id && !$link.is('.active')) {
        $panel.removeClass('active');
        $tab.removeClass('active');

        $panel = $(id).addClass('active');
        $tab = $link.parent().addClass('active');
      }
    });
  });
};


$(document).ready(function() {
  blog.sortRawData();
  blog.createArticles();
  blog.truncateArticles();
  blog.authorPopulate();
  blog.categoryPopulate();
  blog.createTabMenu();
  blog.handleFilter();
});
