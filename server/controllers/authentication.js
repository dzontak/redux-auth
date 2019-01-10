const User = require("../models/user");
const config = require("../config");
const jwt = require("jwt-simple");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide an email or password" });
  }
  // check if user exist
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    // if the user exist return error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in user" });
    }
    // if user does not exist create and save user
    const user = new User({ email, password });
    user.save(err => {
      if (err) {
        return next(err);
      } else {
        // respond to request indication the user was created.
        res.json({ token: tokenForUser(user) });
      }
    });
  });
};
