let Sales = require("../models/sales");
let Customer = require("../models/customer");

exports.sales_post = async function (req, res) {
    let customerId;
    let firstname = req.body.customer.split(' ')[0]
    let lastname = req.body.customer.split(' ')[1]
    if(firstname) {
        await Customer.findOne({
            firstname: firstname,
            lastname: lastname
        }, function (err, customer) {
            if(err) {
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

    sales.save(function (err, theSale) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Sale created successfully',
                purchase: theSale
            });
        }
    })
};