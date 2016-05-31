angular.module('devHousing').controller('faqController', function($scope, faqService) {

    // add new FAQ
    $scope.newFaq = {};
    $scope.addNewFaq = function(newFaq) {
        faqService.createFaq(newFaq).then(function(response) {
            $scope.newProduct = {};
        });
    };

    // display all FAQs
    $scope.displayAllFaqs = function() {
        faqService.getFaqs().then(function(response) {
            $scope.Faq = response;
        });
    };

    // update single FAQ
    $scope.updateFaq = function(faq) {
        faqService.updateFaq(faq).then(function(response) {
        });
    };

    // remove single FAQ
    $scope.deleteFaq = function(faq) {
        faqService.deleteFaq(faq).then(function(response) {
        });
    };

});  // closing controller tag
