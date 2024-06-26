const schemas = require('../models/schemas')
const jwt = require("jsonwebtoken")

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        "super secret key",
        async (err, decodedToken) => {
          if (err) {
            res.json({ status: false });
            next();
          } else {
            const user = await schemas.Users.findById(decodedToken.id);
            if (user) {
                req.user = user;
                res.json({ status: true, user: user.username });

            } else {
                res.json({ status: false });
            }
            next();
          }
        }
      );
    } else {
      res.json({ status: false });
      next();
    }
  };