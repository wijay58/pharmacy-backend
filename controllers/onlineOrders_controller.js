let MedicineList = require("../models/medicine_list");

exports.onlineOrders_post = async function (req, res) {
    let onlineOrder = new MedicineList({
        prescription: req.body.prescription,
        customer: req.body.customerid
    });

    onlineOrder.save(function (err, theMedicineList) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Online order created successfully',
                onlineOrder: theMedicineList
            });
        }
    })
};

exports.onlineOrders_get = function (req, res) {
    MedicineList.find({}).populate('customer', 'firstname').exec(function (err,medicineList) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.send(medicineList)
        }
    })
};

exports.onlineOrders_delete = function (req, res) {
    MedicineList.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err.message);
        res.send('Deleted successfully!');
    })
};