var repos = {};

repos.all = [];

repos.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github/users/dlambrecht/repos?sort=updated',
    

  }).done(function(data) {
    repos.all = data;
  }).done(callback);

};
