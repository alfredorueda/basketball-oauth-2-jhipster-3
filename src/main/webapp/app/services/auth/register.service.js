(function () {
    'use strict';

    angular
        .module('basketballOauth2Jhipster3App')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
