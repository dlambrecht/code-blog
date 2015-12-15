page('/', articleController.index);

page('/about', function() {
  $('#aboutContent').show();
  $('#articles').hide();
});

page.start();
