var articleController = {};

articleController.index = function() {
  webDB.init();
  Article.loadAll(articleView.index);
};
