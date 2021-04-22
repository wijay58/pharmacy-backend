let MedicineList = require("../models/medicine_list");
let Batch = require("../models/batch");
const cloudinary = require("../cloudinary");
const upload = require("../multer");
const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const path = require('path');
const fs = require('fs');
const {
    body,
    validationResult
} = require("express-validator");

exports.validate = () => {
    return [
        body('url', 'Url is required').not().isEmpty(),
        body('customerid', 'Customer id is required').not().isEmpty(),
        body('address', 'Address is required and should have at least 5 characters').not().isEmpty().isLength({
            min: 5
        }),
        body('city', 'City is required and should have at least 2 characters').not().isEmpty().isLength({
            min: 2
        })
    ]
}

sendMail = async function(parameters,req,res) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })

    let source = fs.readFileSync(path.join(__dirname, parameters.template), 'utf8')
    let template = hbs.compile(source);
    let variables = {
        firstname: parameters.firstname,
        reason: parameters.reason
    }
    let mailOptions = {
        from: process.env.EMAIL,
        to: parameters.email,
        subject: parameters.subject,
        html: template(variables)
    }

    transporter.sendMail(mailOptions,function(err,data){
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: "Email sent successfully."
            });
        }
    })
} 

exports.onlineOrders_postImage = async function (req, res, next) {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.body.images.dataURL);
       // Create new user
      req.body.url = result.url
      // Save user
      next()
    } catch (err) {
      next(err);
    }; 
};

exports.onlineOrders_post = async function (req, res) {
    let onlineOrder = new MedicineList({
        prescription: req.body.url,
        customer: req.body.customerid,
        customer_order_notes: req.body.notes,
        address: req.body.address,
        city: req.body.city,
        postalcode : req.body.postcode,
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
    MedicineList.find({}).populate({path:'customer',select:['firstname','lastname']}).populate({path:'user',select:['firstname','lastname']}).exec(function (err,medicineList) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.send(medicineList)
        }
    })
};

exports.onlineOrders_getByOrderNumber = function (req, res) {
    MedicineList.findOne({online_order_number: req.params.id}).populate({path:'customer',select:['firstname','lastname','email','phone']}).populate({path:'user',select:['firstname','lastname']}).exec(function (err,medicineList) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.send(medicineList)
        }
    })
};

exports.onlineOrders_getByUser = function (req, res) {
    MedicineList.find({user:req.params.id}).populate({path:'customer',select:['firstname','lastname']}).populate({path:'user',select:['firstname','lastname']}).exec(function (err,medicineList) {
        if(err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.send(medicineList)
        }
    })
};

exports.onlineOrders_reject = async function (req, res) {
    req.body.stage = "4"
    req.body.remark = req.body.message
    await MedicineList.findOneAndUpdate({_id: req.params.id},{$set: req.body},{upsert: true})
    .populate('customer')
    .exec(function (err, medicineList) {
        if (err) return res.send(err.message);
        else {
            let template = "../views/orderReject.handlebars";
            let Mailparameters = {
            from: process.env.EMAIL,
            template: template,
            email: medicineList._doc.customer._doc.email,
            firstname: medicineList._doc.customer._doc.firstname,
            reason: req.body.remark,
            subject: 'Your Order is rejected.',
            }
            sendMail(Mailparameters,req,res);
        };
    });
};

exports.onlineOrders_cashier_update = async function (req, res) {
    await req.body.list.forEach(item => {
        let qty = item.Remainingqty - item.qty
        Batch.findByIdAndUpdate(item.id, { remaining_quantity: qty }, function(err,batch){
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            }
        })   
    });
    req.body.stage = "2"
    await MedicineList.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, medicineList) {
        if (err) return res.send(err.message);
        else res.send(medicineList);
    });
};