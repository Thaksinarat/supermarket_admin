exports.addProductPage = (req, res) => {
    res.render('add-product.ejs', {
        title: 'Supermarket Admin | Add New Product',
        message: '',
        messageName: '',
        messageFile: '',
    })
}

exports.addProduct = (req, res) => {
    let message = '';
    let messageName = '';
    let messageFile = '';
    let name = req.body.name;
    let category = req.body.category;
    let price = req.body.price;
    let stock = req.body.stock;
    let uploadedFile = req.file;

    if (!name) {
        messageName = 'Please enter product name!';
        return res.render('add-product.ejs', {
            title: 'Supermarket Admin | Add New Product',
            message,
            messageName: messageName,
            messageFile
        });
    }

    // จะใช้เป็นตัวตรวจเพื่อป้องกันไม่ให้ของซ้ำกัน * ถ้าไม่ work ก็ไม่ต้องตรวจ TT
    let nameQuery = 'SELECT * FROM products WHERE name = ?';

    db.execute(nameQuery, [name], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            messageName = 'Product already exists.';
            return res.render('add-product.ejs', {
                title: 'Supermarket Admin | Add New Product',
                message,
                messageName: messageName,
                messageFile
            });
        } else {
            if (!uploadedFile) {
                messageFile = 'Please select file to upload!'
                return res.render('add-product.ejs', {
                    title: 'Supermarket Admin | Add New Product',
                    message,
                    messageName,
                    messageFile: messageFile
                });
            }
            // เช็คนามสกุลไฟล์
            let fileType = uploadedFile.filename.split('.')[1].toLowerCase();

            if (fileType == 'png' || fileType == 'jpeg' || fileType == 'jpg' || fileType == 'gif') {
                
                let query = 'INSERT INTO products(name, category, price, stock, image) VALUES(?, ?, ?, ?, ?)';
                db.execute(query, [name, category, price, stock, uploadedFile.filename], (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            } else {
                messageFile = 'Only .png, .jpeg, .jpg, .gif are allowed!'
                return res.render('add-product.ejs', {
                    title: 'Supermarket Admin | Add New Product',
                    message,
                    messageName,
                    messageFile: messageFile
                });
            }


        }
    })
}