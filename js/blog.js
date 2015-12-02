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


// date methods
// author filter
blog.authorPopulate = function() {
  for(var i = 0; i < blog.blogArticles.length; i++) {
    var currentAuthor = blog.blogArticles[i].author;
    var $popAuthor = $('#author-filter').clone();
    $popAuthor.removeAttr('id').text(currentAuthor);
    $('#author').append($popAuthor);

    //variable to store all the authors in the array
    // variable to populate by html id
    //clone based on the string
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
  // variable to store all the categories in the array
  // variable to populate by html id
  // clone based on the string
};

blog.handleOnChange = function() {

};

$(document).ready(function() {
  blog.sortRawData();
  blog.createArticles();
  blog.truncateArticles();
  blog.authorPopulate();
  blog.categoryPopulate();
  $('author').on('change', blog.handleOnChange);

});
