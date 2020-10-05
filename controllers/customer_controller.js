let Customer = require("../models/customer");
var bcrypt = require('bcryptjs');

exports.customer_post = async function (req, res) {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let customer = new Customer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
        password: hashedPassword
    });
    customer.save(function (err, theCustomer) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Customer created successfully',
                customer: theCustomer
            });
        }
    })
};

exports.customer_get = function (req, res) {
    Customer.find({},function (err,customer) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            customer.forEach(item => {
                item._doc.name = item.firstname + " " + item.lastname;
            });
            res.send(customer)
        }
    })
};

exports.customer_delete = function (req, res) {
    Customer.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err.message);
        res.send('Deleted successfully!');
    })
};

exports.customer_update = async function (req, res) {
    Customer.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, customer) {
        if (err) return res.send(err.message);
        res.send(customer);
    });
};