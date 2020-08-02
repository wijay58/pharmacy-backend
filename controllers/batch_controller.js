let Batch = require("../models/batch");

exports.batch_post = function (req, res) {
    let batch = new Batch({
        name: req.body.name,
        bill_number: req.body.bill_number,
        supplier: req.body.supplier,
        expiry_date: req.body.expiry_date,
        bought_price: req.body.bought_price,
        selling_price: req.body.selling_price,
        remaining_quantity: req.body.remaining_quantity,
    });

    batch.save(function (err, theBatch) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Batch created successfully',
                batch: theBatch
            });
        }
    })
};
