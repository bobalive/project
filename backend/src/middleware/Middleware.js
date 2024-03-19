const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.sendStatus(401); // Unauthorized if token is not present
    }

    jwt.verify(token,  process.env.TOKENKEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }

        req.user = decoded.user;

        next();
    });
};
module.exports= verifyToken