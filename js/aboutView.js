var aboutView = {};

aboutView.index = function() {
  $('#aboutContent').empty();
  $('#articles').hide();
  $('#aboutContent').show();

  var _append = function(repo) {
    $('#aboutContent').append(aboutView.render(repo));
  };
  repos.all.forEach(_append);
};

aboutView.render = function(repo) {
  return $('<li>').text(repo.name);
};

aboutView.ui = function() {

};
