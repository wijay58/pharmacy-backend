let Batch = require("../models/batch");
let Purchase = require("../models/purchase");

exports.batch_post = async function (req, res) {
    let purchaseId;
    await Purchase.findOne({
        bill_number: req.body.bill_number
    }, function (err, purchase) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            purchaseId = purchase._doc._id
        }
    });
    let batch = new Batch({
        name: req.body.name,
        purchase: purchaseId,
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

exports.batch_get = function (req, res) {
    Batch.find({}).populate({
        path : 'purchase',
        select:['supplier','bill_number'],
        populate : {
          path : 'supplier',
          select: 'name'
        }
      }).exec( function (err, batch) {
        if (err) return res.send(err.message);
        else res.send(batch);
    })
};


exports.batch_delete = function (req, res) {
    Batch.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err.message);
        res.send('Deleted successfully!');
    })
};

exports.batch_update = async function (req, res) {
    await Purchase.findOne({
        bill_number: req.body.bill_number
    }, function (err, purchase) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            req.body.purchase = purchase._doc._id
        }
    });
    Purchase.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, purchase) {
        if (err) return res.send(err.message);
        else res.send(purchase);
    });
};
