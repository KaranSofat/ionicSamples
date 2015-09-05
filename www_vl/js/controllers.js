angular.module('starter.controllers', [])


// ContactCtrl to send contact us request
.controller('ContactCtrl', function($scope,$cordovaInAppBrowser,$http,$state, $window, $stateParams, Church,Auth) {
    
    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };

    
  
   
    Church.Detail($stateParams.churchid).then(function(response) {
    $scope.client= response;
    $scope.permissiontypes = JSON.parse("[" + response.Client.permissiontypes_id + "]");
    });
    
     $scope.gotodonation = function (donationurl) {
    window.open(donationurl, "_blank", "location=yes");
    }
    
    $scope.contact = [];
    $scope.sendcontactrequest = function(){
   
        $http({ 
        method: 'post', 
        url: 'http://www.vlifetech.com/sendcontactrequest', 
        params: {
           clientid:$scope.client.Client.id,
           name:$scope.contact.name,
           email:$scope.contact.email,
           comment:$scope.contact.comment
           
           
        }
    
    }).success(function(response){
        if(response){
        $scope.error = response;
        $scope.contact ='';
        }else{
        $scope.error = 'Invalid Information';
        }
        
        }).error(function(error){
        $scope.error = 'Invalid Information';
    });

 };
    
    
    
})

//  Programe controller to show 24x7 of select church
.controller('ProgrameCtrl', function($scope,$cordovaInAppBrowser,SharedService,$rootScope,$anchorScroll, $location ,$sce, $http, $state, $window, $stateParams, Church,Auth) {

  
      $scope.$on('$ionicView.beforeLeave', function(){
         jwplayer("jwplayerelement").stop();
         $state.reload();
      }); 
      
     
    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
    Church.Detail($stateParams.churchid).then(function(response) {
    $scope.client= response;
    $scope.permissiontypes = JSON.parse("[" + response.Client.permissiontypes_id + "]");
    });
    
    
    $scope.gotodonation = function (donationurl) {
    window.open(donationurl, "_blank", "location=yes");
    }
    
    Church.Live($stateParams.churchid).then(function(response) {
    if(response.Liveevent){
    $scope.church= response;
    
    // define countdown 
    var countdown  = Date.parse(response.Liveevent.startdate +'T'+ response.Liveevent.start_time);
    var ctime = new Date(response.currentTime);
    $scope.serverctime= ctime;
     $scope.countdownVal = 0;
     if(countdown > ctime){
     $scope.countdownVal = (countdown - ctime)/1000;
     }
     
     }else{
      $scope.countdownVal = 0;
     }
     
   
    });
    
    
    // fetech live event of slected clients  
    Church.Programe($stateParams.categoryid,$stateParams.churchid).then(function(response) {
    
    if(response.Schedulelist){
    $scope.commerciallist= response.commerciallist;
        
    $scope.programe= response.Schedulelist;
    $scope.mediafilename = $scope.programe['0'].Media.filename;
    $scope.mediaimage = $scope.programe['0'].Media.image
    $scope.nowplaying = $scope.programe['0'].Media.name;
    $scope.clientid = response.ClientId;
    
    if($scope.mediaimage){
     $scope.videoimage = "http://www.vlifetech.com/img/media/"+$scope.mediaimage;
    }else{
     $scope.videoimage = "img/sample.png";
    }
   
    var file_ext = $scope.mediafilename.split('.').pop();
    var basename = $scope.mediafilename.replace(/\\/g,'/').replace(/.*\//, ''); 
    var basename2 = basename.split('.');
    
    if(file_ext !='m4a'){
     var finamediafilename = basename2[0]+'-ios.'+file_ext;  
    }else{
     var finamediafilename = basename2[0]+'.'+file_ext; 
    }
     
    var meidaURL = $scope.clientid+"/"+finamediafilename;
    SharedService.addSchMedia(meidaURL);
    
    
    for(var i =0;i< $scope.commerciallist.length;i++){
    var commerURL = $scope.clientid+"/"+$scope.commerciallist[i].Media.filename
    SharedService.addCommMedia(commerURL);
    }
    
    $scope.seekto = response.seekto; // time to seek current video schedule
    $scope.currentTimeMain1 = response.currentTimeMain1; 
    var Nextseekto = response.Nextseekto; // time left for next schedule
    
    if(Nextseekto > 0){ // reload page at next schedule starttime 
    setTimeout(function(){
    $state.reload();
          },Nextseekto*1000);
    }
    
          
    var commDelay = ($scope.programe['0'].Schedule.media_length)*60;
    $scope.commDelay = commDelay;
    
    
    
    SharedService.addmediaDomain("http://wpc.239F.edgecastcdn.net/00239F");
    var playerInstance = jwplayer("jwplayerelement").setup({
                file: SharedService.getmediaDomain()+"/"+SharedService.getSchMediaPath(),
                flashplayer: "lib/jwplayer-mirror/jwplayer.flash.swf",
                width: '100%',
                height:250,
                stretching: "fill",
                autostart: true
                
      });
      
            
      playerInstance.onPause(function () {
      playerInstance.play();
      })
       
    // function play commericial or schedule based upon seektime
    playerInstance.onReady(function() {
    if($scope.seekto < 60){
       angular.element(document).ready(playCommercial);
    
    }else{
       angular.element(document).ready(playSchedule);
    }
    

    });
            
    }
   
    });
   
   // function play commercial video between scheduled video 
   var playCommercial = function() {
       jwplayer("jwplayerelement").setup({
              file: SharedService.getmediaDomain()+"/"+SharedService.getCommMediaPath(),
              flashplayer: "lib/jwplayer-mirror/jwplayer.flash.swf",
              width: '100%',
              height:250,
              stretching: "fill",
              autostart: true
 
      });
      
      jwplayer("jwplayerelement").seek(0);
      
      jwplayer("jwplayerelement").onPause(function () {
      jwplayer("jwplayerelement").play();
      })
      
      jwplayer("jwplayerelement").onComplete(function() { 
        angular.element(document).ready(playSchedule);
      });
    }
    
    
    // function play scheudle video from seek point
    var playSchedule = function() {
       jwplayer("jwplayerelement").setup({
             file: SharedService.getmediaDomain()+"/"+SharedService.getSchMediaPath(),
             flashplayer: "lib/jwplayer-mirror/jwplayer.flash.swf",
             width: '100%',
             height:250,
             stretching: "fill",
             autostart: true
 
       });
       jwplayer("jwplayerelement").seek($scope.seekto);
       
       $scope.seekto = $scope.commDelay+$scope.seekto; // update seektime
       
       jwplayer("jwplayerelement").onComplete(function() { 
        angular.element(document).ready(playLastCommercial);
       })
       
       jwplayer("jwplayerelement").onPause(function () {
        jwplayer("jwplayerelement").play();
       })
       
        setTimeout(function(){
            angular.element(document).ready(playCommercial);
        },$scope.commDelay*1000);
  
    }
    
    // function play last commercial video before reload page
    var playLastCommercial = function() {
       jwplayer("jwplayerelement").setup({
              file: SharedService.getmediaDomain()+"/"+SharedService.getCommMediaPath(),
              flashplayer: "lib/jwplayer-mirror/jwplayer.flash.swf",
              width: '100%',
              height:250,
              stretching: "fill",
              autostart: true
       });
       
      jwplayer("jwplayerelement").seek(0);
      
      jwplayer("jwplayerelement").onPause(function () {
      jwplayer("jwplayerelement").play();
      })
      
      jwplayer("jwplayerelement").onComplete(function() { 
       $state.reload();
      });
      
      
    }
    
     
       
    $scope.toTimestamp = function(date) {
    
    var t = date.split(/[- :]/);
    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    return new Date(d);
   };
   
        
    
})


//  Media controller to show Archive List of selected category
.controller('MediaCtrl', function($scope,$cordovaInAppBrowser,$rootScope,$anchorScroll, $location ,$sce, $http, $state, $window, $stateParams,SharedService, Church,Auth) {

    SharedService.addmediaDomain("http://wpc.239F.edgecastcdn.net/00239F");
    $scope.$on('$ionicView.beforeLeave', function(){
           $scope.mediafileurl = '';
           $scope.mediafilename = '';
           $state.reload();
      });

  
  
    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
    Church.Detail($stateParams.churchid).then(function(response) {
    $scope.client= response;
    $scope.permissiontypes = JSON.parse("[" + response.Client.permissiontypes_id + "]");
    });
    
    $scope.gotodonation = function (donationurl) {
    window.open(donationurl, "_blank", "location=yes");
    }
    
    Church.Live($stateParams.churchid).then(function(response) {
    if(response.Liveevent){
    $scope.church= response;
    
    // define countdown 
    var countdown  = Date.parse(response.Liveevent.startdate +'T'+ response.Liveevent.start_time);
    var ctime = new Date(response.currentTime);
   
     $scope.countdownVal = 0;
     if(countdown > ctime){
     $scope.countdownVal = (countdown - ctime)/1000;
     }
     
     }else{
      $scope.countdownVal = 0;
     }
     
   
    });
    
    
    // fetech live event of slected clients  
    Church.Media($stateParams.categoryid,$stateParams.churchid).then(function(response) {
    $scope.media= response.Media;
    $scope.categoryname= response.Categoryname;
    $scope.clientid = response.ClientId;
    
    
   
      
    });
    
     
    
    $scope.play = function(categoryid,churchid,mediaid){
       $window.location='#watchmedia/'+categoryid+'/'+churchid+'/'+mediaid;
             
    }
    
       
    $scope.trimTo = function(string) {
    
    var newstring = string.replace('"', '');
    var newstring = newstring.replace('"', '');
    return newstring;
  } 
  
       
    
})
   

//  Media controller to show Archive List of selected category
.controller('WatchCtrl', function($scope,$cordovaInAppBrowser,$rootScope,$anchorScroll, $location ,$sce, $http, $state, $window, $stateParams,SharedService, Church,Auth) {

    SharedService.addmediaDomain("http://wpc.239F.edgecastcdn.net/00239F");
    $scope.$on('$ionicView.beforeLeave', function(){
           $scope.mediafileurl = '';
           $scope.mediafilename = '';
           $state.reload();
      });

  
     Church.Mediadetails($stateParams.mediaid,$stateParams.churchid).then(function(response) {
    
    //console.log(response.Media.filename);
        var file_ext = response.Media.filename.split('.').pop();
        var basename = response.Media.filename.replace(/\\/g,'/').replace(/.*\//, ''); 
        var basename2 = basename.split('.');
        
        if(file_ext !='m4a'){
         var finamediafilename = basename2[0]+'-ios.'+file_ext;  
        }else{
         var finamediafilename = basename2[0]+'.'+file_ext; 
        }
        //var finamediafilename = basename2[0]+'.'+file_ext; 
       //$scope.mediafileurl =  SharedService.getmediaDomain()+"/"+$scope.clientid+"/"+finamediafilename;
       $scope.mediafilename = response.Media.name;
       $scope.mediaid = response.Media.id;
       $scope.clientid = response.ClientId;
       //console.log($scope.clientid);
       $scope.playerInstance = jwplayer("ondemandplayer").setup({
                file: SharedService.getmediaDomain()+"/"+$scope.clientid+"/"+finamediafilename,
                width: '100%',
                height:250,
                autostart: true
                
      })
      
      $scope.playerInstance.seek(0);
    }); 
    
    $scope.play = function(categoryid,churchid,mediaid){
       $window.location='#watchmedia/'+categoryid+'/'+churchid+'/'+mediaid;
             
    }
    
    
    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
    Church.Detail($stateParams.churchid).then(function(response) {
    $scope.client= response;
    $scope.permissiontypes = JSON.parse("[" + response.Client.permissiontypes_id + "]");
    });
    
    $scope.gotodonation = function (donationurl) {
    window.open(donationurl, "_blank", "location=yes");
    }
    
    Church.Live($stateParams.churchid).then(function(response) {
    if(response.Liveevent){
    $scope.church= response;
    
    // define countdown 
    var countdown  = Date.parse(response.Liveevent.startdate +'T'+ response.Liveevent.start_time);
    var ctime = new Date(response.currentTime);
   
     $scope.countdownVal = 0;
     if(countdown > ctime){
     $scope.countdownVal = (countdown - ctime)/1000;
     }
     
     }else{
      $scope.countdownVal = 0;
     }
     
   
    });
    
    
    // fetech live event of slected clients  
    Church.Media($stateParams.categoryid,$stateParams.churchid).then(function(response) {
    $scope.media= response.Media;
    $scope.categoryname= response.Categoryname;
    $scope.clientid = response.ClientId;
   });
    
   
       
    $scope.trimTo = function(string) {
    
    var newstring = string.replace('"', '');
    var newstring = newstring.replace('"', '');
    return newstring;
  } 
  
       
    
})

//  Archive controller to show Archive List of church
.controller('ArchiveCtrl', function($scope,$cordovaInAppBrowser, $http, $state, $window, $stateParams, Church,Auth) {

    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
    
    
    Church.Detail($stateParams.churchid).then(function(response) {
    $scope.client= response;
    $scope.permissiontypes = JSON.parse("[" + response.Client.permissiontypes_id + "]");
    });
    
    $scope.gotodonation = function (donationurl) {
    window.open(donationurl, "_blank", "location=yes");
    }
    
    Church.Live($stateParams.churchid).then(function(response) {
    if(response.Liveevent){
    $scope.church= response;
    
    // define countdown 
    var countdown  = Date.parse(response.Liveevent.startdate +'T'+ response.Liveevent.start_time);
    var ctime = new Date(response.currentTime);
   
     $scope.countdownVal = 0;
     if(countdown > ctime){
     $scope.countdownVal = (countdown - ctime)/1000;
     }
     
     }else{
      $scope.countdownVal = 0;
     }
     
   
    });
    
    // fetech live event of slected clients  
    Church.Archive($stateParams.churchid).then(function(response) {
    $scope.media= response;
    console.log($scope.media);
   
    });
    
    
    $scope.gotomedia = function(media_id,client_id){
      $window.location='#media/'+media_id+'/'+client_id;
    }
       
    
})


//  live event controller to show live events scheduled 
.controller('LiveCtrl', function($scope,$cordovaInAppBrowser, $http, $state, $window, $stateParams, Church,Auth) {
   
     $scope.$on('$ionicView.beforeLeave', function(){
         $state.reload();
      });
      
    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };

    // fetech live event of slected clients  
    
    Church.Detail($stateParams.churchid).then(function(response) {
    $scope.client= response;
    $scope.permissiontypes = JSON.parse("[" + response.Client.permissiontypes_id + "]");
    });
    
    $scope.gotodonation = function (donationurl) {
    window.open(donationurl, "_blank", "location=yes");
    }
    
    
    Church.Live($stateParams.churchid).then(function(response) {
    if(response.Liveevent){
    $scope.church= response;
    $scope.livestreamurl = response.Client.iphone_event_url;
    //console.log($scope.livestreamurl);
    // define countdown 
    var countdown  = Date.parse(response.Liveevent.startdate +'T'+ response.Liveevent.start_time);
    var ctime = new Date(response.currentTime);
   
     $scope.countdownVal = 0;
     if(countdown > ctime){
     $scope.countdownVal = (countdown - ctime)/1000;
     }else{
     
     $scope.playerInstance = jwplayer("jwplayerelement").setup({
                file: $scope.livestreamurl,
                flashplayer: "lib/jwplayer-mirror/jwplayer.flash.swf",
                width: '100%',
                height:250,
                stretching: "fill",
                autostart: true
                
      });
      
      
      $scope.playerInstance.onPause(function () {
      $scope.playerInstance.play();
      })
      
      }
     }else{
      $scope.countdownVal = 0;
     }
     
     
    });
    
    
})


//  Church controller to show Church details
.controller('ChurchCtrl', function($scope,$cordovaInAppBrowser, $http,$state, $window, $stateParams, Church,Auth) {
    
    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };

    Church.Detail($stateParams.churchid).then(function(response) {
    $scope.client= response;
    $scope.permissiontypes = JSON.parse("[" + response.Client.permissiontypes_id + "]");
    });
    
    $scope.gotodonation = function (donationurl) {
    window.open(donationurl, "_blank", "location=yes");
    }
    
    //console.log(response.Client.permissiontypes_id);
    Church.Getfav($window.localStorage['user']).then(function(response) {
     $scope.favouritechannel = response;
    });
    
     
    
    $scope.gotodonation = function (donationurl) {
    window.open(donationurl, "_blank", "location=yes");
    }
    
    $scope.showMap = function (dlat,dlon) {
     var url = ""+"http://maps.google.com/?q="+dlat+","+dlon;
     window.open(url, "_blank", "location=yes");
    
    }
    
})


//  User controller to show login/logout/signup




//  UpdatepasswordCtrl controller to update user password
.controller('ForgotwasswordCtrl',
function($scope, $http, $log, $location,$window,Auth){

    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
  $scope.error = '';
  $scope.user =[];
  $scope.requestnewpassword = function(){
   
   $http({ 
    method: 'post', 
    url: 'http://www.vlifetech.com/requestnewpassword', 
    params: {
       email:$scope.user.useremail
    }

    }).success(function(response){
        $scope.error = response;
        }).error(function(error){
         $scope.error = response;
    });
   
   };
   
     
  
   
})

.controller('UserCtrl', function($scope, $state, $window, Auth) {
 
 $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
 
  $scope.gotforgotpass = function() {
            $window.location='#forgotwassword';
    };
    
       
 $scope.authorization = {
    username: '',
    password : ''   
  };
    
  $scope.signIn = function(form) {
    if(form.$valid) {
    Auth.login($scope.authorization.username,$scope.authorization.password).then(function(response) {
    if(response.User){
    Auth.setUser({
      user: response.User.id
    });
    
    $window.location='#home';
     
    }else{
    $scope.error = 'Invalid Information';
    }
     });
     
   
    }
  };

})

//  Profile controller to show/update user Profile
.controller('ProfileCtrl', function($scope,$http, $state, $window, Auth) {

   $scope.authtoken = Auth.getUser();
   $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
  
     Auth.Profile($scope.authtoken).then(function(response) {
     $scope.profile = response;
     });
     
      
     

     $scope.updateprofile = function(){
      
        $http({ 
        method: 'post', 
        url: 'http://www.vlifetech.com/updateprofile', 
        params: {
           name:$scope.profile.User.name,
           address1:$scope.profile.User.address1,
           address2:$scope.profile.User.address2,
           city:$scope.profile.User.city,
           state:$scope.profile.User.state,
           country:$scope.profile.User.country,
           zip:$scope.profile.User.zip,
           user_id:$window.localStorage['user']
        }
    
    }).success(function(response){
        if(response.User){
        $scope.profile = response;
        $scope.error = 'Please login now';
        $window.location='#login';
        }else{
        $scope.error = 'Invalid Information';
        }
        }).error(function(error){
        $scope.error = 'Invalid Information';
    });

};



})



//  RegisterCtrl controller to show/update user Profile
.controller('RegisterCtrl', function($scope,$http, $state, $window, Auth) {

   $scope.authtoken = Auth.getUser();
   $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
  
   
     
   
    $scope.profile = [];
     $scope.updateprofile = function(){
      
        $http({ 
        method: 'post', 
        url: 'http://www.vlifetech.com/updateprofile', 
        params: {
           name:$scope.profile.name,
           email:$scope.profile.email,
           password:$scope.profile.password,
           
        }
    
    }).success(function(response){
        if(response.User){
        $scope.profile = response;
        $scope.error = 'Profile Updated';
        }else{
        $scope.error = 'Invalid Information';
        }
        }).error(function(error){
        $scope.error = 'Invalid Information';
    });

};



})


//  UpdatepasswordCtrl controller to update user password
.controller('UpdatepasswordCtrl',
function($scope, $http, $log, $location,$window,Auth){

    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
    
  $scope.error = '';
  $scope.user =[];
  $scope.changepassword = function(){
   
   $http({ 
    method: 'post', 
    url: 'http://www.vlifetech.com/updatepassword', 
    params: {
       current_pass:$scope.user.oldpassword,
       password:$scope.user.password,
       confirm_password:$scope.user.confirmpassword,
       user_id:$window.localStorage['user']
    }

    }).success(function(response){
        $scope.error = response;
        }).error(function(error){
         $scope.error = response;
    });
   
   };
   
})




//  subscription controller to update user subscription
.controller('SubscriptionCtrl',
function($scope, $http, $log, $location,$window,Auth){

    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
    
  $scope.error = '';
    Auth.Profile($scope.authtoken).then(function(response) {
     $scope.profile = response;
     });
     
      
     

     $scope.updatesubscription = function(){
        $http({ 
        method: 'post', 
        url: 'http://www.vlifetech.com/subscription', 
        params: {
           archive_notification:$scope.profile.User.archive_notification,
           live_notification:$scope.profile.User.live_notification,
           user_id:$window.localStorage['user']
        }
    
    }).success(function(response){
        if(response.User){
        $scope.profile = response;
        $scope.error = 'Profile Updated';
        }else{
        $scope.error = 'Invalid Information';
        }
        }).error(function(error){
        $scope.error = 'Invalid Information';
    });

};
   
})

//  LogoutCtrl controller to logout user
.controller('LogoutCtrl',function($scope,$state, $http, $log, $location, $window ,Auth){
   Auth.logout();
   $window.location='#home';
})


//  MfavoritesCtrl controller to manage favourite
.controller('MfavoritesCtrl', function($scope, $http, $window, Church, Auth) {

    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
    
    
    $scope.appaddtoav = function(client_id,action){
    if(action == true){
    action = "remove";
    }else{
    action = "add";
    }
    
      Church.Addfav(client_id,action).then(function(response) {
       $scope.favouritechannel = response;
       console.log(response);
      });
    }
    //console.log($scope.authtoken);
    Church.List().then(function(response) {
      $scope.allchurch = response;
    });
    
    Church.Getfav($window.localStorage['user']).then(function(response) {
     $scope.favouritechannel = response;
     //console.log(response);
    });
    
    
  
})


//  HomeCtrl controller to list all church order by live events schedules
.controller('HomeCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaLocalNotification, $http, $window, Church, Auth) {

    $ionicPlatform.ready(function () {
    
    $scope.scheduleSingleNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        data: {
          customProperty: 'custom value'
        }
      }).then(function (result) {
        // ...
      });
    };
    
    
    $rootScope.$on('$cordovaLocalNotification:schedule',
    function (event, notification, state) {
      // ...
    });



    
    });
     
     
    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
    $scope.gotochurch = function(client_id){
      $window.location='#church/'+client_id;
    }
    
    
    $scope.appaddtoav = function(client_id,action){
      Church.Addfav(client_id,action).then(function(response) {
       $scope.favouritechannel = response;
       console.log(response);
      });
    }
    //console.log($scope.authtoken);
    Church.List().then(function(response) {
      $scope.allchurch = response;
    });
    
    Church.Getfav($window.localStorage['user']).then(function(response) {
     $scope.favouritechannel = response;
     //console.log(response);
    });
    
    
    var geoSettings = {
        frequency: 1000,
        timeout: 60000,
        enableHighAccuracy: false // may cause errors if true
    };

    navigator.geolocation.getCurrentPosition(success, error, geoSettings);
    
    function success(position) {
        var latitude =  position.coords.latitude;
        var longitude =  position.coords.longitude;
        Church.Bylocation(latitude,longitude).then(function(response) {
               if(response!= null){
                $scope.locationchannel = response;
            }
              
            });
    }
    
    function error(error) {
            alert('Cant access your location');
    }




    $scope.bylocation = false;
    $scope.favourite = false;
    $scope.denomination = true;
    
    
    $scope.toggleListfav = function() {
            $scope.favourite =true;
            $scope.denomination = false;        
            $scope.bylocation = false;
           
    };
    
    $scope.toggleListden = function() {
            $scope.denomination =true;
            $scope.favourite = false;
            $scope.bylocation = false;
    };
    
    $scope.togglebylocation = function() {
            $scope.denomination =false;
            $scope.favourite = false;
            $scope.bylocation = true;
            
    };  
  
})


//  GuesthomeCtrl controller to list all church order by live events schedules for guest userd(not loggedin)
.controller('GuesthomeCtrl', function($scope, $rootScope, $ionicUser, $ionicPush,$cordovaGeolocation, $http, $window, Church, Auth) {


    $scope.authtoken = Auth.getUser();
    $scope.hideheadermenu = true;
    $scope.isAutoScroll = false;
    $scope.headermenushow = function() {
            $scope.headermenu =true;
            $scope.hideheadermenu = false;
            $scope.isAutoScroll =true;
    };
    $scope.headermenuhide = function() {
            $scope.headermenu =false;
            $scope.hideheadermenu = true;
            $scope.isAutoScroll =false;
    };
    
    
    Church.List().then(function(response) {
    $scope.allchurch = response;
    });
    
  
    var geoSettings = {
        frequency: 1000,
        timeout: 60000,
        enableHighAccuracy: false // may cause errors if true
    };

    navigator.geolocation.getCurrentPosition(success, error, geoSettings);
    
    function success(position) {
        var latitude =  position.coords.latitude;
        var longitude =  position.coords.longitude;
        Church.Bylocation(latitude,longitude).then(function(response) {
               if(response!= null){
                $scope.locationchannel = response;
            }
              
            });
    }
    
    function error(error) {
            alert('Cant access your location');
    }
       
    
     
    $scope.bylocation = false;
    $scope.favourite = false;
    $scope.denomination = true;
    
    $scope.gotochurch = function(client_id){
      $window.location='#church/'+client_id;
    }
    
    $scope.togglebylocation = function() {
            $scope.bylocation = true;
            $scope.denomination =false;
            $scope.favourite = false;
            
            
    };
    
    $scope.toggleListfav = function() {
            $scope.favourite =true;
            $scope.denomination = false;        
            $scope.bylocation = false;
           
    };
    $scope.toggleListden = function() {
            $scope.denomination =true;
            $scope.favourite = false;
            $scope.bylocation = false;
    };
    
     
})


.directive('scrollToTop', function(){
    return {
        restrict: 'A',
        scope: {
            trigger: '=scrollToTop'
        },
        link: function postLink(scope, elem) {
            scope.$watch('trigger', function() {
                elem[0].scrollTop = 0;
            });
        }
    };
})

.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});

