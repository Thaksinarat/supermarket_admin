exports.addProductPage = (req, res) => {
    res.render('add-product.ejs', {
        title: 'Supermarket Admin | Add New Product',
        message: ''
    })
}

exports.addProduct = (req, res) => {
    // ถ้าไม่ work ให้เปลี่ยนไปใช้ req.file แทน
    let name = req.body.name;

    if (!name) {
        return res.status(400).send('No name was applied.');
    }
    //

    let message = '';
    let category = req.body.category;
    let price = req.body.price;
    let stock = req.body.stock;
    let uploadedFile = req.file;
    let imageName = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    imageName = name + '.' + fileExtension;


    // จะใช้เป็นตัวตรวจเพื่อป้องกันไม่ให้ของซ้ำกัน * ถ้าไม่ work ก็ไม่ต้องตรวจ TT
    let nameQuery = 'SELECT * FROM products WHERE name = ?';

    db.execute(nameQuery, [name], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Product already exists.';
            res.render('add-product.ejs', {
                message,
                title: 'Supermarket Admin | Add New Product'
            });
        } else {
            if (!uploadedFile) {
                return res.status(400).send('Please upload file.');
                res.render('add-product.ejs', {
                    message,
                    title: 'Supermarket Admin | Add New Product'
                });
            }

            let query = 'INSERT INTO products(name, category, price, stock, image) VALUES(?, ?, ?, ?, ?)';
            db.execute(query, [name, category, price, stock, imageName], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        }
    })
}