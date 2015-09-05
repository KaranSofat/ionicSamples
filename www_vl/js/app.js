// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['timer','ionic','ngCordova','ionic.service.core','ionic.service.push', 'starter.controllers', 'starter.services'])

.constant('ApiEndpoint', {
  url: 'http://www.vlifetech.com/'
})

.run(function($ionicPlatform,$ionicUser, $ionicPush,$rootScope,$http,$window, $stateParams) {
  $ionicPlatform.ready(function() {
  
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
  
    var user = $ionicUser.get();
     if(!user.user_id) {
     // Set your user_id here, or generate a random one.
     user.user_id = $ionicUser.generateGUID();
     };
     
     
     // Identify your user with the Ionic User Service
     $ionicUser.identify(user).then(function(){
     //$scope.identified = true;
     //alert('User ID ' + user.user_id);
     //alert("here");
     $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
      
        // Handle new push notifications here
        // console.log(notification);
        return true;
      }
     });
     });
     
     
      // Register with the Ionic Push service.  All parameters are optional.
   
 
     $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
     $http({ 
          method: 'post', 
          url: 'http://www.vlifetech.com/addappdevice', 
          params: {
          device_token:data.token
          }
          
          }).success(function(response){
          //alert(response);
          }).error(function(error){
          //alert(error);
          });
          
      //alert("Successfully registered token " + data.token);
      //console.log('Ionic Push: Got token ', data.token, data.platform);
      //$scope.token = data.token;
    });

 
    
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicAppProvider) {
  
  
  $ionicAppProvider.identify({
    app_id: 'cda10b7b',
    api_key: '031f59c78c2155acfd4042a3a5f95437e1c2c2252f6448e3',
   dev_push: false
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'UserCtrl'
    
  })
  
  .state('forgotwassword', {
    url: '/forgotwassword',
    templateUrl: 'templates/forgotwassword.html',
    controller: 'ForgotwasswordCtrl'
    
  })
  
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'ProfileCtrl'
    
  })
  
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
    
  })
  
  .state('updatepassword', {
    url: '/updatepassword',
    templateUrl: 'templates/updatepassword.html',
    controller: 'UpdatepasswordCtrl'
    
  })
  
  
  .state('subscription', {
    url: '/subscription',
    templateUrl: 'templates/subscription.html',
    controller: 'SubscriptionCtrl'
    
  })
  
  .state('mfavorites', {
    url: '/mfavorites',
    templateUrl: 'templates/mfavorites.html',
    controller: 'MfavoritesCtrl'
    
  })
  
  .state('logout', {
    url: '/logout',
    templateUrl: 'templates/logout.html',
    controller: 'LogoutCtrl'
    
  })
  
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl',
    onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
          $state.go('guesthome');
        }
    }
    
  })
  
  .state('guesthome', {
    url: '/guesthome',
    templateUrl: 'templates/guesthome.html',
    controller: 'GuesthomeCtrl',
    onEnter: function($state, Auth){
        if(Auth.isLoggedIn()){
          $state.go('home');
        }
    }
    
  })
  
  // Each tab has its own nav history stack:

  .state('church', {
    url: '/church/:churchid',
    templateUrl: 'templates/church.html',
    controller: 'ChurchCtrl'
  
  })
  
  .state('live', {
    url: '/live/:churchid',
    templateUrl: 'templates/live.html',
    controller: 'LiveCtrl'
  
  })
  
  .state('archive', {
    url: '/archive/:churchid',
    templateUrl: 'templates/archive.html',
    controller: 'ArchiveCtrl'
  
  })
  
  .state('media', {
    url: '/media/:categoryid/:churchid',
    templateUrl: 'templates/media.html',
    controller: 'MediaCtrl'
  
  })
  
  .state('watchmedia', {
    url: '/watchmedia/:categoryid/:churchid/:mediaid',
    templateUrl: 'templates/watch.html',
    controller: 'WatchCtrl'
  
  })
  
  .state('24-7', {
    url: '/24-7/:churchid',
    templateUrl: 'templates/24x7.html',
    controller: 'ProgrameCtrl',
    cache:false
  
  })
  
  .state('contact', {
    url: '/contact/:churchid',
    templateUrl: 'templates/contact.html',
    controller: 'ContactCtrl',
    cache:false
  
  })

    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
