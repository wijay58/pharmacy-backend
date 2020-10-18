let Sales = require("../models/sales");
let Customer = require("../models/customer");
let Batch = require("../models/batch");

exports.sales_post = async function (req, res) {
    let customerId;
    let firstname = req.body.customer.split(' ')[0]
    let lastname = req.body.customer.split(' ')[1]
    if (firstname) {
        await Customer.findOne({
            firstname: firstname,
            lastname: lastname
        }, function (err, customer) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                customerId = customer._doc._id
            }
        });
    }
    let sales = new Sales({
        customer: customerId,
        items: req.body.items,
        total: req.body.total
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
exports.sales_get = function (req, res) {
    Sales.find({}).populate({path:'customer',select:['firstname','lastname']}).exec( function (err, sales) {
        if (err) return res.send(err.message);
        else res.send(sales);
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