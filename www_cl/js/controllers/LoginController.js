angular.module('starter.controller', [])

/*.................... start login Controller for vendor and homeowner part.................................... */

.controller('LoginCtrl', function($scope, $state, HomeOwners, storageService, $rootScope,$ionicPopup, $ionicLoading, $cordovaToast,$ionicHistory) {

    //initialize user
    $scope.user = {};
    $scope.orginal = {};
$scope.user_response={};
   $scope.useremail={};
			$scope.userId={};
			$scope.cities_id={};
			$scope.locations_id={};
			$scope.location={};
			 $scope.longitude={};
			 $scope.latitude={};
    ////console.log(test);

   
   /*...................................... Start Login functionality  .....................................*/
    $scope.login = function() {


        //var data = "user[email]="$scope.user.email) + "&user[password]=" + $scope.user.password;

		
    var pass=$scope.user.password;
		var mobile=$scope.user.mobile;
		var data = "pass=" +  pass + "&mobiles=" + mobile;
		
		 HomeOwners.login_details(data).then(function(response) {
            console.log(response);
			$scope.user_response=response;
			if($scope.user_response.mobile_counter==1)
			{
			angular.forEach($scope.user_response.mobiles_verify_with_password, function(key, value) {
			//console.log(key); 
			$scope.useremail=key.email_id;
			$scope.userId=key.id;
			
			console.log($scope.locations_id);
			storageService.save("useremail", $scope.useremail);
			storageService.save("userId", $scope.userId);
			
			$scope.cities_id= key.city_id;
				$scope.locations_id= key.location_id;
		var locations_id=$scope.locations_id;
			var local = "locations_id=" +  locations_id;
			console.log(local);
			HomeOwners.specific_Location(local).then(function(response) {
            console.log(response);
			$scope.location=response.All_location_id;
			angular.forEach($scope.location, function(key, value) {
            $scope.longitude= key.longitude;
			$scope.latitude= key.latitude;
			
			var longi=$scope.longitude;
			var lati=	$scope.latitude;
			var longi_lati={longi:longi,lati:lati};
			console.log(longi_lati);
			storageService.save("longi_lati", longi_lati);
		//	document.location.reload()
			
			
			})
				})
			
			
			
					})
		
			$state.go("services");
			}
			
		})

      
    }
       /*...................................... End Login functionality  .....................................*/
})

/*.................... End login Controller for vendor and homeowner part.................................... */



/*.................... start signup Controller for vendor and homeowner part.................................... */

.controller('singupCtrl', function($scope, $state, HomeOwners, storageService,$rootScope,$ionicUser,$ionicPush,$ionicPopup, $ionicLoading, $cordovaToast,$ionicHistory) {

    //initialize user
    $scope.user = {};
    $scope.orginal = {};


    
    $scope.resName = {};
	$scope.cities_id={};
	$scope.useremail={};
	$scope.userId={};
	$scope.longitude={};
	$scope.latitude={};
	$scope.locationId={};
	$scope.colorId={};
    ////console.log(test);
	
	
	
	$scope.mobileverify=function(){
	var mobiles=$scope.orginal.mobile;
	var data = "mobiles=" +  mobiles 
	HomeOwners.show_mobile(data).then(function(response) {
          $scope.mobile_data=response.mobile_counter;
		  $scope.results=response.mobiles_verify_result;
		 
		  
			console.log($scope.results);
			var mobilenumber=$scope.mobile_data;
			if(mobilenumber==1)
			{
			/*document.getElementById("returning").checked = true;
			$('#withoutmobile').hide();
			$('#withmobile').show();*/
			$state.go("login");
			
			
			
			}
			
			
        });
	
	}
	
	
	 HomeOwners.show_Cities().then(function(response) {
            //console.log(response);
			$scope.city=response.All_cities;
			
        });
	
	
	$scope.setcities= function(color){
	
        $scope.colorId = color.id;
        //$scope.shade = color.shade;

        $scope.color = color.name;
		var city_id=$scope.colorId;
		console.log($scope.colorId);
		
		 HomeOwners.show_location(city_id).then(function(response) {
            console.log(response);
			$scope.location=response.All_location;
				
        });
	}
	
	
	$scope.setlocations= function(colors){
	
			$scope.locationId = colors.id;
			//$scope.shade = color.shade;

			$scope.location_name = colors.name;
			
			$scope.longitude=colors.longitude;
			$scope.latitude=colors.latitude;
			
			
		}

	
	
	

   
   /*...................................... Start signup functionality  .....................................*/
    $scope.register = function() {


    
			var user = $ionicUser.get();
     if(!user.user_id) {
     // Set your user_id here, or generate a random one.
     user.user_id = $ionicUser.generateGUID();
     };
     
     
     // Identify your user with the Ionic User Service
     $ionicUser.identify(user).then(function(){
     
//     $scope.identified = true;
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
    
     $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
         var novalid=$("#form11").valid();
	 
	 if(novalid==true)
	 {
	    var service_job=storageService.get("service_job");
	    console.log(service_job);
	
	
	var full_name=$scope.orginal.name;
	var locality=$scope.locationId;
	var city=$scope.colorId;
	var email=$scope.orginal.email;
	var mobile=$scope.orginal.mobile;
	var address=$scope.orginal.address;
	var password="123";
  var devicetoken =data.token; 
  
 // alert(devicetoken);
   //
    var data = "full_name=" +  full_name + "&locality=" + locality + "&email=" + email + "&mobile=" + mobile +"&address=" + address + "&password=" + password + "&cities=" + city +"&deviceToken="+devicetoken

        //console.log(data);

        HomeOwners.Create(data).then(function(response) {
            console.log(response);
			//console.log(response.email_id);
			
			
			var user_data = response.user_id;
	HomeOwners.user_view(user_data).then(function(usersresponse) {
	//console.log(usersresponse);
	$scope.user_response=usersresponse;
	//console.log($scope.user_response);
	angular.forEach($scope.user_response, function(key, value) {
			//console.log(key); 
			$scope.useremail=key.email_id;
			$scope.userId=key.id;
			console.log($scope.useremail);
			storageService.save("useremail", $scope.useremail);
			storageService.save("userId", $scope.userId);
			})
	
	})
			
			
			var longi=$scope.longitude;
			var lati=	$scope.latitude;
			var longi_lati={longi:longi,lati:lati};
			console.log(longi_lati);
			storageService.save("longi_lati", longi_lati);
      $state.go($state.current, {}, {reload: true});			
			$state.go("services");
			
			})
			}

    //  storageService.save("deviceToken", data.token);
     
    });
    
    


      
    }
       /*...................................... End signup functionality  .....................................*/
})

/*.................... End login Controller for vendor and homeowner part.................................... */











/*.................... start credit card submit for  homeowner part.................................... */

.controller('creditCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams) {
    $scope.orginal = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;
    $scope.max = 5;
    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = {
        'api_token': $scope.orginal.api_token
    };

    $scope.changetab = function(item) {
        $scope.tab = item;

    }

    /*=======Stripe Starts Here==========*/
    $scope.stripeToken = {};
    $scope.appointment = {};
    $scope.card = function() {

        var number = document.getElementById('number').value;
        var expiry = document.getElementById('exp').value;
        var res = expiry.split("/");
        var month = res[0];
        var year = res[1];

        var cvv = document.getElementById('cvc').value;


       /*...................................... Start Stripe functionality  .....................................*/     

        $scope.stripeCallback = function(code, result) {

           //console.log(result);
            if (result.error) {
                $scope.stripeError = result.error.message;
            } else {
                $scope.stripeToken = result.id;
            }

            var api_token = storageService.get("api_token");
            $scope.orginal.api_token = JSON.parse(api_token);
           var api_tokens=$scope.orginal.api_token;
            var data = {
                accepting_bid_id: 66
            };
            var stripeToken =$scope.stripeToken;

            //console.log(result.card.exp_month);
	var stripe_data = "number=" + number + "&exp-month=" + result.card.exp_month +  "&exp-year=" + result.card.exp_year +  "&cvc=" + cvv + "&stripeToken=" + stripeToken + "&api_token=" + $scope.orginal.api_token;
   
            HomeOwners.NewCard(stripe_data).then(function(response) {
              console.log(response);
                
			//	storageService.save("bid_accpt_id",response.bid.id);
				
                
                $state.go('main');
            })
        };



    }


    /*=========Stripe Ends Here===========*/



    $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }



})


/*.................... End credit card submit for  homeowner part.................................... */



/*.................... start  No Appointment page for  homeowner part.................................... */

.controller('NoAppointmentCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams) {

    $scope.orginal = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;
    $scope.max = 5;
    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = {
        'api_token': $scope.orginal.api_token
    };

       /*...................................... Start changetab functionality  .....................................*/     
    $scope.changetab = function(item) {
        $scope.tab = item;

    }

       /*...................................... End changetab functionality  .....................................*/    
    $scope.gotourl = function(url) {
        // alert(url);
        $state.go(url);

    }
    
    
       /* $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };
		
		   
		

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }*/
	
	
	
    
})


/*.................... End  No Appointment page for  homeowner part.................................... */


/*.................... start  Main page shown controller for  homeowner part.................................... */

.controller('MainCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams,$ionicHistory) {

    $scope.orginal = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;
    $scope.max = 5;
    $ionicHistory.clearCache();
    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];
    var api_token = storageService.get("api_token");
    var bid_id=JSON.parse(storageService.get("bid_accpt_id"));
    
    
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = {
        'api_token': $scope.orginal.api_token,
        'bid_id'	:bid_id
    };
    
     /*...................................... Start BidAccept Service  .....................................*/    
	 HomeOwners.BidAccept(data).then(function(response) {

				$scope.new_appointment=JSON.parse(response.new_appointment);
                //console.log(response);
                
             //   $state.go('main');


            })
    /*...................................... End  BidAccept Service  .....................................*/
  
    $scope.gotourl = function(url) {
        // alert(url);
        $state.go(url);

    }


   /* $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }*/
	




})


/*....................  End  Main page shown controller for  homeowner part.................................... */


/*....................  Start Lawn Cut controller for  homeowner part.................................... */

.controller('LawnCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams) {

    $scope.orginal = {};
    $scope.completed = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;
    $scope.max = 5;
    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = {
        'api_token': $scope.orginal.api_token
    };

    
    $scope.gotourl = function(url) {

        $state.go(url);
    }

    $scope.completed = JSON.parse(storageService.get("completed"));
  console.log($scope.completed);
    $scope.completed_appointment = JSON.parse($scope.completed.completed_appointment);


   /* $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }*/
	
	 
	

})
/*....................  End Lawn Cut controller for  homeowner part.................................... */


/*....................  Start Specific Dates controller for  homeowner part.................................... */
.controller('SpecificCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams,$filter,$ionicHistory) {
 
    $scope.full_month = {};
    $scope.schedule={};
    $scope.full_app = {};
    $scope.full_app_new_date = {};
    $scope.orginal={};
    $scope.allAppointments_specific_dates = {};
    var new_date = [];
    var daysets  = [];
    var Specific_new_date = [];
    var app_dates;
    var new_dates = [];
    var next_dates;
    var appointment_date = [];
    var new_daysets = [];
    var all_dates = [];
    $scope.myNumber = 10;
    
    $scope.gotourl = function(url) {
        // alert(url);
        $state.go(url);
 
    }
 
    var upcoming_appointment = storageService.get("upcoming_appointment");
    $scope.allAppointments_specific_dates = JSON.parse(upcoming_appointment);
 
    angular.forEach($scope.allAppointments_specific_dates, function(key, value) {
 
        var app_dates = new Date(key.service_date);
        //  alert(id);
        appointment_date.push(app_dates);
 
 
    })
 
 
    $scope.full_app = new_date;
    //$scope.full_app_new_date=new_dates;
    $scope.full_month = daysets;
    //console.log($scope.full_app);
 
 
$scope.getNumber = function(num) {
     
       return new Array(num);   
       
 
    }
 
$scope.check_dates=function(index)
{
    ////console.log(dates);
     var first_dates = [];
     var full_Upcoming_wk = [];
     all_dates = [];
     Specific_new_date = [];
     //console.log($scope.schedule);
    
     angular.forEach($scope.schedule, function(key, value) {
        //console.log(key);
        if(value==='dates_'+index)
          {   
             first_dates.push($filter('date')(key, "yyyy-MM-dd"));
          }         
          else
          {
               ////console.log(dates); 
               all_dates.push($filter('date')(key, "yyyy-MM-dd"));
              
                var current_date=$filter('date')(key, "yyyy-MM-dd");
                
                var current_date1 = new Date(current_date);
                
                var current_date_year = current_date1.getFullYear();
                var current_date_month = current_date1.getMonth();
                var current_date_date = current_date1.getDate();
              
               for (var i = 0; i < 6; i++) {
                var wk_first_date = new Date(current_date_year, current_date_month, current_date_date + i);
                var wk_first_dates = new Date(current_date_year, current_date_month, current_date_date - i);
                // //console.log(day);
               var new_current_date=$filter('date')(wk_first_date, "yyyy-MM-dd");
                var new_current_dates=$filter('date')(wk_first_dates, "yyyy-MM-dd");
             
                Specific_new_date.push(new_current_date);
                Specific_new_date.push(new_current_dates);
            
          }
       }  
      });
      
      console.log(Specific_new_date);
      
      
      var todays_dates = new Date();
      var new_todays_dates=$filter('date')(todays_dates, "yyyy-MM-dd");

      //check if selected date match to today' date
      if(first_dates.indexOf(new_todays_dates) !== -1)
      {
          $scope.schedule['dates_'+index]='';
          var alertPopup = $ionicPopup.alert({     
               template: 'you can\'t  select today\'s date'
          });
           alertPopup.then(function(res) {
             ////console.log('Thank you for not eating my delicious ice cream cone');
           });
     }
     else
     {
         //if date does not match
         //console.log(all_dates);
         var new_dates = $filter('date')($scope.schedule['dates_'+index], "yyyy-MM-dd");
         
         if(all_dates.length > 1)
         {
            //if date matched from previously added dates 
           if(all_dates.indexOf(new_dates)!==-1)
                 {
                      //console.log("yes");
                   $scope.schedule['dates_'+index]='';
                   var alertPopup = $ionicPopup.alert({
                             template: 'Date already selected'
                           });
                   alertPopup.then(function(res) {
                    
                   });
 
     }
     else
     {

         var new_coming_dates=$filter('date')($scope.schedule['dates_'+index], "yyyy-MM-dd");
         // check if date comes in b/w 6 days
         if(Specific_new_date.indexOf(new_coming_dates)!==-1)
         {
              //console.log("yes");
             $scope.schedule['dates_'+index]='';
                var alertPopup = $ionicPopup.alert({
                template: 'Can\'t select two dates in a week'
               });
             alertPopup.then(function(res) {
                 ////console.log('Thank you for not eating my delicious ice cream cone');
               });
     
        }
     
      }
     
     }
     
  }
     
}    
    
$scope.schedule_data=function()
{
      var api_token = storageService.get("api_token");
        $scope.orginal.api_token = JSON.parse(api_token);
        var api_tokens = $scope.orginal.api_token;
    //console.log($scope.schedule);
    //console.log(api_tokens);
      var dates = [];
     
     angular.forEach($scope.schedule, function(key, value) {
        //console.log(key); 
        dates.push($filter('date')(key, "yyyy-MM-dd"));
      });
      var new_dates_array=dates.toString();
      var data={ "new_dates": '2016-01-12,2015-01-10' }
      
      //console.log(data); 
     
      HomeOwners.Schedule_date(data,api_tokens).then(function(response) {
 
                 
                //console.log(response);
                $ionicHistory.goBack();
             //   $state.go('main');
 
 
            })
     
}
 
 
 
  /*   $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }*/
	
 
 
}) 


/*....................  End Specific Dates controller for  homeowner part.................................... */


/*....................  Start Dispute controller for  homeowner part.................................... */

.controller('DisputeCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams) {
    $scope.orginal = {};
    $scope.disputed = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;
    $scope.max = 5;
    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = {
        'api_token': $scope.orginal.api_token
    };


    $scope.gotourl = function(url) {
        // alert(url);
        $state.go(url);
    }


    $scope.disputed = storageService.get("disputed");

    $scope.disputed_data = JSON.parse($scope.disputed);
    $scope.disputed_data_disputed_appointment = JSON.parse($scope.disputed_data.disputed_appointment);
    //console.log($scope.disputed_data);



    $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }

})


/*....................  End Dispute  controller for  homeowner part.................................... */


/*....................  Start DisputeImage controller for  homeowner part when open the completed appointment after login.................................... */
.controller('DisputeImageCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams, $cordovaCamera, $cordovaActionSheet) {

    $scope.orginal = {};
    $scope.disputed = {};
    $scope.tab = 'first';
    $scope.disputeId = {};
	//$scope.imgURI={};
	$scope.imgURl={};

    $scope.disputeId = $stateParams.disputeId;

 /*...................................... Start Camera Plugin  .....................................*/
    $scope.Picture = function() {

        var options = {
            title: 'Choose Option',
            buttonLabels: ['Take Picture', 'Upload From Gallery'],
            addCancelButtonWithLabel: 'Cancel',
            androidEnableCancelButton: true,
            winphoneEnableCancelButton: true

        };

        document.addEventListener("deviceready", function() {

            $cordovaActionSheet.show(options)
                .then(function(btnIndex) {
                var index = btnIndex;
                //console.log(index);
                if (index === 1) {
                    var options = {
                        quality: 75,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 300,
                        targetHeight: 300,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: false
                    };

                    $cordovaCamera.getPicture(options).then(function(imageData) {
                        //console.log(imageData);
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
						$scope.imgURL = "data:image/jpeg;base64," + imageData;
                    }, function(err) {

                    });

                } else if (index === 2) {
                    var options = {
                        quality: 50,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                    };
                    $cordovaCamera.getPicture(options).then(function(imageData) {
                        //console.log(imageData);
						
						
						function convertImgToBase64URL(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
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
}

convertImgToBase64URL(imageData, function(base64Img){
console.log(base64Img);

 $scope.imgURL = base64Img;
 $scope.imgURI = imageData;                        
    // Base64DataURL
})					
							
							
							
						
						
						
						
						
						
                       

                    }, function(err) {
                        // An error occured. Show a message to the user
                    });

                }
            });
        }, false);
    }
 /*...................................... End Camera Plugin  .....................................*/
 
  /*...................................... Start Submit Dispute functionality  .....................................*/
    $scope.dispute_submit = function() {

        $scope.disputeId = $stateParams.disputeId;
        var id = $scope.disputeId;
        var api_token = storageService.get("api_token");
        $scope.orginal.api_token = JSON.parse(api_token);
        var api_tokens = $scope.orginal.api_token;
        var image = $scope.imgURL;
        var descrip = document.getElementById("descrip").value;
        var data = "image=" + encodeURIComponent(image) + "&description=" + descrip;

        HomeOwners.submit_dispute(data, api_tokens, id).then(function(response) {
            //console.log(response);
            $state.go("cut_in_dispute");

        });

    }

 /*...................................... End Submit Dispute functionality  .....................................*/


    $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }

})


/*....................  End DisputeImage controller for  homeowner part when open the completed appointment after login.................................... */


/*....................  Start Logout Controller.................................... */


/*....................  End Logout Controller.................................... */

/*....................  start Bc Controller.................................... */

.controller('BcCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams) {

    $scope.orginal = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;
    $scope.max = 5;
    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = {
        'api_token': $scope.orginal.api_token
    };
 /*...................................... Start changetab functionality  .....................................*/
    $scope.changetab = function(item) {
        $scope.tab = item;

    }
 /*...................................... End changetab functionality  .....................................*/
    $scope.gotourl = function(url) {
        // alert(url);
        $state.go(url);
    }


   /* $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }*/
	


})



/*....................  End Bc Controller.................................... */



/*....................  start Appointment Controller.................................... */
.controller('AppointmentCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams,$ionicModal) {

    $scope.orginal = {};
    $scope.allAppointments = {};
    var daysets = [];
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;
    $scope.max = 5;
    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = {
        'api_token': $scope.orginal.api_token
    };


    var upcoming_appointment = storageService.get("upcoming_appointment");
    $scope.allAppointments = JSON.parse(upcoming_appointment);


    ////console.log($scope.allAppointments);
 /*...................................... Start moveslider functionality  .....................................*/
    $scope.moveslider = function(scrollnumber) {
        var scrollnumber = scrollnumber;
        var scrollnumbers = scrollnumber * 100 - 100;
        var scroll = $scope.scroll_data + 100;
        if (scroll <= scrollnumbers) {
            var position = $ionicScrollDelegate.$getByHandle('small').getScrollPosition();
            //console.log(position);

            $ionicScrollDelegate.$getByHandle('small').scrollTo(0, scroll);
            $scope.scroll_data = scroll;
        }
    }
 /*...................................... End moveslider functionality  .....................................*/
    $scope.gotourl = function(url) {
        // alert(url);
        $state.go(url);

    }
    


    /*$scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }*/
	
})

/*....................  End Appointment Controller.................................... */


/*....................  start GreenpalCtrl Controller.................................... */

.controller('GreenpalCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams,$cordovaEmailComposer,$cordovaSms) {

    $scope.orginal = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;
    $scope.max = 5;
    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = {
        'api_token': $scope.orginal.api_token
    };

	  /*...................................... Start call function plugin  .....................................*/
    $scope.call = function(phonenumber) {

	var telphone='tel:+91';
	var telephone_number=telphone+phonenumber;

    navigator.app.loadUrl(telephone_number, {
            openExternal: true
        });

    }

   /*...................................... End call function plugin  .....................................*/
   
   /*...................................... Start email function plugin  .....................................*/
    $scope.email = function(email_id) {
		
        $cordovaEmailComposer.isAvailable().then(function() {
            // is available
        }, function() {
            // not available
        });

        var email = {
            to: email_id,
            subject: 'Greenpal',
            body: 'How are you? Nice greetings from Greenpal',
            isHtml: true
        };

        $cordovaEmailComposer.open(email).then(null, function() {
            // user cancelled email
        });


    }

   /*...................................... End email function plugin  .....................................*/
   
   /*...................................... Start SMS function plugin  .....................................*/   
    $scope.sms = function(phonenumber) {

        document.addEventListener("deviceready", function() {

            var options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                android: {
                    intent: 'INTENT' // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
                }
            };

            $cordovaSms.send(phonenumber, 'SMS content', options)
                .then(function() {
                // Success! SMS was sent
            }, function(error) {
                // An error occurred
            });

        });
    }

	
	
    $scope.changetab = function(item) {
        $scope.tab = item;

    }

    $scope.gotourl = function(url) {
        // alert(url);
        $state.go(url);
    }


    /*$scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }*/
	



})

/*....................  End GreenpalCtrl Controller.................................... */


/*....................  start Dashboard Controller.................................... */

.controller('DashCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService) {

    $scope.orginal = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;

    $scope.max = 5;

    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];


    $scope.changetab = function(item) {
        $scope.tab = item;
    }
 

    $scope.gotourl = function(url) {
        // alert(url);
        $state.go(url);

    }

    //scroll
 /*...................................... Start moveslider functionality  .....................................*/ 
    $scope.moveslider = function(scrollnumber) {
        var scrollnumber = scrollnumber;
        var scrollnumbers = scrollnumber * 100 - 200;
        var scroll = $scope.scroll_data + 100;
        if (scroll <= scrollnumbers) {
            var position = $ionicScrollDelegate.$getByHandle('small').getScrollPosition();
            //console.log(position);

            $ionicScrollDelegate.$getByHandle('small').scrollTo(0, scroll);
            $scope.scroll_data = scroll;
        }
    }
 /*...................................... End moveslider functionality  .....................................*/ 
 
    /* $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }*/
	
 
})

/*....................  End Dashboard Controller.................................... */


/*....................  start New Auction Controller.................................... */

.controller('NewAucCtrl', function($scope, $state, $http, HomeOwners, storageService, $filter) {

	$scope.orginal = {};
    $scope.photos = [];
    $scope.dates = {};
    $scope.resName = {};
	$scope.cities_id={};
    $scope.note = {};
    $scope.date_change = {};
	$scope.longitude={};
	$scope.latitude={};
	$scope.locationId={};
	$scope.colorId={};
	var date_factor;
	
	var service_job=storageService.get("service_job");
	console.log(service_job);
	
	var userId=storageService.get("userId");
	var useremail=storageService.get("useremail");
	
	if(userId!=null && useremail!=null)
	{
	
	
		var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();
        var date = today.getDate();
        var wk_regular = new Date(year, month, date);
        $scope.dates = wk_regular;
     //   console.log($scope.dates);
        for (var i = 0; i < 30; i++) {
            var wk_first = new Date(year, month, date + i);
            // console.log(day);
            var new_date_format_wk_first = wk_first.getDate() + '-' + wk_first.getMonth() + '-' + wk_first.getFullYear();

            $scope.photos.push(wk_first);


			
			
			

        }

		$scope.selectedIndex = 1;

    $scope.itemClickeds = function($index, data) {
      //  console.log($index);
        $scope.selectedIndex = $index;

        $scope.date_change = $filter('date')(data, "MMMM dd , yyyy");
		 
        console.log($scope.date_change);
    }
	
	
	
		
	
	$("#form22").show();
	$("#form2").hide();
	$scope.gotonext=function(){
	
	var date_factor=JSON.stringify($scope.date_change);
			console.log(date_factor);
			if(date_factor=='{}')
			{
			var today1 = new Date();
        
		var date_factor= $filter('date')(today1, "MMMM dd , yyyy");
		$scope.date_change=date_factor;
		
			}
			var date=$scope.date_change;
			var userId=storageService.get("userId");
			var id=userId;
		
			var times=$('input[name="AppointmentTimeSlots"]:checked').val();
			
			var new_data={date:date,id:id,timing:times};
			storageService.save("new_auction_data",new_data);

	
	
	
	$state.go("my_bids");

	}
	
	}
	else
	{
	$("#form22").hide();
	$("#form2").show();
	
	$scope.checkproprty=function(){
	if(document.getElementById("returning").checked)
	{
	document.getElementById("returning").checked = true;
			$('#withoutmobile').hide();
			$('#withmobile').show();
	}
	else
	{
	document.getElementById("returning").checked = false;
			$('#withmobile').hide();
			$('#withoutmobile').show();

	}
	}
	$scope.mobileverify=function(){
	var mobiles=$scope.orginal.mobile;
	var data = "mobiles=" +  mobiles 
	HomeOwners.show_mobile(data).then(function(response) {
          $scope.mobile_data=response.mobile_counter;
		  $scope.results=response.mobiles_verify_result;
		 
		  
			console.log($scope.results);
			var mobilenumber=$scope.mobile_data;
			if(mobilenumber==1)
			{
			document.getElementById("returning").checked = true;
			$('#withoutmobile').hide();
			$('#withmobile').show();
			
			
			}
			else
			{
			document.getElementById("returning").checked = false;
			$('#withmobile').hide();
			$('#withoutmobile').show();
			
			}
			
        });
	
	}
     
	 HomeOwners.show_Cities().then(function(response) {
            //console.log(response);
			$scope.city=response.All_cities;
			
        });
	
	
	$scope.setcities= function(color){
	
        $scope.colorId = color.id;
        //$scope.shade = color.shade;

        $scope.color = color.name;
		var city_id=$scope.colorId;
		console.log($scope.colorId);
		
		 HomeOwners.show_location(city_id).then(function(response) {
            console.log(response);
			$scope.location=response.All_location;
				
        });
	}
	
	
	$scope.setlocations= function(colors){
	
			$scope.locationId = colors.id;
			//$scope.shade = color.shade;

			$scope.location_name = colors.name;
			
			$scope.longitude=colors.longitude;
			$scope.latitude=colors.latitude;
			
			
		}

		var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();
        var date = today.getDate();
        var wk_regular = new Date(year, month, date);
        $scope.dates = wk_regular;
     //   console.log($scope.dates);
        for (var i = 0; i < 30; i++) {
            var wk_first = new Date(year, month, date + i);
            // console.log(day);
            var new_date_format_wk_first = wk_first.getDate() + '-' + wk_first.getMonth() + '-' + wk_first.getFullYear();

            $scope.photos.push(wk_first);

        }

		$scope.selectedIndex = 1;

    $scope.itemClicked = function($index, data) {
      //  console.log($index);
        $scope.selectedIndex = $index;

        $scope.date_change = $filter('date')(data, "MMMM dd , yyyy");
		 
        console.log($scope.date_change);
    }
	
	
	$scope.Login_auction = function() {
	var novalid=$("#form2").valid();
	 
	 if(novalid==true)
	 {
		var pass=$scope.orginal.password;
		var mobile=$scope.orginal.mobile;
		var data = "pass=" +  pass + "&mobiles=" + mobile;
		
		 HomeOwners.login_details(data).then(function(response) {
            console.log(response);
			
			$scope.new_results=response.mobiles_verify_with_password;
			angular.forEach($scope.new_results, function(key, value) {
            $scope.cities_id= key.city_id;
			$scope.locations_id= key.location_id;
			$scope.users_id= key.id;
			console.log($scope.locations_id);
			})
			var locations_id=$scope.locations_id;
			var local = "locations_id=" +  locations_id;
			console.log(local);
			HomeOwners.specific_Location(local).then(function(response) {
            console.log(response);
			$scope.location=response.All_location_id;
			angular.forEach($scope.location, function(key, value) {
            $scope.longitude= key.longitude;
			$scope.latitude= key.latitude;
			
			
			
			});
			console.log($scope.longitude);
				var date_factor=JSON.stringify($scope.date_change);
			console.log(date_factor);
			if(date_factor=='{}')
			{
			var today1 = new Date();
        
		var date_factor= $filter('date')(today1, "MMMM dd , yyyy");
		$scope.date_change=date_factor;
		
			}
			var date=$scope.date_change;
			var id=$scope.users_id
			var times=$('input[name="AppointmentTimeSlot"]:checked').val();
			var new_data={date:date,id:id,timing:times};
			storageService.save("new_auction_data",new_data);
			var longi=$scope.longitude;
			var lati=	$scope.latitude;
			var longi_lati={longi:longi,lati:lati};
			console.log(longi_lati);
			storageService.save("longi_lati", longi_lati);
			$state.go("my_bids");


			});
				
								
        });
					
		}
		
	}	

	$scope.create_auction = function() {
	var novalid=$("#form2").valid();
	 
	 if(novalid==true)
	 {
	var service_job=storageService.get("service_job");
	console.log(service_job);
	
	
	var full_name=$scope.orginal.name;
	var locality=$scope.locationId;
	var city=$scope.colorId;
	var email=$scope.orginal.email;
	var mobile=$scope.orginal.mobile;
	var address=$scope.orginal.address;
	var password="123";
	
    var data = "full_name=" +  full_name + "&locality=" + locality + "&email=" + email + "&mobile=" + mobile +"&address=" + address + "&password=" + password + "&cities=" + city;

        //console.log(data);

        HomeOwners.Create(data).then(function(response) {
            console.log(response.user_id);
			console.log(response.email);
			//$state.go("my_bids");
			var date_factor=JSON.stringify($scope.date_change);
			console.log(date_factor);
			if(date_factor=='{}')
			{
			var today1 = new Date();
        
		var date_factor= $filter('date')(today1, "MMMM dd , yyyy");
		$scope.date_change=date_factor;
		
			}
			var date=$scope.date_change;
			var id=response.user_id;
			var times=$('input[name="AppointmentTimeSlot"]:checked').val();
			var new_data={date:date,id:id,timing:times};
			storageService.save("new_auction_data",new_data);
			var longi=$scope.longitude;
			var lati=	$scope.latitude;
			var longi_lati={longi:longi,lati:lati};
			console.log(longi_lati);
			storageService.save("longi_lati", longi_lati);
			
			
			
			$state.go("my_bids");
        });
	}
	
	}

}
})

/*....................  End New Auction Controller.................................... */

/*....................  start about Controller.................................... */

.controller('aboutCtrl', function($scope, $state, $http, HomeOwners,storageService) {

$scope.images=[];
var image1="http://weiman.com/Weiman/files/ed/ed754062-df49-4b63-9f66-776eeddafe7c.jpg";
			var image2="https://www.daimer.com/data/Image/hard-surface-cleaner-xtreme-power-13000.jpg";
			var image3="http://www.onegoodthingbyjillee.com/wp-content/uploads/2012/03/bathroom-cleaner-4.jpg";
			var image4="http://cleaningday.co.uk/wp-content/uploads/2015/06/SB_steps_cleaner_bathroom.jpg";
			var image5="http://tristarmaintenance.com/wp-content/uploads/2013/03/bathroom.jpeg";
			$scope.images.push(image1);
			$scope.images.push(image2);
			$scope.images.push(image3);
			$scope.images.push(image4);
			$scope.images.push(image5);
			
			


})
/*....................  End about Controller.................................... */


/*....................  start profile Controller.................................... */

.controller('profileCtrl', function($scope, $state, $http, HomeOwners,storageService) {
$scope.orginal = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
	 $scope.gotourl = function(url) {
       
        $state.go(url);

    }
	
	 
	


})
/*....................  End profile Controller.................................... */


/*....................  start Edit Information Controller.................................... */

.controller('informationCtrl', function($scope, $state, $http, HomeOwners,storageService) {
$scope.orginal = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;


})
/*....................  End Edit Information Controller.................................... */



/*....................  start Change Password Controller.................................... */

.controller('passwordCtrl', function($scope, $state, $http, HomeOwners,storageService) {
$scope.orginal = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;


})
/*....................  End Change Password Controller.................................... */


.controller('MyCtrl', function($scope, $state, $http, HomeOwners,storageService) {


$scope.logout = function() {

			storageService.clearAll();
			$state.go("services");
			}

})


.controller('ResetCtrl', function($scope, $state, $http, HomeOwners) {

})

.controller('powerCtrl', function($scope, $state, $http,HomeOwners,storageService,$ionicPopover,$rootScope, $ionicPlatform, $cordovaLocalNotification,$ionicHistory) {



//$scope.headerButtons = 'true';
	 $scope.userId={};
	 $scope.useremail={};
	 $scope.userId=storageService.get("userId");
	 $scope.useremail=storageService.get("useremail");

	 
	 $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
 
    $scope.popover = popover;
     /*var stopListening = $scope.$on('popover.hidden', function() {
          stopListening();
          popover.remove();
        });*/
	
  });
  
  /*======Jobs Code Starts here========*/
   
    
   
     $scope.jobs = function() {
     
      $scope.popover.hide();
     $state.go('jobs');
     
     
     }

  /*====== Jobs Code Starts here========*/
  
  

  $scope.logout = function() {

  //alert("here");
			storageService.clearAll();
			 $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
		
			  $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });	
			 $scope.popover.hide();
			// $scope.refreshItems();
		//	document.location.reload()
			$state.go('services', {}, {reload: true})
			   
			}
			
	  $scope.profile = function() {

			 $scope.popover.hide();
			$state.go("profile");
			}
			
			
			
			

})
/*==========Jobs Controllere Starts here=========*/
.controller('JobsCtrl', function($scope, $state, $http,HomeOwners,storageService,$ionicPopover,$rootScope, $ionicPlatform, $cordovaLocalNotification)
{

 var userId=JSON.parse(storageService.get("userId"));
      
       var data = "id=" +  userId;
      HomeOwners.jobs(data).then(function(response) {
        $scope.allJobs = response.All_appointment;
        console.log(response.All_appointment);
        
        })

      $scope.detailJob = function(id) {
 
      $state.go('detailJob',{id:id});
      

 
 }


})

/*==========Jobs Controllere Starts here=========*/

/*==========DetailJob Controllere Starts here=========*/
.controller('detailJobCtrl', function($scope, $ionicPopover,$stateParams,HomeOwners) {
 $scope.id = $stateParams.id;
 
 var data = "id=" +$scope.id;
 
 HomeOwners.detailJob(data).then(function(response) {
       console.log(response.All_appointment_specfic_data);
       
       $scope.date = response.All_appointment_specfic_data[0].appointment_date;
       
       var str = $scope.date;
       var res = str.split(",");
       $scope.newDate = res[0];
       $scope.year = res[1];
       $scope.jobDetail = response.All_appointment_specfic_data[0];
        })




})
/*==========DetailJob Controllere Starts here=========*/


/*=========PopOver Controller starts here==========*/
.controller('PopoverNewCtrl', function($scope, $ionicPopover) {
  $ionicPopover.fromTemplateUrl('templates/popoverNew.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
    /* var stopListening = $scope.$on('popover.hidden', function() {
          stopListening();
          popover.remove();
        });*/
      
   // $scope.message = 'cheers';
  });
})
/*=========PopOver Controller Ends here==========*/


//rating controller 
.controller('RatingCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams) {
    $scope.orginal = {};
    $scope.new_rating = {};
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var api_tokens = $scope.orginal.api_token;

    var approveId = $stateParams.approveId;
	
	
        var data = {
            'api_token': api_tokens
        };
	 HomeOwners.review_company_name(approveId,data).then(function(response) {
            console.log(response);
			$scope.company_name=response.company_name;
           
        });

	
    $scope.tab = 'first';
    $scope.rate = -1;
    $scope.max = 5;
    $scope.appointment_review = {};

    $scope.saveRatingToServer = function(rating) {
        $scope.new_rating = rating;
    };

 /*...................................... Start review functionality  .....................................*/ 
    $scope.review = function() {
        var new_rating = $scope.new_rating;
        var data = "appointment_review[rating]=" + new_rating + "&appointment_review[text]=" + $scope.appointment_review.comments + "&api_token=" + $scope.orginal.api_token;
        //alert(data);

        HomeOwners.reviewer(data, api_tokens, approveId).then(function(response) {
            //console.log(response);
        });

    }

/*...................................... End review functionality  .....................................*/ 

    /*$scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }

 $scope.logout = function() {
			storageService.clearAll();
			$state.go("services");
			}*/

})

/*....................  End RatingCtrl Controller.................................... */


/*.................... Start Services show for  homeowner part.................................... */

.controller('ServicesCtrl', function($scope, $state, $http, HomeOwners, storageService, $stateParams,$ionicHistory) {



    $scope.orginal = {};
	 $ionicHistory.clearCache();
	 $scope.userId={};
	 $scope.userId=storageService.get("userId");
	 
	 HomeOwners.show_services().then(function(response) {
	 //console.log("nishant");
          //  console.log(response.All_services);
		$scope.services_data=response.All_services;
           console.log($scope.services_data);
		   console.log(response);
        });
		
		
		
	})

/*.................... End Services show for  homeowner part.................................... */



/*.................... Start job show for  homeowner part.................................... */

.controller('jobCtrl', function($scope, $state, $http, HomeOwners, storageService, $stateParams) {
    $scope.orginal = {};
	$scope.colorId={};
	$scope.color={};
	var serviceId=$stateParams.serviceId;
	//alert(serviceId);
	
	HomeOwners.show_specific_service_job(serviceId).then(function(response) {
	 //console.log("nishant");
          //  console.log(response.All_services);
		//$scope.services_data=response.All_services;
         //  console.log($scope.services_data);
		   console.log(response);
		   
	$scope.jobs = response.specific_service_job;
	 $scope.jobs.push({ name: 'Others',id:'0'});
        });
    $scope.setJobs= function(color){
	
        $scope.colorId = color.id;
        //$scope.shade = color.shade;

        $scope.color = color.name;
		
		var Jobname=$scope.color;
		if(Jobname == 'Others')
		{
	
			document.getElementById("others_resn").style.display = "block";
         
		}
		else
		{
		
		 document.getElementById("others_resn").style.display = "none";
   		}
		
    };
	$scope.next=function(){
	 var novalid=$("#form1").valid();
	 
	
	 if(novalid==true)
	 {
	var jobtype=$scope.color;
	var note=document.getElementById("fill_name").value;
	
	if(jobtype!='Others' && note!='undefined' )
	{
		var selected_job_name='';
	}
	
	else
	{
	var selected_job_name=note;
	}
	console.log(selected_job_name);
	var comment=document.getElementById("comments").value;
	var job_id=$scope.colorId;
	var data={job_name:selected_job_name,serviceId:serviceId,jobId:job_id,comments:comment}
	console.log(data);
	storageService.save("service_job", data);
	$state.go("new_auction");
	}
	};
	
	 
	})

/*.................... End job show for  homeowner part.................................... */
/*------------------start thanku ctrl------------------------*/
.controller('thankuCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService) {

//$scope.time_chabge_button={};
//alert("nishant");
var email=storageService.get("useremail");

var uesrId=storageService.get("userId");

 $scope.$on('timer-tick', function (event, args) {
                
				if(args.millis==0)
				{
				//$scope.time_chabge_button=1;
				$("#clocker").hide();
				$("#buttoner").show();
				
				}
				
            });
			$scope.another=function()
			{
			$state.go("services");
			}
			
			
})
/*------------------end thanku ctrl------------------------*/



/*.................... start Display Current Bids for  homeowner part.................................... */

.controller('BidsCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService) {
//alert("test");
	var service_price=100;
	var longi_lati=JSON.parse(storageService.get("longi_lati"));
	var service_job=JSON.parse(storageService.get("service_job"));
	var new_auction_data=JSON.parse(storageService.get("new_auction_data"));
	
	console.log(new_auction_data);
	var lon=longi_lati.longi;
	var lat=longi_lati.lati;
	var service_id=service_job.serviceId;
	var job_id=service_job.jobId;
	
	 var data = "longitude=" +  lon + "&latitude=" + lat + "&service_id=" + service_id + "&job_id=" + job_id;

        console.log(data);

      HomeOwners.worker_near_by(data).then(function(response) {
          console.log(response);
			//$state.go("my_bids");
			if(response.status=="no result found")
			{
			$state.go("dash");
			}
			else
			{
			$scope.workers=response.near_by;
			
			angular.forEach($scope.workers, function(key, value) {
            var distance = key.distance;
			if(distance<='0.50')
			{
			key.distance_measure='0.50';
			key.price=service_price;
			}
			else
			{
			key.distance_measure=distance;
			var round_distance=Math.round(distance);
			var basic_price=20;
			key.price=service_price+(basic_price*round_distance);
			}
            })
			console.log($scope.workers);
			}
			
			
        });
	
	
   /* //$scope.orginal  = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    //$scope.rate = 3;
    var datasets = [];
    $scope.ratings = {};
    $scope.max = 5;

    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];


    var current_Bid = JSON.parse(storageService.get("currentBid"));
    var bids = current_Bid.bids;
    
    if(bids==null)
    {
		$state.go("dash");
	}
	else
	{
		$scope.allBids = bids;
    $scope.ratings = $scope.allBids.company_rating;
}

    $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }*/
 
})


/*.................... End Display Current Bids for  homeowner part.................................... */



/*.................... start Display Selected Bid With Info for  homeowner part.................................... */

.controller('BidInfoCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams) {
	$scope.max = 5;
	$scope.sum=0;
	$scope.rating_avg={};
	$scope.user_response={};
	$scope.useremail={};
	$scope.userId={};
	$scope.price=$stateParams.techPrice;
	var techId=$stateParams.techId;
	
	$scope.images=[];
	$scope.rates=[];
		HomeOwners.workers_detail(techId).then(function(response) {
            //console.log(response.tech_details);
			$scope.tech_details=response.tech_details;
			
			angular.forEach($scope.tech_details, function(key, value) {
			//console.log(key); 
			$scope.worker_description=key.description;
			$scope.worker_name=key.username;
			var image1="http://weiman.com/Weiman/files/ed/ed754062-df49-4b63-9f66-776eeddafe7c.jpg";
			var image2="https://www.daimer.com/data/Image/hard-surface-cleaner-xtreme-power-13000.jpg";
			var image3="http://www.onegoodthingbyjillee.com/wp-content/uploads/2012/03/bathroom-cleaner-4.jpg";
			var image4="http://cleaningday.co.uk/wp-content/uploads/2015/06/SB_steps_cleaner_bathroom.jpg";
			var image5="http://tristarmaintenance.com/wp-content/uploads/2013/03/bathroom.jpeg";
			$scope.images.push(image1);
			$scope.images.push(image2);
			$scope.images.push(image3);
			$scope.images.push(image4);
			$scope.images.push(image5);
      });

          //  $state.go("login");
        });

		HomeOwners.workers_detail_review(techId).then(function(response) {
            console.log(response.review_details);
			$scope.review_detail=response.review_details;
           //console.log($scope.review_detail.length);
		   $scope.review_count=$scope.review_detail.length;
		
		   angular.forEach($scope.review_detail, function(key, value) {
		   var rate=key.rating;
		   console.log(rate);
		    $scope.sum=parseInt($scope.sum)+parseInt(rate);
		   $scope.rates.push(rate);
		   });
		   //console.log();
		   var rate_number=$scope.rates.length;
		   console.log($scope.sum);
		   $scope.rating_avg=Math.round($scope.sum/rate_number);
		   
        });		
		
		$scope.pickme = function(price) {
	$scope.service_jobs=JSON.parse(storageService.get("service_job"));
	console.log($scope.service_jobs);
	var job_name=$scope.service_jobs.job_name;
	var serviceId=$scope.service_jobs.serviceId;
	var jobId=$scope.service_jobs.jobId;
	var comments=$scope.service_jobs.comments;
	
	//alert(job_name);
	
	$scope.new_auction_data=JSON.parse(storageService.get("new_auction_data"));
	console.log($scope.new_auction_data);
	var app_date=$scope.new_auction_data.date;
	var user_id=$scope.new_auction_data.id;
	var timings=$scope.new_auction_data.timing;
	var distance=$stateParams.techDistance;
	var kilo=' km';
	var dist_km=distance+kilo;
	var techId=$stateParams.techId;
	
	 var data = "dist_km=" +  dist_km + "&timings=" + timings + "&user_id=" + user_id + "&app_date=" + app_date + "&comments=" + comments + "&jobId=" + jobId + "&serviceId=" + serviceId + "&job_name=" + job_name + "&price=" + price + "&techId=" + techId;


	 
	HomeOwners.appointment_create(data).then(function(response) {
	console.log(response);
	if(response.msg=="Appointment Submit Sucessfully")
	{
	
		 var user_id=$scope.new_auction_data.id;
	 var user_data = user_id;
	HomeOwners.user_view(user_data).then(function(usersresponse) {
	//console.log(usersresponse);
	$scope.user_response=usersresponse;
	//console.log($scope.user_response);
	angular.forEach($scope.user_response, function(key, value) {
			//console.log(key); 
			$scope.useremail=key.email_id;
			$scope.userId=key.id;
			console.log($scope.useremail);
			storageService.save("useremail", $scope.useremail);
	storageService.save("userId", $scope.userId);
			})
	
	})
	

	
	$state.go("thanku");
	}
	
	
	 });
	 }	


	 
})

/*.................... End Display Selected Bid With Info for  homeowner part.................................... */





/*.................... start DisputeReplyCtrl for  homeowner part.................................... */

.controller('DisputeReplyCtrl', function($scope, $state, HomeOwners, $ionicScrollDelegate, $ionicPopup, storageService, $stateParams) {

    $scope.orginal = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;
    $scope.max = 5;
    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = {
        'api_token': $scope.orginal.api_token,
        
    };

 
    $scope.gotourl = function(url) {
        // alert(url);
        $state.go(url);

    }
    
/*...................................... Start dispute reply functionality  .....................................*/     
    $scope.reply = function(id) {
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = {
        'api_token': $scope.orginal.api_token,
        
    };
       HomeOwners.reply_dispute(data,id).then(function(response) {
           console.log(response);
            if(response.success==true)
            {
				$state.go("main");
			}
            
        });


    }
/*...................................... End dispute reply functionality  .....................................*/     
    
    $scope.disputed = storageService.get("disputed");

    $scope.disputed_data = JSON.parse($scope.disputed);
    $scope.disputed_data_disputed_appointment = JSON.parse($scope.disputed_data.disputed_appointment);
        $scope.disputed_data_id = JSON.parse($scope.disputed_data.dispute);
    //console.log($scope.disputed_data);
    
    
    
        $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        HomeOwners.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }
    
    
})


/*.................... End  DisputeReplyCtrl for  homeowner part.................................... */







/*....................  Start Rating Directives.................................... */.directive('fundooRating', function() {
    return {
        restrict: 'A',
        template: '<ul class="rating">' + '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' + '\u2605' + '</li>' + '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            readonly: '@',
            onRatingSelected: '&'
        },
        link: function(scope, elem, attrs) {

            var updateStars = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function(index) {
                if (scope.readonly && scope.readonly === 'true') {
                    return;
                }
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }

    /*....................  End Rating Directives.................................... */
});

