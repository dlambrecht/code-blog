var aboutView = {};

aboutView.index = function() {
  aboutView.ui();

  var _append = function(repo) {
    $('#aboutContent').append(aboutView.render(repo));
  };
  repos.all.forEach(_append);
};

aboutView.render = function(repo) {
  return $('<a>').text(repo.name);
};

aboutView.ui = function() {
  $('#aboutContent').show();
  $('#articles').hide();

  // var $about = $('#aboutContent');
  // var $ul = $about.find('ul');
  //
  // $ul.empty();
  // $about.fadeIn().siblings().hide();
};
