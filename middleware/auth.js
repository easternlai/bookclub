const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if token exist
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    try {
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error('Something is wrong with the auth middleware');
        res.status(500).json({ msg: 'Server Error'});
    }
};