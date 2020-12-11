let Batch = require("../models/batch");

exports.notification_get = async function (req, res) {
    await Batch.find({"remaining_quantity":{$lt:50,$gt:0}}).populate({
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
            return res.send(batch)
        })
};

exports.notification_getExpiry = async function(req,res) {
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate()+30);
    await Batch.find({"expiry_date":{$lt:cutoff}}).populate({
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
        return res.send(batch)
    })
}