let Medicine = require("../models/medicine");
let Unit = require("../models/unit");
let Category = require("../models/category");

exports.medicine_post = async function (req, res) {
    let categoryid;
    let unitid;
    await Unit.findOne({
        short_name: req.body.unit
    }, function (err, unit) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            unitid = unit._doc._id
        }
    });
    await Category.findOne({
        name: req.body.category
    }, function (err, category) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            categoryid = category._doc._id
        }
    });
    let medicine = new Medicine({
        name: req.body.name,
        generic_name: req.body.generic_name,
        unit: unitid,
        category: categoryid
    });

    medicine.save(function (err, theMedicine) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Medicine created successfully',
                medicine: theMedicine
            });
        }
    })
};

exports.medicine_get = function (req, res) {
    Medicine.find({}).populate('unit', 'short_name').populate('category', 'name').exec(function (err,medicine) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.send(medicine)
        }
    })
};

exports.medicine_delete = function (req, res) {
    Medicine.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err.message);
        res.send('Deleted successfully!');
    })
};

exports.medicine_update = async function (req, res) {
    await Unit.findOne({
        short_name: req.body.unit
    }, function (err, unit) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            req.body.unit = unit._doc._id
        }
    });
    await Category.findOne({
        name: req.body.category
    }, function (err, category) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            req.body.category = category._doc._id
        }
    });
    Medicine.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, medicine) {
        if (err) return res.send(err.message);
        res.send(medicine);
    });
};