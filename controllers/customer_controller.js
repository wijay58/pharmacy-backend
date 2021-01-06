let Customer = require("../models/customer");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {
    body,
    validationResult
} = require("express-validator");

exports.validate = () => {
    return [
        body('fname', 'First name is required and should have at least 3 characters').not().isEmpty().isLength({
            min: 3,
            max: 15
        }),
        body('lname', 'Last name is required and should have at least 3 characters').not().isEmpty().isLength({
            min: 3,
            max: 15
        }),
        body('email', 'Email is required and should be valid').not().isEmpty().normalizeEmail().isEmail(),
        body('phone', 'Phone number is required').not().isEmpty(),
    ]
}

exports.customer_post = async function (req, res) {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        let customer = new Customer({
            firstname: req.body.fname,
            lastname: req.body.lname,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword
        });
        customer.save(function (err, theCustomer) {
            if (err) {
                res.status(500).json({
                    error: err.message,
                    code: err.code || 500
                });
            } else {
                res.status(200).json({
                    message: 'Customer created successfully',
                    customer: theCustomer
                });
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: err.message
        });
    }
};

exports.customer_login = async function (req, res) {
    await Customer.findOne({
        email: req.body.email
    }, async function (err, user) {
        if (!user) return res.status(404).send('No user found.');
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                let token = jwt.sign({
                    id: user.id
                }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({
                    auth: true,
                    token: token,
                    user: user
                });
            } else {
                return res.status(401).send(
                    "Email or password is wrong."
                );
            }
        } catch (err) {
            res.status(500).send('Could not login')
        }
    });
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