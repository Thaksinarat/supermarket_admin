exports.getHomePage = (req, res) => {
    res.render('index.ejs', {
        title: 'Supermarket Admin | Dashboard'
    });
}