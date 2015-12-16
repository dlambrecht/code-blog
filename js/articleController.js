var articleController = {};

articleController.index = function() {

  Article.loadAll(articleView.index);
};
