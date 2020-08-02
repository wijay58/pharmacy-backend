let Supplier = require("../models/supplier");

exports.supplier_post = function (req, res) {
    let supplier = new Supplier({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        amount_to_be_paid: req.body.amount_to_be_paid,
    });

    supplier.save(function (err, theSupplier) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Supplier created successfully',
                supplier: theSupplier
            });
        }
    })
};

exports.supplier_get = function (req, res) {
    Supplier.find({}, function (err, supplier) {
        if (err) return res.send(err.message);
        res.send(supplier);
    })
};

exports.supplier_delete = function (req, res) {
    Supplier.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err.message);
        res.send('Deleted successfully!');
    })
};

exports.supplier_update = function (req, res) {
    Supplier.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, supplier) {
        if (err) return res.send(err.message);
        res.send(supplier);
    });
};