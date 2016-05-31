var Faq = require('../models/FaqModel.js');

module.exports = {

    create: function(request, response, next) {
        Faq.create(request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                response.status(200).send(serverResponse);
            }
        });
    },

    read: function(request, response, next) {
        Faq.find(request.query, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                console.log("Getting FAQ to read.");
                response.status(200).send(serverResponse);
            }
        });
    },

    readById: function(request, response, next) {
        Faq.findById(request.params.id, function(error, serverResponse) {
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
        Faq.findByIdAndUpdate(request.params.id, request.body, function(error, serverResponse) {
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
        Faq.findByIdAndRemove(request.params.id, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                console.log('Deleted FAQ');
                response.status(200).send(serverResponse);
            }
        });
    }

};  // closing exports tag
