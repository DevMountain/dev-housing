var User = require('../models/UserModel.js');

module.exports = {

  register: function(req, res, next) {
      User.create(req.body, function(err, result) {
        if(err) return res.status(500).send(err);
        newUser = result.toObject();
        newUser.password = null;
        res.status(200).send(newUser);
      });
    },

    me: function(req, res, next) {
      if (!req.user) return res.status(401).send('current user not defined');
      req.user.password = null;
      return res.status(200).send(req.user);
    },

    update: function(req, res, next) {
      User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
        if (err) next(err);
        res.status(200).send('user updated');
      });
    },

    updateUser: function(request, response, next) {
        User.findByIdAndUpdate(request.params.id, request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                console.log('Updating ' + request.params.id);
                response.status(200).send(serverResponse);
            }
        });
    },

    read: function(req, res, next) {
      User.find({}, function(err, response) {
        if (err) {
          return res.status(500).send(err);
        } else {
          for (var i = 0; i < response.length; i++) {
            response[i].password = null;
          }
        }
        res.status(200).send(response);
      });
    },



};
