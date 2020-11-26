let User = require("../models/user");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const {
    body,
    validationResult
} = require("express-validator");

exports.validate = () => {
    return [
        body('firstname', 'First name is required and should have at least 3 characters').not().isEmpty().isLength({
            min: 3,
            max: 15
        }),
        body('lastname', 'Last name is required and should have at least 3 characters').not().isEmpty().isLength({
            min: 3,
            max: 15
        }),
        body('email', 'Email is required and should be valid').not().isEmpty().normalizeEmail().isEmail(),
        body('phone', 'Phone number is required').not().isEmpty(),
        body('dob', 'Date of birth is required').not().isEmpty().isDate(),
        body('address', 'Address is required').not().isEmpty().isLength({
            min: 5
        }),
        body('joined_date', 'Joined Date is required').not().isEmpty().isDate(),
        body('user_type').optional(),
        body('nic', 'NIC is required').not().isEmpty().isLength({
            min: 5
        }),
        body('password', 'Password is required and it should have atleast 5 characters').not().isEmpty().isLength({
            min: 5
        }),
    ]
}

exports.user_post = async function (req, res) {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob,
            address: req.body.address,
            joined_date: req.body.joined_date,
            user_type: req.body.user_type,
            nic: req.body.nic,
            password: hashedPassword
        });
        user.save(function (err, theUser) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            } else {
                return res.status(200).json({
                    message: 'User created successfully',
                    user: theUser
                });
            }
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

exports.user_get = function (req, res) {
    User.find({}, function (err, user) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        } else {
            user.forEach(item => {
                item._doc.name = item.firstname + " " + item.lastname;
            });
            return res.send(user)
        }
    })
};

exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err.message);
        return res.send('Deleted successfully!');
    })
};

exports.user_update = async function (req, res) {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, function (err, user) {
            if (err) return res.send(err.message);
            return res.send(user);
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

exports.user_login = async function (req, res) {
    await User.findOne({
        email: req.body.email
    }, async function (err, user) {
        if (!user) return res.status(404).send('No user found.');
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                let token = jwt.sign({
                    id: user.id,
                    user_type: user.user_type
                }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({
                    auth: true,
                    token: token,
                    user_type: user.user_type,
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