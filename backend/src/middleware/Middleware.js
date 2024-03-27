const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token,  process.env.TOKENKEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = decoded.user;
        next();
    });
};
module.exports= verifyToken