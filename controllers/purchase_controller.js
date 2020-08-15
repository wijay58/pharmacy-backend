let Purchase = require("../models/purchase");
let Supplier = require("../models/supplier");

exports.purchase_post = async function (req, res) {
    let supplierId;
    await Supplier.findOne({
        name: req.body.supplier
    }, function (err, supplier) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            supplierId = supplier._doc._id
        }
    });
    let purchase = new Purchase({
        description: req.body.description,
        date: req.body.date,
        supplier: supplierId,
        bill_number: req.body.bill_number,
        total: req.body.total,
        paid_amount: req.body.paid_amount,
        is_due: req.body.is_paid,
    });

    purchase.save(function (err, thePurchase) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Purchase created successfully',
                purchase: thePurchase
            });
        }
    })
};

exports.purchase_get = function (req, res) {
    Purchase.find({}, function (err, purchase) {
        if (err) return res.send(err.message);
        res.send(purchase);
    })
};

exports.purchase_delete = function (req, res) {
    Purchase.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err.message);
        res.send('Deleted successfully!');
    })
};

exports.purchase_update = function (req, res) {
    Purchase.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, purchase) {
        if (err) return res.send(err.message);
        res.send(purchase);
    });
};