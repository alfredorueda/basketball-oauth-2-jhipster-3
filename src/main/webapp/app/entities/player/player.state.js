(function() {
    'use strict';

    angular
        .module('basketballOauth2Jhipster3App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('player', {
            parent: 'entity',
            url: '/player',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'basketballOauth2Jhipster3App.player.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/player/players.html',
                    controller: 'PlayerController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('player');
                    $translatePartialLoader.addPart('posicionesJugadores');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('player-detail', {
            parent: 'entity',
            url: '/player/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'basketballOauth2Jhipster3App.player.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/player/player-detail.html',
                    controller: 'PlayerDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('player');
                    $translatePartialLoader.addPart('posicionesJugadores');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Player', function($stateParams, Player) {
                    return Player.get({id : $stateParams.id});
                }]
            }
        })
        .state('player.new', {
            parent: 'player',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/player/player-dialog.html',
                    controller: 'PlayerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                baskets: null,
                                rebotes: null,
                                asistencias: null,
                                posicionCampo: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('player', null, { reload: true });
                }, function() {
                    $state.go('player');
                });
            }]
        })
        .state('player.edit', {
            parent: 'player',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/player/player-dialog.html',
                    controller: 'PlayerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Player', function(Player) {
                            return Player.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('player', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('player.delete', {
            parent: 'player',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/player/player-delete-dialog.html',
                    controller: 'PlayerDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Player', function(Player) {
                            return Player.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('player', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
