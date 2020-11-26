let Supplier = require("../models/supplier");
const {
    body,
    validationResult
} = require("express-validator");

exports.validate = () => {
    return [
        body('name', 'Supplier name is required').not().isEmpty(),
        body('phone', 'Phone number is required').not().isEmpty(),
        body('email', 'Email is required and should be valid').not().isEmpty().normalizeEmail().isEmail(),
        body('amount_to_be_paid', 'Amount is required').not().isEmpty().isFloat()
    ]
}

exports.supplier_post = function (req, res) {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
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
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
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
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        Supplier.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, function (err, supplier) {
            if (err) return res.send(err.message);
            res.send(supplier);
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};