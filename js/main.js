var Blog = function(rawData) {
  this.blogArticles = [];
  // loop through blog.rawData to create new instances of Article
  for (var i = 0; i < rawData.length; i++) {
    // console.log(blog.rawData);
    this.blogArticles.push(new Article(rawData[i]));

  };
};
Blog.prototype.populate = function() {
  var blogs = $('.blog');
  for (var i = 0; i < this.blogArticles.length; i++) {
    blogs.append(this.blogArticles[i].toHTML());
  }
};

var blog = new Blog(blogRawData);
blog.populate();
