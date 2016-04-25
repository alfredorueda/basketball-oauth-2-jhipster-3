(function() {
    'use strict';

    angular
        .module('basketballOauth2Jhipster3App')
        .factory('notificationInterceptor', notificationInterceptor);

    notificationInterceptor.$inject = ['$q', 'AlertService'];

    function notificationInterceptor ($q, AlertService) {
        var service = {
            response: response
        };

        return service;

        function response (response) {
            var alertKey = response.headers('X-basketballOauth2Jhipster3App-alert');
            if (angular.isString(alertKey)) {
                AlertService.success(alertKey, { param : response.headers('X-basketballOauth2Jhipster3App-params')});
            }
            return response;
        }
    }
})();
