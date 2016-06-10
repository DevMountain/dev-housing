var Protocol = require('../models/ProtocolModel.js');

module.exports = {

    create: function(request, response, next) {
        Protocol.create(request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                response.status(200).send(serverResponse);
            }
        });
    },

    read: function(request, response, next) {
        Protocol.find(request.query, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                console.log("Getting Protocol to read.");
                response.status(200).send(serverResponse);
            }
        });
    },

    readById: function(request, response, next) {
        Protocol.findById(request.params.id, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                console.log("reading by id: ",request.params.id);
                response.status(200).send(serverResponse);
            }
        });
    },

    update: function(request, response, next) {
        Protocol.findByIdAndUpdate(request.params.id, request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                console.log('Updating ' + request.params.id);
                response.status(200).send(serverResponse);
            }
        });
    },

    delete: function(request, response, next) {
        Protocol.findByIdAndRemove(request.params.id, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                console.log('Deleted Protocol');
                response.status(200).send(serverResponse);
            }
        });
    }

};  // closing exports tag
