// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//Stripe.setPublishableKey('pk_test_rRNXcLnSevgvtvCJO8SLbnu6');/*now no use it */

angular.module('starter', ['ionic','ionic.service.core','ngCordova','ionic.service.push',  'starter.controller', 'starter.services','angularPayments','timer','ngDialog'])

 .run(function($ionicPlatform,$rootScope,$http,$window, $stateParams, $location,storageService,$ionicPopup,$state,HomeOwners,$cordovaSplashscreen) {
 
$rootScope.$on('$locationChangeStart', function (event, next, current) {

 var userId=storageService.get("userId");


 
})
 
 
  
  var userId=storageService.get("userId");

  var useremail=storageService.get("useremail");
  if(userId!=null && useremail!=null)
  {
 
  $("#menu12").hide();
  $("#menu1").show();
   $("#notify").show();
   
  
  }
  else
  {
  $("#menu1").hide();
  $("#menu12").show();
   $("#notify").hide();
  
  }

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
   
   

   
 /*  if(window.Connection) {
   
                if(navigator.connection.type == Connection.NONE) {
                
                    $state.go('connection');
                    /*$ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }*/

/*     HomeOwners.show_services().then(function(response) {
  //alert("here");
       $cordovaSplashscreen.hide();
       
  })*/

   
  });



 



})
  .constant('ApiEndpoint', {
  url: 'http://incitysearch.com/api/'
})

.config(['$httpProvider', function($httpProvider) {
//$httpProvider.defaults.withCredentials = true;
       // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
         
  
          
    }
])
/* .config(function($httpProvider) {


  //$httpProvider.defaults.withCredentials = true;
  
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/javascript";
 // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  //$httpProvider.defaults.headers.common["Content-Type"]='X-Ionic-Application-Id';
   //$httpProvider.defaults.headers.common["Access-Control-Allow-Origin"]='*';
     //$httpProvider.defaults.headers.common["Access-Control-Allow-Headers"]='Content-Type';
      //$httpProvider.defaults.headers.common["Access-Control-Allow-Methods"]='POST, GET, OPTIONS';
 

  
 
  
  
  

})*/

  .config(function($stateProvider, $urlRouterProvider, $compileProvider,$ionicAppProvider) {
 $ionicAppProvider.identify({
    app_id: '77c3656e',
    api_key: '6d866706c24990c84206e461d3d50f5c2ee2a2b872b46fe4',
   dev_push: true
  });
  
  /* if(window.Connection) {
   
                if(navigator.connection.type == Connection.NONE) {
                
                    $state.go('connection');
                    /*$ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }*/
  
   

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);


  $stateProvider


  .state('index', {
    url: "/index",
    
    templateUrl: "templates/menu.html",
    controller: 'DashCtrl'
  })
  
  .state('power2', {
    url: "/power2",
    cache: false,
    templateUrl: "templates/power2.html",
    controller: 'power2Ctrl'
  })
  
  .state('searchBox', {
    url: "/searchBox",
    templateUrl: "templates/searchBox.html",
    controller: 'searchBoxCtrl'
  })
  
    .state('searchBox2', {
    url: "/searchBox2",
    templateUrl: "templates/searchbox_2.html",
    controller: 'searchBoxCtrl'
  })
  .state('connection', {
    url: "/connection",
    templateUrl: "templates/connection.html",
    controller: 'connectionCtrl'
  })
  .state('searchDetail', {
    url: "/searchDetail/:id",
    templateUrl: "templates/searchDetail.html",
    controller: 'searchDetailCtrl'
  })
    
  .state('jobs', {
    url: "/jobs",
    templateUrl: "templates/jobs.html",
    controller: 'JobsCtrl'
  })

  .state('detailJob', {
    url: "/detailJob/:id",
    templateUrl: "templates/detailJob.html",
    controller: 'detailJobCtrl'
  })

    .state('logout', {
    url: "/logout",
    templateUrl: "templates/services.html",
    controller: 'logOutCtrl'
  })

      .state('techDetail', {
    url: "/techDetail/:id",
    templateUrl: "templates/techDetail.html",
    controller: 'techDetailCtrl'
  })


      .state('noResult', {
    url: "/noResult",
    templateUrl: "templates/noResult.html",
    controller: 'noResultCtrl'
  })


   .state('searchResult', {
    url: "/searchResult",
    templateUrl: "templates/searchResult.html",
    controller: 'searchResultCtrl'
  })



  // setup an abstract state for the tabs directive
  .state('login', {
 
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  // Each tab has its own nav history stack:

  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/dash.html',
    controller: 'DashCtrl'
  })

    .state('new_auction', {
    url: '/new_auction',
    templateUrl: 'templates/new_auction.html',
    controller: 'NewAucCtrl'

  })
  
    .state('power', {
  
    url: '/power',
    cache: false,
    templateUrl: 'templates/power.html',
    controller: 'powerCtrl'

  })
  

    .state('my_bids', {
    url: '/my_bids',
    templateUrl: 'templates/my_bids.html',
    controller: 'BidsCtrl'

  })
   .state('detailNotification', {
    url: '/detailNotification',
    templateUrl: 'templates/detailNotification.html',
    controller: 'detailNotificationCtrl'

  })

    .state('provider_detail', {
    url: '/provider_detail/:techId/:techPrice/:techDistance',
    templateUrl: 'templates/provider_detail.html',
    controller: 'BidInfoCtrl'
  })

    .state('appointment', {
    url: '/appointment',
    templateUrl: 'templates/appointment.html',
    controller: 'AppointmentCtrl'
  })

    .state('my_greenpal', {
    url: '/my_greenpal',
    templateUrl: 'templates/my_greenpal.html',
    controller: 'GreenpalCtrl'
  })

   .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: 'aboutCtrl'
  })
  
     .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })
  
      .state('edit_info', {
    url: '/edit_info',
    templateUrl: 'templates/edit_info.html',
    controller: 'informationCtrl'
  })
  
  
      .state('change_password', {
    url: '/change_password',
    templateUrl: 'templates/change_password.html',
    controller: 'passwordCtrl'
  })
  
   .state('singup', {
    url: '/singup',
    templateUrl: 'templates/singup.html',
    controller: 'singupCtrl'
  })
  
    .state('reset_password', {
    url: '/reset_password',
    templateUrl: 'templates/reset_password.html',
    controller: 'ResetCtrl'
  })

    .state('dispute_cut', {
    url: '/dispute_cut/:disputeId',
    templateUrl: 'templates/dispute_cut.html',
    controller: 'DisputeImageCtrl'
  })

    .state('lawn_cut', {
    url: '/lawn_cut',
    templateUrl: 'templates/lawn_cut.html',
    controller: 'LawnCtrl'
  })

    .state('bc_cut', {
    url: '/bc_cut',
    templateUrl: 'templates/bc_cutters.html',
    controller: 'BcCtrl'
  })
    .state('approve', {
    url: '/approve/:approveId',
    templateUrl: 'templates/approve.html',
    controller: 'RatingCtrl'
  })
    .state('secure_date', {
    url: '/secure_date',
    templateUrl: 'templates/secure_date.html',
    controller: 'creditCtrl'
  })
    .state('card_secure', {
    url: '/card_secure',
    templateUrl: 'templates/card_secure.html',
    controller: 'creditCtrl'
  })
    .state('apr_secure', {
    url: '/apr_secure',
    templateUrl: 'templates/secure_apr.html',
    controller: 'creditCtrl'
  })
    .state('cut_in_dispute', {
    url: '/cut_in_dispute',
    templateUrl: 'templates/cut-in-dispute.html',
    controller: 'DisputeCtrl'
  })
  
  .state('dispute_reply', {
    url: '/dispute_reply',
    templateUrl: 'templates/dispute_reply.html',
    controller: 'DisputeReplyCtrl'
  })
  
  
    .state('service', {
    url: '/service/:disputeappointmentId',
    templateUrl: 'templates/service.html',
    controller: 'ServiceCtrl'
  })
  
  .state('services', {
  
    url: '/services',
    templateUrl: 'templates/services.html',
    controller: 'ServicesCtrl'
  })
  
  
  
    .state('complaint', {
    url: '/complaint/:complaintId',
    templateUrl: 'templates/complaint.html',
    controller: 'ComplaintCtrl'
  })
    .state('bid', {
    url: '/bid/:vendorId',
    templateUrl: 'templates/bid.html',
    controller: 'BidCtrl'
  })
    .state('all', {
    url: '/all',
    templateUrl: 'templates/all.html',
    controller: 'AllCtrl'
  })
    .state('day', {
    url: '/day',
    templateUrl: 'templates/greenpal_day.html',
    controller: 'DayCtrl'
  })
  
  .state('thanku', {
    url: '/thanku',
    templateUrl: 'templates/thanku.html',
    controller: 'thankuCtrl'
  })
  
    .state('bid_detail', {
    url: '/bid_detail',
    templateUrl: 'templates/bid_detail.html',
    controller: 'BidDetailCtrl'
  })
    .state('overdue', {
    url: '/overdue',
    templateUrl: 'templates/overdue.html',
    controller: 'DueCtrl',
    cache: false
  })
    .state('reschedule', {
    url: '/reschedule/:resId/:resName',
    templateUrl: 'templates/reschedule.html',
    controller: 'RescheduleCtrl'
  })
    .state('complete', {
    url: '/complete/:appointmentId',
    templateUrl: 'templates/complete.html',
    controller: 'CompleteCtrl'
  })
    .state('specific', {
    url: '/specific_date',
    templateUrl: 'templates/specific_date.html',
    controller: 'SpecificCtrl'
  })

    .state('cancelapp', {
    url: '/cancelapp/:cancelID/:appointmentName',
    templateUrl: 'templates/cancel_appointment.html',
    controller: 'CancelAppCtrl'
  })

    .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  })
    .state('no_appointment', {
    url: '/no_appointment',
    templateUrl: 'templates/no_appointment.html',
    controller: 'NoAppointmentCtrl'
  })

    .state('app_complete', {
    url: '/app_complete',
    templateUrl: 'templates/app_complete.html',
    controller: 'app_completeCtrl'
  })

    .state('paid', {
    url: '/paid/:paidID/:homeownerName',
    templateUrl: 'templates/paid.html',
    controller: 'paidCtrl'
  })
   .state('terms', {
    url: '/terms',
    templateUrl: 'templates/terms.html',
    controller: 'termsCtrl'
  })

    .state('log_out', {
      cache: false,
    url: '/log_out',
    templateUrl: 'templates/log_out.html',
    controller: 'log_outCtrl'
  })
 .state('job', {
    url: '/job/:serviceId',
    templateUrl: 'templates/job.html',
    controller: 'jobCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/services');

});
