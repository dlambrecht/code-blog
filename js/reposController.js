var reposController = {};

reposController.index = function() {
  repos.requestAll(aboutView.index);
};
