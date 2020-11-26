let Batch = require("../models/batch");
let Purchase = require("../models/purchase");
let Medicine = require("../models/medicine");
const {
    body,
    validationResult
} = require("express-validator");

exports.validate = () => {
    return [
        body('expiry_date', 'Expiry Date is required').not().isEmpty().isDate(),
        body('bill_number', 'Bill number is required').not().isEmpty(),
        body('name', 'Medicine name is required').not().isEmpty(),
        body('remaining_quantity', 'Remaining Quantity is required and it Should not be 0').not().isEmpty().isFloat({
            min: 1
        }),
        body('storage', 'Storage is required').not().isEmpty(),
        body('bought_price', 'Bought Price is required and it Should not be 0').not().isEmpty().isFloat({
            min: 0.1
        }),
        body('selling_price', 'Selling Price is required and it Should not be 0').not().isEmpty().isFloat({
            min: 0.1
        })
    ]
}

exports.batch_post = async function (req, res) {

    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        let purchaseId;
        let medicineId;
        let sum = 0;
        let PurchasePrice;
        await Purchase.findOne({
            bill_number: req.body.bill_number
        }, function (err, purchase) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            } else {
                purchaseId = purchase._doc._id;
                PurchasePrice = purchase._doc.total;
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
        await Batch.find({
            purchase: purchaseId
        }, function (err, batch) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                batch.forEach(element => {
                    let thisSum = element._doc.initial_quantity * parseFloat(element._doc.bought_price)
                    sum += thisSum
                });
                sum += parseInt(req.body.remaining_quantity) * parseFloat(req.body.bought_price)
            }
        });
        if (PurchasePrice < sum) {
            return res.status(500).json({
                error: "Prices Dont Match"
            });
        }

        let batch = new Batch({
            medicine: medicineId,
            purchase: purchaseId,
            expiry_date: req.body.expiry_date,
            bought_price: req.body.bought_price,
            selling_price: req.body.selling_price,
            remaining_quantity: req.body.remaining_quantity,
            storage: req.body.storage,
            initial_quantity: req.body.remaining_quantity
        });

        batch.save(function (err, theBatch) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(200).json({
                    message: 'Batch created successfully',
                    batch: theBatch
                });
            }
        })

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }

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
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
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
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};