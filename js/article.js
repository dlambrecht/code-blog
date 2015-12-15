// constructor
var Article = function(props) {
  this.id = props.id;
  this.title = props.title;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.category = props.category;
  this.markdown = props.markdown;
  // this.body = props.body;
  this.markedBody = marked(this.markdown);
  this.publishedOn = props.publishedOn;
  this.calculateDaysOld();
};

// create HTML from template
Article.prototype.toHTML = function() {
  return this.template(this);
};

// date method
Article.prototype.calculateDaysOld = function() {
  var currentDate = new Date();
  var publishedDate = new Date(this.publishedOn);
  var diffDays = Math.floor((currentDate.getTime() - publishedDate.getTime())/1000/60/60/24);
  this.daysOld = diffDays;
};

Article.prototype.insertRecord = function(callback) {
  // insert article record into database
  webDB.execute(
    'INSERT INTO articles \
     (title, category, author, authorUrl, publishedOn, markdown) \
     VALUES ("' + this.title + '", "' + this.category + '", "' + this.author + '", "' + this.authorUrl + '", "' + this.publishedOn + '", "' + this.markdown + '") \
     ;',
    callback
  );
};

Article.prototype.updateRecord = function(callback) {
  // update article record in database
  webDB.execute(
      'UPDATE articles SET \
       title="' + this.title + '", \
       category="' + this.category + '", \
       author="' + this.author + '", \
       authorUrl="' + this.authorUrl + '", \
       markdown="' + this.markdown + '", \
       WHERE id= ' + this.id + ' \
       ;'
      ,
      callback
  );
};

Article.prototype.deleteRecord = function(callback) {
  // delete article record in database
  webDB.execute(
    'DELETE FROM articles \
     WHERE id= ' + this.id + ' \
     ;'
    ,
    callback
  );
};

Article.all = [];

Article.requestAll = function(next, callback) {
  $.getJSON('/data/blogArticles.json', function(articles) {
    articles.forEach(function(articleData) {
      var article = new Article(articleData);
      article.insertRecord();
      Article.all.push(article);
    });
    next(callback);
  });
};

Article.loadAll = function(callback) {
  var callback = callback || function() {};

  if (Article.all.length === 0) {
    webDB.execute('SELECT * FROM articles ORDER BY publishedOn;', function(rows) {
      if (rows.length === 0) {
        Article.requestAll(Article.loadAll, callback);
      } else {
        rows.forEach(function(row) {
          Article.all.push(new Article(row));
        });
        callback();
      }
    }
   );
  } else {
    callback();
  }
};

Article.find = function(id, callback) {
  webDB.execute(
    [
      {
        'sql': 'SELECT * FROM articles WHERE id = ?',
        'data': [id]
      }
    ],
    callback
  );
};

Article.truncateTable = function(callback) {
  // delete all records from given truncateTable
  webDB.execute(
    'DELETE FROM articles; '
    ,
    callback
  );
};
