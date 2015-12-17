page('/', articleController.index);

page('/category/:category', articleController.category, articleController.show);

page('/author/:author', articleController.author, articleController.show);

page('/about', reposController.index);

page.start();
