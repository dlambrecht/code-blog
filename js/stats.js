var authorArray = [];
var allWords = [];
var authorWords = [];


var getArticles = function(data) {
  allArticles = data;
};

var numArticles = function() {
  var articleNum = allArticles.length;
  $('#stats').append('<p>Number of Articles: ' + articleNum + '</p>');
};

var searchAuthors = function() {
  var getAuthor = function(article) {
    if($.inArray(article.author, authorArray) === -1) {
      authorArray.push(article.author);
    }
  };
  allArticles.map(getAuthor);
};

var getSum = function(previousSum, wordCount, i, data) {
  return previousSum + wordCount;
};

var numAuthors = function() {
  var authorNum = authorArray.length;
  $('#stats').append('<p>Number of Authors: ' + authorNum + '</p>');
};

var wordCount = function(str) {
  return str.replace(/[#,\n]/g,'');
};

var totalWords = function() {
  var words = function(article) {
    return wordCount(article.markdown).length;
  };
  var wordCounts = allArticles.map(words);
  var blogWordCount = wordCounts.reduce(getSum, 0);
  $('#stats').append('<p>Number of words in all Articles: ' + blogWordCount + '</p>');
};

var avgWordLength = function() {
  var getWordLength = function(word) {
    return word.length;
  };

  var getAvgLength = function(article) {
    var words = article.markdown.split(' ');
    var wordLengths = words.map(getWordLength);
    return wordLengths.reduce(getSum, 0) / words.length;
  };

  var avgWordLengths = allArticles.map(getAvgLength);
  var avg = Math.floor(avgWordLengths.reduce(getSum, 0) / allArticles.length);
  $('#stats').append('<p>Average word length in all Articles: ' + avg + '</p>');
};

var numAuthorWords = function() {
  authorArray.forEach(function(element, i, array) {
    var count = 0;
    var getWords = function(article) {
      if(article.author === element) {
        count += wordCount(article.markdown).length;
      }
    };
    allArticles.forEach(getWords);
    authorWords.push(count);
  });
  authorArray.forEach(function(element, i, array) {
    $('#stats').append('<p>Average word length per Author: ' + element + '</p>');
  });
};

$(function() {
  $.get('data/blogArticles.json', getArticles)
      .done(numArticles)
      .done(searchAuthors)
      .done(numAuthors)
      .done(totalWords)
      .done(avgWordLength)
      .done(numAuthorWords);
});
