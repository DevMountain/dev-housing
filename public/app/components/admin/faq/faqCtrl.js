angular.module('devHousing').controller('faqController', function($scope, faqService) {

    // selecting an FAQ to edit/remove
    $scope.selectFaq = function(faq) {
        $scope.selected = faq;
    };

    // add new FAQ
    $scope.newFaq = {};
    $scope.addNewFaq = function(newFaq) {
        faqService.createFaq(newFaq).then(function(response) {
            $scope.displayAllFaqs();
            $scope.newFaq = {};
        });
    };

    // display all FAQs
    $scope.displayAllFaqs = function() {
        faqService.getFaqs().then(function(response) {
            $scope.Faq = response;
        });
    };

    $scope.displayAllFaqs();

    // update single FAQ
    $scope.selected = {};
    $scope.updateFaq = function(faq) {
        faqService.updateFaq(faq).then(function(response) {
            $scope.displayAllFaqs();
            $scope.selected = {};
        });
    };

    // remove single FAQ
    $scope.selected = {};
    $scope.deleteFaq = function(faq) {
        faqService.deleteFaq(faq).then(function(response) {
            $scope.displayAllFaqs();
            $scope.selected = {};
        });
    };

});  // closing controller tag
