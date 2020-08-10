let Unit = require("../models/unit");

exports.unit_post = function (req, res) {
    let unit = new Unit({
        name: req.body.name,
        short_name: req.body.short_name
    });

    unit.save(function (err, theUnit) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Unit created successfully',
                unit: theUnit
            });
        }
    })
};

exports.unit_get = function (req, res) {
    Unit.find({}, function (err, unit) {
        if (err) return res.send(err.message);
        res.send(unit);
    })
};

exports.unit_delete = function (req, res) {
    Unit.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err.message);
        res.send('Deleted successfully!');
    })
};

exports.unit_update = function (req, res) {
    Unit.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, unit) {
        if (err) return res.send(err.message);
        res.send(unit);
    });
};