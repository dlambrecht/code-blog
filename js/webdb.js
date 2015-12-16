var webDB = {};
webDB.sqlResult = null;

webDB.verbose = function (verbose) {
  var msg;
  if (verbose) {
    html5sql.logInfo = true;
    html5sql.logErrors = true;
    html5sql.putSelectResultsInArray = true;
    msg = 'html5sql verbosity on';
  } else {
    html5sql.logInfo = false;
    html5sql.logErrors = false;
    html5sql.putSelectResultsInArray = false;
    msg = 'html5sql verbosity off';
  }
  console.log(msg);
};

webDB.init = function() {
  // Open and init DB
  try {
    if (openDatabase) {
      webDB.verbose(true);
      webDB.connect('blogDB', 'Blog Database', 5*1024*1024);
    } else {
      console.log('Web Databases not supported.');
    }
  } catch (e) {
    console.error('Error occured during DB init. Web Database may not be supported.');
  }
};

webDB.connect = function (database, title, size) {
  html5sql.openDatabase(database, title, size);
};

webDB.setupTables = function () {
  html5sql.process(
    'CREATE TABLE articles \
     ( \
       id int PRIMARY KEY, \
       title text, \
       category text, \
       author text, \
       authorUrl text, \
       publishedOn text, \
       markdown text \
     );',
    function() {
      // on success
      console.log('Success setting up tables.');
    }
  );
};

webDB.execute = function (sql, callback) {
  callback = callback || function() {};
  html5sql.process(
    sql,
    function (tx, result, resultArray) {
      callback(resultArray);
    }
  );
};
webDB.init();
