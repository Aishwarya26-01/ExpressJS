const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProduct = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};

exports.getContact = (req, res, next) => {
    res.render('contactus', {
        pageTitle: 'Contact Us',
        path: '/contactus',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postContact = (req, res, next) => {
    console.log(req.body);
    res.redirect('/success');
};

exports.getSuccess = (req, res, next) => {
    res.render('success', {
        pageTitle: 'Success',
        path: '/success',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};