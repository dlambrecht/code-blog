
$(function() {

  function pluck(property, collection) {
    return collection.map(function(e){
      return e[property];
    });
  }

  function unique(collection) {
    var length = collection ? collection.length : 0;

    if (!length) return [];

    var seen = [];
    collection.forEach(function(e) {
      if ( seen.indexOf(e) < 0 ) seen.push(e);
    });
    return seen;
  }

  // compose two functions together
  function compose(func1, func2) {
    return function() {
      return func1(func2.apply(null, arguments));
    };
  }

  var distinct = compose(unique, pluck);

  // TODO do something useful with reduce and filter


  // jquery render functions (IO)
  var $headline = $('<h1>Stats</h1>');

  // function $wordCount(articles) {
  //   var wordCount = distinct('body', articles).length;
  //   wordCount.replace(/[^\w\s]/g, '').split(/\s+/).reduce(function(map, wordCount){
  //     map[wordCount] = (map[wordCount]||0)+1;
  //     return map;
  //     return $('<p>Number of words: ' + wordCount + '</p>');
  //   }, Object.create(null));
  // }

  function $numberOfArticles(articles) {
    return $('<p>Number of articles: ' + articles.length + '</p>');
  }

  function $numberOfAuthors(articles) {
    var numAuthors = distinct('author', articles).length;
    return $('<p>Number of authors: ' + numAuthors + '</p>');
  }

  var $statsComponent = function(blog) {
    var component = $('<div>');
    component.append([
      $headline,
      $numberOfArticles(blog),
      $numberOfAuthors(blog),
      // $wordCount(blog)
    ]);
    return component;
  };

  function renderStats(blog) {
    $('#stats').replaceWith($statsComponent(blog));
  }

  function renderError(message, xhr) {
    $('#stats').replaceWith($('<p>Error: <code>' + message + xhr + '</code></p>'));
  }

  // imperative shell

  function stats(data, message, xhr) {
    if (xhr.status != 200) {
      renderError(message, xhr);
    } else {
      renderStats(data);
    }
  }

  $.getJSON('data/blogArticles.json', stats);

});
