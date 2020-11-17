const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).send({message: 'Auth Failed.Please Sign in again to continue.'});
    }
}