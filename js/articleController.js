var articleController = {};

articleController.index = function(ctx, next) {
  Article.loadAll(articleView.index);
};

articleController.category = function(ctx, next) {
  Article.loadAll(function() {
    var categoryData = function(data) {
      ctx.articles = data;
      next();
    };
    Article.findByCategory(ctx.params.category, categoryData);
  });
};

articleController.author = function(ctx, next) {
  Article.loadAll(function() {
    var authorData = function(data) {
      ctx.articles = data;
      next();
    };
    Article.findByAuthor(ctx.params.author, authorData);
  });
};

articleController.show = function(ctx, next) {
  articleView.show(ctx.articles);
};
