// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.services','firebase','angularMoment','starter.config','starter.directives','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.constant('ApiEndpoint', {
  url: 'http://bwcmultimedia.com/PS/KK/Symfony/web/app_dev.php/'
})

.config(function($stateProvider, $urlRouterProvider,FB_APP_ID) {
 openFB.init({appId: FB_APP_ID});

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  
   .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'login'
    })
  .state('settings', {
      url: "/settings",
      templateUrl: "templates/settings.html",
      controller: 'settings'
    })
  .state('online', {
      url: "/online",
      templateUrl: "templates/online.html",
      controller: 'online'
    })



     .state('register', {
      url: "/register",
      templateUrl: "templates/registration.html",
      controller: 'register'
    })
    
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "templates/dashboard.html",
      controller: 'dashboard'
    })
    .state('videos', {
      url: "/videos",
      templateUrl: "templates/video.html",
      controller: 'videos'
    })
    
    
    .state('header', {
      url: "/header",
      templateUrl: "templates/header.html",
      controller: 'header'
    })
    .state('askQuestion', {
      url: "/askQuestion/:id",
      templateUrl: "templates/askQuestion.html",
      controller: 'askQuestion'
    })
     .state('startChat', {
      url: "/startChat/:id",
      templateUrl: "templates/startChat.html",
      controller: 'startChat'
    })
    
     .state('viewDetail', {
      url: "/viewDetail/:id",
      templateUrl: "templates/viewDetail.html",
      controller: 'viewDetail'
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
