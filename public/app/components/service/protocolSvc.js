angular.module('devHousing').service("protocolSvc", function($http) {

    // Create new Housing Protocol
    this.createProtocol = function(protocol) {
        return $http({
            method: 'POST',
            url: '/protocol',
            data: protocol
        }).then(function(response) {
            return response.data;
        });
    };

    //  Get all Housing Protocols
    this.getProtocols = function() {
        return $http({
            method: 'GET',
            url: '/protocols',
        }).then(function(response) {
            return response.data;
        });
    };

    //  Update single Housing Protocol
    this.updateProtocol = function(protocol) {
        return $http({
            method: 'PUT',
            url: '/protocol/' + protocol._id,
            data: faq
        }).then(function(response) {
            return response.data;
        });
    };

    // Delete single Housing Protocol
    this.deleteProtocol = function(protocol) {
        return $http({
            method: "DELETE",
            url: '/protocol/' + protocol._id
        }).then(function(response) {
            return response.data;
        });
    };

}); // closing service tag
