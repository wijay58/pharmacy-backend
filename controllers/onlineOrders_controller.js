let MedicineList = require("../models/medicine_list");
let Batch = require("../models/batch");
const cloudinary = require("../cloudinary");
const upload = require("../multer");
const nodemailer = require('nodemailer');

sendMail = async function(mailOptions,req,res) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })

    transporter.sendMail(mailOptions,function(err,data){
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully.')
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
            let mailOptions = {
            from: process.env.EMAIL,
            to: medicineList._doc.customer._doc.email,
            subject: 'Your Order is rejected.',
            text: "Templating should be done"
            }
            sendMail(mailOptions,req,res);
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