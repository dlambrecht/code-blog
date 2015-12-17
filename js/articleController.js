var articleController = {};

articleController.index = function() {
  Article.loadAll(articleView.index);
};

articleController.category = function(ctx, next) {
  var categoryData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findByCategory(ctx.params.category, categoryData);
};

articleController.author = function(ctx, next) {
  console.log('author filter');
  var authorData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findByAuthor(ctx.params.author, authorData);
};

articleController.show = function(ctx, next) {
  articleView.show(ctx.articles);
};
