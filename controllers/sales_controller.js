let Sales = require("../models/sales");
let Batch = require("../models/batch");
let MedicineList = require("../models/medicine_list");

exports.sales_post_normal = async function (req, res) {
    let sales = new Sales({
        items: req.body.items,
        total: req.body.total,
        user: req.body.user,
    });
    
    req.body.items.forEach(item => {
        let qty = item.Remainingqty - item.qty
        Batch.findByIdAndUpdate(item.id, { remaining_quantity: qty }, function(err,batch){
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            }
        })   
    });

    sales.save(function (err, theSale) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Sale created successfully',
                sale: theSale
            });
        }
    })
};
exports.sales_post_online_success = async function (req, res) {
    let sales = new Sales({
        customer: req.body.customerId,
        items: req.body.items,
        total: req.body.total
    });

    await MedicineList.findByIdAndUpdate(req.body._id, {
        stage: "3"
    }, function (err, medicineList) {
        if (err) console.log(err.message);
        else console.log(medicineList);
    });

    sales.save(function (err, theSale) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Sale created successfully',
                sale: theSale
            });
        }
    })
};
exports.sales_get = function (req, res) {
    Sales.find({}).populate({path:'customer',select:['firstname','lastname']}).populate({path:'user',select:['firstname','lastname']}).exec( function (err, sales) {
        if (err) return res.send(err.message);
        else {
            sales.forEach(item => {
                item._doc.name = item.user.firstname + " " + item.user.lastname;
            });
            res.send(sales)
        };
    })
};

exports.sales_getByUser = function (req, res) {
    Sales.find({user:req.params.id}).populate({path:'customer',select:['firstname','lastname']}).populate({path:'user',select:['firstname','lastname']}).exec( function (err, sales) {
        if (err) return res.send(err.message);
        else {
            sales.forEach(item => {
                item._doc.name = item.user.firstname + " " + item.user.lastname;
            });
            res.send(sales)
        };
    })
};

exports.sales_getToday = function (req, res) {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    Sales.find({ createdAt: {$gte: start, $lt: end} }).populate({path:'customer',select:['firstname','lastname']}).exec(function (err, sale) {
        if (err) return res.send(err.message);
        else res.send(sale);
    })
};

exports.sales_getMonth = function (req, res) {
    var d = new Date();
    month = d.getMonth();
    year = d.getFullYear();
    Sales.aggregate(
        [
            { $match: { createdAt: {$lt: new Date(), $gt: new Date(year+','+month) }} },
            {
                $group: {
                    _id: {$month :"$date"},
                    total: {$sum: "$total"}
                }
            },
            {$sort: {"_id": 1} }
        ],

        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        }
    );
};

exports.sales_getMonthlyReport = function (req, res) {
    let year = req.body.Year;
    let month = req.body.Month;
    Sales.aggregate(
        [
            { $match: { createdAt: {$lt: new Date(), $gt: new Date(year+','+month) }} },
            {
                $group: {
                    _id: {$month :"$date"},
                    total: {$sum: "$total"}
                }
            },
            {$sort: {"_id": 1} }
        ],

        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        }
    );
};