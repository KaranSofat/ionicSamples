angular.module('starter.profiles', ['starter.config'])

    .config(function ($stateProvider, FB_APP_ID) {

        openFB.init({appId: FB_APP_ID});

        $stateProvider

            .state('profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile.html",
                        controller: "ProfileCtrl"
                    }
                }
            });
    })

    .controller('ProfileCtrl', function ($scope) {
        openFB.api({
            path: '/me',
            params: {fields: 'id,name'},
            success: function (user) {
                $scope.$apply(function () {
                    $scope.user = user;
                });
            },
            error: function (error) {
                alert('Error connecting to Facebook. Did you log in?');
            }
        });
    });
