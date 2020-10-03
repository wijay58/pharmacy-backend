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
            } else {
                console.log(batch);
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