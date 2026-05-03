exports.getHomePage = (req, res) => {

    let query = "SELECT * FROM products ORDER BY id ASC";

    db.execute(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }

        res.render('index.ejs', {
            title: 'Supermarket Admin | Dashboard',
            products: result
        });
    })


}