const passport = require("passport");

const jwtAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) {
      res.json({message: "Error in middeleware"})
      return next(err);
    }
    if (!user) {
      res.status(401).json({message: "User does not exist"});
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = jwtAuth;
