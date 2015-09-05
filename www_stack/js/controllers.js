
angular.module('starter.controllers', [])

.controller('login', function($scope,$state,Stack,$ionicPopup,$ionicLoading,$cordovaLocalNotification, $ionicPlatform) {

 /*var userLocation = 'India, Chandigarh';

    if (GBrowserIsCompatible()) {
       var geocoder = new GClientGeocoder();
       geocoder.getLocations(userLocation, function (locations) {         
          if (locations.Placemark) {
             var north = locations.Placemark[0].ExtendedData.LatLonBox.north;
             var south = locations.Placemark[0].ExtendedData.LatLonBox.south;
             var east  = locations.Placemark[0].ExtendedData.LatLonBox.east;
             var west  = locations.Placemark[0].ExtendedData.LatLonBox.west;

             var bounds = new GLatLngBounds(new GLatLng(south, west), 
                                            new GLatLng(north, east));

             var map = new GMap2(document.getElementById("map_canvas"));

             map.setCenter(bounds.getCenter(), map.getBoundsZoomLevel(bounds));
             map.addOverlay(new GMarker(bounds.getCenter()));
          }
       });
    }*/

$scope.user = {};
 $scope.fbLogin = function(){
 
 
            openFB.login(
                function (response) {
                    if (response.status === 'connected') {


                      openFB.api({
                  path: '/me',
                  params: {fields: 'id,name,picture,email'},
                  success: function (user) {
                      $scope.$apply(function () {
                          $scope.user = user;
                          
                          var username = user.email;
                          var password = user.id; 
                          var name = user.name;
                         // var image = user.data.url;
                //console.log(user.image);
                      
                      
                        Stack.fbLogin(username,password,name).then(function(response){
                         var userDetail = response.detail;
                      localStorage.setItem('usersinfo',JSON.stringify(userDetail));
                     $state.go('dashboard')
         
               });  
                      
                      


                      });
                  },
                  error: function (error) {
                      alert('Error connecting to Facebook. Did you log in?');
                  }
              });        


                      //$state.go('dashboard');
                        $scope.closeLogin();
                    } else {
                        alert('Facebook login failed');
                    }
                },
                {scope: 'email,publish_actions'});
 
 }

     $scope.signIn = function(){
      console.log($scope.user.username);
 $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: false,
	    maxWidth: 200,
	    showDelay: 500

	})
      var username = $scope.user.username;
      var password = $scope.user.password;

  


       Stack.Login(username,password).then(function(response){
    
        var login = response.data;
       
       var userDetail = response.detail;
       
       console.log(login);
       if(login == 'Sucess')
       {
         $ionicLoading.hide();
         localStorage.setItem('usersinfo',JSON.stringify(userDetail));
         $state.go('dashboard')
       
       }
       else
       {
         $ionicLoading.hide();
           var alertPopup = $ionicPopup.alert({
           title: 'Login Error',
           template: 'Please Check Your username and password'
         });
         alertPopup.then(function(res) {
           console.log('Login');
         });
      
       } 
        
  
   
        });  
  }
  
  
  $state.go('login');
  
})

.controller('register', function($scope,$state,Stack,$ionicLoading,$cordovaLocalNotification,$ionicPlatform,$cordovaCamera,$cordovaSms,$cordovaContacts) {

$cordovaContacts.find({filter: ''}).then(function(result) {
        $scope.contacts = result;
        
        alert(result);
    }, function(error) {
       alert("error");
    });


  /*$ionicPlatform.ready(function(){
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
         intent: 'INTENT' // send SMS with the native android SMS messaging
          //intent: '' // send SMS without open any other app
          //intent: 'INTENT' // send SMS inside a default SMS app
      }
    };
 
    //$scope.sendSMS = function() {
 
      $cordovaSms
        .send('7508703474', 'This is some dummy text', options)
        .then(function() {
          alert('Success');
          // Success! SMS was sent
        }, function(error) {
          alert('Error');
          // An error occurred
        });
   // }
  });
*/

/*$scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            
            localStorage.setItem('image',JSON.stringify($scope.imgURI));
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
*/
/*$scope.gallery = function() {

     var options = {
                        quality: 50,
					              targetWidth: 200,
                        targetHeight: 200,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                    };
                    $cordovaCamera.getPicture(options).then(function(imageData) 
                    {
					     				function convertImgToBase64URL(url, callback, outputFormat)
					     				  {
                              var img = new Image();
                              img.crossOrigin = 'Anonymous';
                                 img.onload = function()
                                  {
                                      var canvas = document.createElement('CANVAS'),
                                      ctx = canvas.getContext('2d'), dataURL;
                                      canvas.height = this.height;
                                      canvas.width = this.width;
                                      ctx.drawImage(this, 0, 0);
                                      dataURL = canvas.toDataURL(outputFormat);
                                      callback(dataURL);
                                      canvas = null; 
                                 };
                              img.src = url;
                           };
                         
                            convertImgToBase64URL(imageData, function(base64Img)
                            {
                           
                              $state.go($state.current, {}, {reload: true});
                              $scope.imgURI = imageData;
                              $scope.imagename = base64Img;
                              $state.go($state.current, {}, {reload: true});
                                })		
                        
                           /* }, function(err) {
                        // An error occured. Show a message to the user
                    });

                }
            });
        }, false);
                         
                         
                         
                      });

                    


}*/


$scope.user = {};

 $scope.register = function(){
 
 $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: false,
	    maxWidth: 200,
	    showDelay: 500

	})
 
   var lo = $scope.user.image;
  
 
   var fname  = $scope.user.firstname;
   var lname = $scope.user.lastname;
   var email = $scope.user.email;
   var password = $scope.user.password;
   var image = JSON.parse(localStorage.getItem('image'));
  // var image = "dsd.jpg";
   //var data = "pass=" +  pass + "&mobiles=" + mobile;
  var image = {"userImage": image};
  // console.log(image);
 
  Stack.Register(fname,lname,email,password,image).then(function(response){
  //alert("success");
  $ionicLoading.hide();
  localStorage.removeItem(image);
 
  
  
  
  
  })
  
 
 
 }
//alert("a");


//$state.go('register');
  
})

.controller('online', function($scope,$state,Stack,Rooms) {

 $scope.rooms = Rooms.all();

$scope.chat = function(id){


$state.go('startChat',{id:id});
};


})
.controller('startChat', function($scope,$state,$firebase,$stateParams,Chats) 
{

 var info = JSON.parse(localStorage.getItem('usersinfo'));
 
 console.log(info.first_name);

 var id= $stateParams.id;
 Chats.selectRoom(id);


//alert(roomName);
$scope.displayName = info.first_name;
    
        $scope.chats = Chats.all();


    $scope.sendMessage = function (msg) {
        console.log(msg);
        Chats.send($scope.displayName, msg);
      
    } 
 

})

.controller('videos', function($scope,$state,Stack) {

/*$scope.playerInstance = jwplayer("jwplayerelement").setup({
                file: 'http://www.youtube.com/watch?v=ACFwKYEC5rw',
                flashplayer: "lib/jwplayer-mirror/jwplayer.flash.swf",
                width: '100%',
                
                height:250,
                stretching: "fill",
                autostart: false
                
      });
      */
      
})

.controller('dashboard', function($scope,$state,Stack) {

$scope.videos = function(){

$state.go('videos');

};


$scope.settings = function(){



};

$scope.onlineChat = function(){

$state.go('online');





};


$scope.myModel = {
              Url: 'http://ngmodules.org/modules/ngFacebook',
              Name: "AngularJS directives for social sharing buttons - Facebook, Google+, Twitter and Pinterest | Jason Watmore's Blog", 
              ImageUrl: 'http://www.jasonwatmore.com/pics/jason.jpg'
          };






var data = {};
Stack.Questions(data).then(function(response){
 
 $scope.questions = response.data;
 
  
  //var questions = JSON.parse(response.data[0]);
  console.log($scope.questions);
  
  })

 $scope.askQuestion = function(id){
 $state.go('askQuestion',{id:id})
 
 
  }

$scope.viewDetail = function(id){
 
 
Stack.ViewQuestion(id).then(function(response){
 
$scope.detail = response.data;

angular.forEach($scope.detail, function(value, key) {

var q_id = value.id;
})

//alert(q_id);
//console.log($scope.detail[0].id);

 localStorage.setItem('questionDetail',JSON.stringify($scope.detail));
 
 $state.go('viewDetail',{id:$scope.detail[0].id});
//console.log($scope.detail);
  
  })

 
 
  }



$state.go('dashboard');
  
})
.controller('header', function($scope,$state) {
var userInfo = JSON.parse(localStorage.getItem('usersinfo'));

$scope.email = userInfo.email;
$scope.id = userInfo.id;
console.log($scope.email);

})
.controller('askQuestion', function($scope,$state,Stack,$stateParams,Stack) {
 var id= $stateParams.id;

$scope.user = {};
$scope.askQuestion = function(){

 
 var title =  $scope.user.title;
 var question =$scope.user.question;
 
 
Stack.CreateQuestion(id,title,question).then(function(response){
  
 $state.go('viewDetail',{id:response.data.id});
  
  
  })
}

//$state.go('askQuestion');


})

.controller('viewDetail', function($scope,$state,Stack,$stateParams) {


var userInfo = JSON.parse(localStorage.getItem('usersinfo'));
var userId = userInfo.id;
var ids= $stateParams.id;

Stack.AnswerDetail(userId,ids).then(function(response){
  
  $scope.answerss = response.answer;
  
  //console.log($scope.answers);
  
 //  localStorage.setItem('answers',JSON.stringify($scope.answers));
 // $state.go($state.current, {}, {reload: true});
  
  })
//$scope.answerDetail = JSON.parse(localStorage.getItem('answers'));

console.log($scope.answerDetail);

//$state.go($state.current, {}, {reload: true});
$scope.qDetail = JSON.parse(localStorage.getItem('questionDetail'));


//console.log($scope.qDetail);


$scope.user = {};
$scope.answer = function(id){

var answer = $scope.user.answer;

Stack.Answer(userId,id,answer).then(function(response){
  
  $scope.answers = response.answer;
  
  console.log($scope.answers);
  
  //localStorage.setItem('answers',JSON.stringify($scope.answers));
 $state.go($state.current, {}, {reload: true});
  
  })



}

});



