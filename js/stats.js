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

var getWords = function(str) {
  return str.replace(/[#,\n]/g,'').split(' ');
};

var getWordCount = function(article) {
  return getWords(article.markdown).length;
};

var totalWords = function() {
  var wordCounts = allArticles.map(getWordCount);
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
  var authorAvgWordCount = {};
  allArticles.forEach(function(article) {
    if(!authorAvgWordCount.hasOwnProperty(article.author)) {
      authorAvgWordCount[article.author] = {wordCount:0, articleCount:0};
    }
    authorAvgWordCount[article.author].articleCount++;
    authorAvgWordCount[article.author].wordCount += getWordCount(article);
  });
  
  $.each(authorAvgWordCount, function(authorName, stats) {
    $('#stats').append('<p>Average word count for ' + authorName + ': ' + Math.floor(stats.wordCount / stats.articleCount) + '</p>');
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
