angular.module('devHousing').service('faqService', function($http) {

    // create new FAQ
    this.createFaq = function(faq) {
        return $http ({
            method: 'POST',
            url: '/faq',
            data: faq
        }).then(function(response) {
            return response.data;
        });
    };

    // get all FAQs
    this.getFaqs = function() {
        return $http ({
            method: 'GET',
            url: '/faqs'
        }).then(function(response) {
            return response.data;
        });
    };

    // update single FAQ
    this.updateFaq = function(faq) {
        return $http ({
            method: 'PUT',
            url: '/faq/' + faq._id,
            data: faq
        }).then(function(response) {
            return response.data;
        });
    };

    // remove single FAQ
    this.deleteFaq = function(faq) {
        return $http ({
            method: 'DELETE',
            url: '/faq/' + faq._id,
        }).then(function(response) {
            return response.data;
        });
    };

});  // closing service tag
