let Batch = require("../models/batch");
let Purchase = require("../models/purchase");
let Medicine = require("../models/medicine");

exports.batch_post = async function (req, res) {
    let purchaseId;
    let medicineId;
    await Purchase.findOne({
        bill_number: req.body.bill_number
    }, function (err, purchase) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            purchaseId = purchase._doc._id
        }
    });
    await Medicine.findOne({
        name: req.body.name
    }, function (err, medicine) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            medicineId = medicine._doc._id
        }
    });
    let batch = new Batch({
        medicine: medicineId,
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
            path: 'purchase',
            select: ['supplier', 'bill_number'],
            populate: {
                path: 'supplier',
                select: 'name'
            }
        })
        .populate({
            path: 'medicine',
            populate: {
                path: 'category'
            }
        })
        .populate({
            path: 'medicine',
            populate: {
                path: 'unit'
            }
        })
        .exec(function (err, batch) {
            if (err) return res.send(err.message);
            else res.send(batch);
        })
};

exports.batch_search = async function (req, res) {
    let med = []
    let query = req.params.searchText ? req.params.searchText : "";
    console.log(query)
    await Medicine.find({
        'name': new RegExp(query, 'i')
    }, async (err, medicine) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        } else {
            med = medicine
            Batch.find({
                    medicine: {
                        $in: med
                    }
                }).populate({
                    path: 'purchase',
                    select: ['supplier', 'bill_number'],
                    populate: {
                        path: 'supplier',
                        select: 'name'
                    }
                })
                .populate({
                    path: 'medicine',
                    populate: {
                        path: 'category'
                    }
                })
                .populate({
                    path: 'medicine',
                    populate: {
                        path: 'unit'
                    }
                })
                .exec(function (err, batch) {
                    if (err)
                        return res.send(err.message);
                    else {
                        return res.send(batch)
                    }
                });
        }
    });
};


exports.batch_delete = function (req, res) {
    Batch.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err.message);
        res.send('Deleted successfully!');
    })
};

exports.batch_update = async function (req, res) {
    await Medicine.findOne({
        name: req.body.name
    }, function (err, medicine) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            req.body.medicine = medicine._doc._id
        }
    });
    await Purchase.findOne({
        bill_number: req.body.bill_number
    }, function (err, purchase) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            req.body.purchase = purchase._doc._id
        }
    });
    Batch.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, purchase) {
        if (err) return res.send(err.message);
        else res.send(purchase);
    });
};