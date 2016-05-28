var User = require('../models/UserModel');

module.exports = {

  register: function(req, res, next) {
      User.create(req.body, function(err, result) {
        if(err) return res.status(500).send(err);
        newUser = result.toObject();
        newUser.password = null;
        res.status(200).json(newUser);
      });
    },

    me: function(req, res, next) {
      if (!req.user) return res.status(401).send('current user not defined');
      req.user.password = null;
      return res.status(200).json(req.user);
    },

    update: function(req, res, next) {
      User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
        if (err) next(err);
        res.status(200).send('user updated');
      });
    }

};
