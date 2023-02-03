let Sales = require("../models/sales");
let Batch = require("../models/batch");
let MedicineList = require("../models/medicine_list");
const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const path = require('path');
const fs = require('fs');

exports.sendMail = async function(parameters,req,res) {
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
        OnlineOrderNo: parameters.OnlineOrderNo
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

exports.sales_post_normal = async function (req, res) {
    let sales = new Sales({
        items: req.body.items,
        total: req.body.total,
        user: req.body.user,
        method: req.body.method,
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
        total: req.body.total,
        user: req.body.userid
    });

    await MedicineList.findByIdAndUpdate(req.body._id, {stage: "3"})
    .populate('customer')
    .exec(function (err, medicineList) {
        if (err) console.log(err.message);
        else {
            let template = "../views/orderSuccessful.handlebars";
            let Mailparameters = {
            from: process.env.EMAIL,
            template: template,
            email: medicineList._doc.customer._doc.email,
            firstname: medicineList._doc.customer._doc.firstname,
            OnlineOrderNo: medicineList._doc.online_order_number,
            subject: 'Your Order is successful.',
            }
            sendMail(Mailparameters,req,res);
        };
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
    Sales.find({})
    .populate({path:'user',select:['firstname','lastname']})
    .populate({path: 'customer',select: ['firstname', 'lastname']})
    .exec( function (err, sales) {
        if (err) return res.send(err.message);
        else {
            if(sales.length > 0) {
                sales.forEach(item => {
                  if(item.user)
                    item._doc.name = item.user.firstname + " " + item.user.lastname;
                  else 
                    item._doc.name = null
                });
            }
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