let Category = require("../models/category");

exports.category_post = function (req, res) {
    let category = new Category({
        name: req.body.name
    });

    category.save(function (err, theCategory) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Category created successfully',
                category: theCategory
            });
        }
    })
};

exports.category_get = function (req, res) {
    Category.find({}, function (err, category) {
        if (err) return res.send(err.message);
        res.send(category);
    })
};

exports.category_delete = function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err.message);
        res.send('Deleted successfully!');
    })
};

exports.category_update = function (req, res) {
    Category.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, category) {
        if (err) return res.send(err.message);
        res.send(category);
    });
};