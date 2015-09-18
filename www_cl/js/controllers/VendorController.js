angular.module('starter.controller')

/*....................  start Complete Controller.................................... */
.controller('CompleteCtrl', function($scope, $stateParams, storageService, vendors, $state, $cordovaCamera, $cordovaSms, $cordovaActionSheet, $cordovaEmailComposer,$ionicHistory) {
    $scope.orginal = {};
    var dateset = [];
    $scope.appointment = {};
    $scope.specificvendorappointmentInfo = {};
    $scope.date_length = {};

    var appointmentId = $stateParams.appointmentId;

    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var json = {
        'vendor_appointment_id': appointmentId,
        'api_token': $scope.orginal.api_token
    };
    //atasets.push(json);
    
    /*...................................... Start Specific vendor appointment service .....................................*/
    vendors.specificvendorappointment(json).then(function(response) {
        var appointments = JSON.parse(response.appointment);
        var homeowners = JSON.parse(response.homeowner);
        //console.log(appointments.service_date);
        var service_date = appointments.service_date;
        var date_range = appointments.date_range;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        var today = yyyy + '-' + mm + '-' + dd;




        var one_day = 24 * 60 * 60 * 1000;
        var flexi_day = one_day * date_range;
        var upcoming_date = new Date(new Date(service_date).getTime() + flexi_day);

        var day = upcoming_date.getDate();
        var month = upcoming_date.getMonth() + 1;
        var year = upcoming_date.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }


        var upcoming_dates = year + '-' + month + '-' + day;


        var prev_date = new Date(new Date(service_date).getTime() - flexi_day);

        var days = prev_date.getDate();
        var months = prev_date.getMonth() + 1;
        var years = prev_date.getFullYear();
        if (days < 10) {
            days = '0' + days;
        }
        if (months < 10) {
            months = '0' + months;
        }


        var prev_dates = years + '-' + months + '-' + days;




        var date1 = new Date(prev_dates);
        var date2 = new Date(today);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        var date3 = new Date(today);
        var date4 = new Date(upcoming_dates);
        var timeDiff = Math.abs(date4.getTime() - date3.getTime());
        var diffDay = Math.ceil(timeDiff / (1000 * 3600 * 24));


        if (diffDays == date_range || diffDay == date_range || diffDay == 0) {


            var json = {
                "upcoming_date": upcoming_dates,
                "prev_date": prev_dates
            };

            dateset.push(json);

        }
        // $scope.date_length=dateset.length;
		 $scope.date_length = 1;

        var latlonurl = response.directions_url;
        //  console.log(latlonurl);
        var latloncombine = latlonurl.split("https://www.google.com/maps/dir/Current+Location/");
        var latlon = latloncombine[1].split(',');
        var lat = latlon[0];
        var longi = latlon[1];
        var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
        var next_url = "&sensor=true";
        var only_comma = ",";
        var full = url + lat + only_comma + longi + next_url;
        
 /*...................................... Start To get Location with googlemap api service .....................................*/
 
        vendors.location_url(full).then(function(responses) {

            //key.results=response.results;
            console.log(response);
				var mobile=response.mobile_number;
                var phone=response.phone_number;
                if(mobile==null)
                {
					var mobile=phone;
				}
                
            var appointment_josn = {
                'appointments': appointments,
                'response': response,
                'results': responses.results,
                'homeowners': homeowners,
                'mobile'     :mobile
            };
            $scope.specificvendorappointmentInfo = appointment_josn;


            /*====lawn details code starts here======*/
            var lawn_details = JSON.parse(response.lawn_details);
            $scope.lawn_detail = lawn_details;
            var descrip = $scope.lawn_detail.description;
            $scope.description = descrip.trim();
            console.log(lawn_details);

            /*====lawn details code ends here======*/


        })
 /*...................................... End To get Location with googlemap api service .....................................*/
 
  /*...................................... Start Camera Plugin .....................................*/

        $scope.Picture = function(id) {

            storageService.save('picture_id', id);
           
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
                    console.log(index);
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
                            console.log(imageData);
                            $scope.imgURI = "data:image/jpeg;base64," + imageData;
                            storageService.save('image_Complete', $scope.imgURI);

                            $state.go('app_complete');

                        }, function(err) {

                        });

                    } else if (index === 2) {
                        var options = {
                            quality: 50,
                            destinationType: Camera.DestinationType.FILE_URI,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                        };
                        $cordovaCamera.getPicture(options).then(function(imageData) {
                            console.log(imageData);
							
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

 storageService.save('image_Complete', base64Img);
                            $scope.imgURI = imageData;
							$state.go('app_complete');         
    // Base64DataURL
})					
							
							
							
                 

                             

                        }, function(err) {
                            // An error occured. Show a message to the user
                        });

                    }
                    console.log($scope.imgURI);

                });
            }, false);


        }
  /*...................................... End Camera Plugin .....................................*/        
        
    })
 /*...................................... End Specific vendor appointment service .....................................*/

  /*...................................... Start Inapp browser plugin  .....................................*/
    $scope.openmap = function(item) {
        window.open(item, "_blank", "location=yes");
    }
  /*...................................... End Inapp browser plugin  .....................................*/
  
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
	 $scope.previousPage = function() {
	  console.log('here');
	  $ionicHistory.goBack();
	}
   /*...................................... End SMS function plugin  .....................................*/
})

/*....................  End Complete Controller.................................... */

/*....................  start Complete Job Controller.................................... */

.controller('app_completeCtrl', function($scope, $state, $http, vendors, storageService, $stateParams, ApiEndpoint) {
    $scope.orginal = {};
    $scope.imageurl={};
	
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var appointmentId = storageService.get("picture_id");
    var json = {
        'vendor_appointment_id': appointmentId,
        'api_token': $scope.orginal.api_token
    };
 /*...................................... Start Specific vendor appointment service .....................................*/
    vendors.specificvendorappointment(json).then(function(response) {
        var appointments = JSON.parse(response.appointment);
        $scope.appointments = appointments;
        $scope.homeowner = JSON.parse(response.homeowner);
        console.log(response);
    })
 /*...................................... End Specific vendor appointment service .....................................*/
    var image = storageService.get('image_Complete');
    $scope.imageUri = JSON.parse(image);


 /*........start takePicture function using complete  service .....................................*/
    $scope.takePicture = function(id) {
console.log(id);
        var api_token = storageService.get("api_token");
        $scope.orginal.api_token = JSON.parse(api_token);
		var data = "appointment[completed]=" +  encodeURIComponent($scope.imageUri) + "&api_token=" + $scope.orginal.api_token;
console.log(data);
        vendors.completed_update_appointment(data, id).then(function(responses) {
		
            console.log(responses)
			console.log("s");
            storageService.save("id", id);
          //  $state.go('app_complete');
           // if(responses.success==true)
           // {
		   
		    storageService.save('toggle', {
                            'status': 1,'type':'completed'
                 });
            $state.go('overdue');
			//}


        })
    }


    $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        vendors.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }

 /*...................................... End takePicture function using complete  service .....................................*/
})

    .controller('CancelAppCtrl', function($scope, $state, $http, vendors, storageService, $stateParams, $ionicPopup, ApiEndpoint) {
    $scope.orginal = {};
    $scope.cancel = {};
    $scope.note = {};
    $scope.cncelappointmentName = {};
    $scope.appointment = {};
    $scope.vendor_auctions = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;
    $scope.max = 5;


 /*...................................... start function to hide and show text box .....................................*/
    $scope.other = function(data) {

        if (data == 'Others') {
            document.getElementById("cncl").style.display = "block";
            $scope.note = document.getElementById("res_resn").value;
        } else {
            document.getElementById("cncl").style.display = "none";
            $scope.note = data;
        }
    }

/*...................................... End function to hide and show text box .....................................*/
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);

    $scope.cancel = $stateParams.cancelID;
    $scope.cncelappointmentName = $stateParams.appointmentName;

/*...................................... start cancel_appointment function with confirm popup with their service .....................................*/

    $scope.cancel_appointment = function(id) {

        var id = id;

        var cncl_work_resn = $scope.note;
        
        var data = "cancelReason=" + cncl_work_resn + "&api_token=" + $scope.orginal.api_token;

        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure',
            // template: 'Are you sure you want to eat this ice cream?'
        });
        confirmPopup.then(function(res) {
            if (res) {
                $http.post(ApiEndpoint.url + 'vendor/appointments/' + id + '/cancel', data)
                    .success(function(data) {
                    console.log(data);
                    var data =  JSON.parse(data.appointment);
                    storageService.save('toggle', {
                            'status': 1,'id':data.id,'type':'cancel'
                    });
                    $state.go("overdue");
                    //$scope.list = data.items;
                }).error(function() {
                    console.log("FAIL");
                });
            } else {
                console.log('You are not sure');
            }
        });
    };
/*...................................... End cancel_appointment function with confirm popup with their service .....................................*/

    $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        vendors.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }


})

/*....................  End Complete Job Controller.................................... */

/*....................  start OverDue Controller.................................... */
.controller('DueCtrl', function($scope, $state, $rootScope, $http, vendors, storageService, ApiEndpoint,$ionicPopup,$ionicHistory) {
    $scope.showonshedules = false;
    $scope.orginal = {};
    $scope.today = {};
    $scope.todays = {};
    $ionicHistory.clearCache();
	
    $scope.showonshedule = false;
    var datasets = [];
    var tomorrow_datasets = [];
    var arr_data = [];
    $scope.tomorrows = {};
    $scope.vendor_auctions = {};
    $scope.disputed_appointments = {};
    $scope.piad = {};
    $scope.tab = 'first';
    $scope.scroll_data = 0;
    $scope.rate = 3;

    $scope.max = 5;
    $scope.overdue = true;

    var api_token = storageService.get("api_token");

    $scope.timestamp = [{
        'time': new Date().getTime()
    }, {
        'time': new Date().getTime() + 24 * 60 * 60 * 1000
    }];

/*...................................... start changetab function .....................................*/

    $scope.changetab = function(item) {
        $scope.tab = item;

    }
/*...................................... End changetab function .....................................*/    
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);

    var data = {
        'api_token': $scope.orginal.api_token
    };

    /*====Star====Separate bid and unbid section===*/
    vendors.vendor_auctions(data).then(function(response) {
        console.log(response);

        var vendors = response.unbid_auctions;
        $scope.vendor_auctions = vendors;
        $scope.vendor_auctions_length = $scope.vendor_auctions.length;

        console.log($scope.vendor_auctions_length);

        var alerady_bid = response.already_bid_auctions;

        $scope.bid_auction = alerady_bid;
        $scope.bid_auction_length = $scope.bid_auction.length;

        console.log($scope.bid_auction_length);
        console.log(alerady_bid);
        /*====End === Separate bid and unbid section===*/

        var dateObj = new Date();

        var dataall = [];
        var month = ("0" + (dateObj.getMonth() + 1)).slice(-2)
        var day = ("0" + dateObj.getDate()).slice(-2)
        var year = dateObj.getUTCFullYear();

        var newdate = year + "-" + month + "-" + day;

        angular.forEach($scope.vendor_auctions, function(key, value) {
            var id = key.id;
            var json = {
                'auction_id': id,
                'api_token': $scope.orginal.api_token
            };
            dataall.push(json);

            $http.get(ApiEndpoint.url + 'vendor/auctions/' + id + '?api_token=' + $scope.orginal.api_token).success(function(data) {
                key.homeowner = data.homeowner;
            });

        });

    });

/*...................................... Start Service to fetch list of appointment .....................................*/
    vendors.vendor_list_appointment(data).then(function(response) {

        console.log(response);
        $scope.appointment_list = JSON.parse(response.appointments);

        console.log(response.disputed_appointments);
        $scope.disputed_appointments = JSON.parse(response.disputed_appointments);
        //console.log(test);

        console.log($scope.appointment_list.length);

        var totallength = $scope.appointment_list.length;


        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        var today = yyyy + '-' + mm + '-' + dd;

        $scope.todays = today;

        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }


        var tomorrow = year + '-' + month + '-' + day;
        $scope.tomorrows = tomorrow;

        angular.forEach($scope.appointment_list, function(key, value) {

            var id = key.id;

            var state = key.state;

            if (state != "paid" && state != "disputed" && state != "complete") {
                arr_data.push(state);
            }


            var dates = key.service_date;
            if (dates == today) {
                datasets.push(dates);
            }
            if (dates == tomorrow) {
                tomorrow_datasets.push(dates);
            }



            var json = {
                'vendor_appointment_id': id,
                'api_token': $scope.orginal.api_token
            };
            //atasets.push(json);
            vendors.specificvendorappointment(json).then(function(response) {
                console.log(response);
                key.homeowners = JSON.parse(response.homeowner);
                var latlonurl = response.directions_url;
                var latloncombine = latlonurl.split("https://www.google.com/maps/dir/Current+Location/");
                var latlon = latloncombine[1].split(',');
                var lat = latlon[0];
                var longi = latlon[1];
                var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
                var next_url = "&sensor=true";
                var only_comma = ",";
                var full = url + lat + only_comma + longi + next_url;

                vendors.location_url(full).then(function(response) {

                    key.results = response.results;
                });
                key.directions_url = response.directions_url;
            })

            //  console.log($scope.allBids);
        })

        $scope.overdues = arr_data.length;
        var datasets_length = datasets.length;
        var tomorrow_datasets_length = tomorrow_datasets.length;
        var data_length = (totallength) - (datasets_length + tomorrow_datasets_length);
        $scope.coming_length = $scope.overdue;

        console.log($scope.coming_length);
        angular.forEach($scope.disputed_appointments, function(key, value) {

            var id = key.id;
            var service_date = key.service_date;

            var new_dispute_date_json = {
                "service_date": service_date
            };

            storageService.save("dispute_service_date", new_dispute_date_json);
            var json = {
                'vendor_appointment_id': id,
                'api_token': $scope.orginal.api_token
            };

            vendors.specificvendorappointment(json).then(function(response) {
                //  console.log(response);
                key.homeowners = JSON.parse(response.homeowner);
                var latlonurl = response.directions_url;
                var latloncombine = latlonurl.split("https://www.google.com/maps/dir/Current+Location/");
                var latlon = latloncombine[1].split(',');
                var lat = latlon[0];
                var longi = latlon[1];
                var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
                var next_url = "&sensor=true";
                var only_comma = ",";
                var full = url + lat + only_comma + longi + next_url;

                vendors.location_url(full).then(function(response) {

                    key.results = response.results;
                });



                key.directions_url = response.directions_url;
            })

            //  console.log($scope.allBids);
        })



        $scope.tomorrow_count = tomorrow_datasets.length;
        $scope.today_count = datasets.length;

    });

    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var data = $scope.orginal.api_token;
    vendors.payments(data).then(function(response) {

        if (typeof response.paid_appointments != "undefined") {
            var paid_payment = JSON.parse(response.paid_appointments);
            console.log(paid_payment);
            $scope.paid = paid_payment;
        }



        angular.forEach($scope.paid, function(key, value) {

            var id = key.id;




            var json = {
                'vendor_appointment_id': id,
                'api_token': $scope.orginal.api_token
            };
            //atasets.push(json);
            console.log(json);
            vendors.specificvendorappointment(json).then(function(response) {
                console.log(response);
                $scope.homeowners = JSON.parse(response.homeowner);
                key.homeowner_name = $scope.homeowners.name;

                console.log($scope.homeowners.name);
                var latlonurl = response.directions_url;
                var latloncombine = latlonurl.split("https://www.google.com/maps/dir/Current+Location/");
                var latlon = latloncombine[1].split(',');
                var lat = latlon[0];
                var longi = latlon[1];
                var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
                var next_url = "&sensor=true";
                var only_comma = ",";
                var full = url + lat + only_comma + longi + next_url;

                vendors.location_url(full).then(function(response) {

                    key.results = response.results;
                });
            });

            console.log($scope.paid);
        });



    });
/*...................................... End Service to fetch list of appointment .....................................*/

/*...................................... start toggle functionality of overdue page ..................................*/
    $scope.toggleOver = function() {
        $scope.overdue = $scope.overdue === false ? true : false;
    };

    $scope.toggleToday = function() {
        $scope.todayhideshow = $scope.todayhideshow === false ? true : false;
    };

    $scope.toggleTomorrow = function() {
        $scope.tomorrowhideshow = $scope.tomorrowhideshow === false ? true : false;
    };
    $scope.toggleTomorrow = function() {
        $scope.tomorrowhideshow = $scope.tomorrowhideshow === false ? true : false;
    };

    $scope.toggleComing = function() {
        $scope.cominghideshow = $scope.cominghideshow === false ? true : false;
    };


    $scope.toggleDispute = function() {
        $scope.dispute = $scope.dispute === false ? true : false;
    };


    $scope.toggleUnbid = function() {
        $scope.Unbid = $scope.Unbid === false ? true : false;
    };
    $scope.togglebid = function() {
        $scope.bid = $scope.bid === false ? true : false;
    };


/*...................................... End toggle functionality of overdue page ..................................*/
$scope.message = '';
$scope.image='';
$scope.showonsheduleBid = false;
var toggle=JSON.parse(storageService.get("toggle"));
console.log(toggle);
   if(toggle !=  null){
     if(toggle.status !=  null){
          if(toggle.type == 'cancel'){            
                 $scope.showonshedules = true;
             }else {
                if(toggle.type == 'bid'){
                 $scope.message = 'Your Bid has been placed successfully';
                 $scope.image='img/asset/12.png';
                }
				
				if(toggle.type=='reschdule')
				{
                 $scope.message = 'Date Change Request Sent';
                 $scope.image='img/asset/unnamed.png';
                }
				if(toggle.type=='completed')
				{
                 $scope.message = 'Your Appointment is completed sucessfully';
                 $scope.image='img/asset/12.png';
                }
				if(toggle.type=='cancelservice')
				{
                 $scope.message = 'Your Service has been cancelled';
                 $scope.image='img/asset/12.png';
                }
				if(toggle.type=='dispute')
				{
                 $scope.message = 'Your Disputed Appointment is completed sucessfully';
                 $scope.image='img/asset/12.png';
                }
                 $scope.showonshedule = true;
          }
          storageService.remove('toggle');
     }
   } 
/*...................................... start Ok function after reshedule page in overdue page ..................................*/
    $scope.ok = function() {
        $scope.showonshedule = false;
    }
/*...................................... End Ok function after reshedule page in overdue page ..................................*/
    /*======Cancel Appointment when clicks on button starts here======*/


    $scope.cancelAppointment = function() {

        $scope.showonshedules = false;
        console.log('cancel');


    }
    /*======Cancel Appointment when clicks on button ends here======*/
    
    $scope.already_bid=function() {
		
	
   var alertPopup = $ionicPopup.alert({
     
     template: 'You have already bid on this auction...We will let you know if the Homeowner picks your bid.'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });

		
	}
    

})

/*....................  End OverDue Controller.................................... */

/*....................  start Payment Notification Controller.................................... */

.controller('paidCtrl', function($scope, $state, $http, vendors, storageService, $stateParams) {
    $scope.orginal = {};
    $scope.paid_amount = {};
    $scope.homeownerName = {};
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var paid_id = $stateParams.paidID;

    $scope.homeownerName = $stateParams.homeownerName;
    var json = {
        'vendor_appointment_id': paid_id,
        'api_token': $scope.orginal.api_token
    };
    
    /*...................................... start Notification page api ..................................*/
    vendors.specific_payments(json).then(function(response) {

        $scope.paid_amount = JSON.parse(response.payment);
        //console.log($scope.paid_amount);



    })
    /*...................................... End Notification page api ..................................*/
})

/*....................  End Payment Notification Controller.................................... */

/*....................  start Service Controller.................................... */

.controller('ServiceCtrl', function($scope, $state, $http, vendors, storageService, $stateParams) {
    $scope.orginal = {};
    $scope.dispute = {};
    $scope.dispute_service_date = {};


    var disputeappointmentId = $stateParams.disputeappointmentId;

    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);

    var json = {
        'disputeappointmentId': disputeappointmentId,
        'api_token': $scope.orginal.api_token
    };

    /*...................................... start view specific dispute  api ..................................*/
    vendors.dispute_view(json).then(function(response) {
        $scope.dispute = response;
        //console.log(response);

        $scope.name = response.dispute.appointment_id;

        var json = {
            'vendor_appointment_id': $scope.name,
            'api_token': $scope.orginal.api_token
        };
        //atasets.push(json);
        
    /*...................................... start Specific vendor appointment   api ..................................*/
        vendors.specificvendorappointment(json).then(function(response) {

            $scope.homeowners = JSON.parse(response.homeowner);

           // console.log($scope.homeowners);
        })

    /*...................................... End Specific vendor appointment   api ..................................*/

        var disputed_date = storageService.get("dispute_service_date");
        var dis_date = JSON.parse(disputed_date);
        $scope.dispute_service_date = new Date(dis_date.service_date);

       // console.log($scope.dispute_service_date);

    /*...................................... start cancel_service   api ..................................*/
        $scope.cancel_service = function(id) {


            var dispute_cancel = {
                "dispute": {
                    "id": $scope.dispute.dispute.id,
                    "company_id": $scope.dispute.dispute.company_id,
                    "homeowner_id": $scope.dispute.dispute.homeowner_id,
                    "appointment_id": $scope.dispute.dispute.appointment_id,
                    "description": $scope.dispute.dispute.description,
                    "image_file_name": $scope.dispute.disputed_photo,
                    "resolution_image": null,
                    "resolution_description": null
                }
            };
          //  console.log(dispute_cancel);

            var api_token = storageService.get("api_token");
            var tokens = JSON.parse(api_token);
            vendors.cancel_services(dispute_cancel, id, tokens).then(function(responses) {
			
			 storageService.save('toggle', {
                            'status': 1,'type':'cancelservice'
                 });
			
                $state.go("overdue");

            })


        }
    /*...................................... End cancel_service   api ..................................*/
    })

    /*...................................... End view specific dispute  api ..................................*/
    
        $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        vendors.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }
    
    
})

/*....................  End Service Controller.................................... */

/*....................  start Complaint Controller.................................... */

.controller('ComplaintCtrl', function($scope, $state, $http, vendors, storageService, $cordovaCamera, $stateParams, $cordovaActionSheet) {

    //$scope.imgURI = {};
    $scope.imageurl = {};
    
    /*...................................... start Camera Plugin ..................................*/    
    $scope.takePicture = function() {

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
               // console.log(index);
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
                     //   console.log(imageData);
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                        $scope.imagename = $scope.imgURI;
                    }, function(err) {

                    });

                } else if (index === 2) {
                    var options = {
                        quality: 50,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                    };
                    $cordovaCamera.getPicture(options).then(function(imageData) {
                      //  console.log(imageData);
					  
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
 $scope.imgURI = imageData;
 $scope.imagename = base64Img;
                       
    // Base64DataURL
})		
					  
					  
					  
                       

                    }, function(err) {
                        // An error occured. Show a message to the user
                    });

                }
            });
        }, false);
    }
    /*...................................... End Camera Plugin ..................................*/    
    $scope.orginal = {};
    $scope.dispute = {};

    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var api_tokens = $scope.orginal.api_token;
   
    
    /*...................................... start Complaint register function ..................................*/    
    $scope.complaintregister = function() {
	 var complaintId = $stateParams.complaintId;
    var descrip = document.getElementById("des").value;
	
	
    var images = $scope.imagename;
	console.log(descrip);
	console.log(complaintId);
	console.log(images);
	

      //  console.log($scope.imageurl.name);
        var data = "dispute[resolution_image]=" + encodeURIComponent(images) + "&dispute[resolution_description]=" + descrip + "&api_token=" + $scope.orginal.api_token;
		console.log(data);
        vendors.complaint(data, complaintId, api_tokens).then(function(response) {
          //  console.log(response);
		   storageService.save('toggle', {
                            'status': 1,'type':'dispute'
                 });
		  
		  $state.go("overdue");
        })
    }
    /*...................................... End Complaint register function ..................................*/  
    //alert(complaintId);
    
    
        $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        vendors.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }

})

/*....................  End Complaint Controller.................................... */

/*....................  start Reschedule Controller.................................... */

.controller('RescheduleCtrl', function($scope, $state, $http, vendors, storageService, $stateParams, $filter) {

    $scope.orginal = {};
    $scope.photos = [];
    $scope.dates = {};
    $scope.resName = {};
    $scope.note = {};
    $scope.date_change = {};

    var res_id = $stateParams.resId;
    $scope.resp_id = res_id;

    $scope.resName = $stateParams.resName;

    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);

    /*...................................... start reschedule_appointment Service ..................................*/  
    vendors.reschedule_appointment(res_id, $scope.orginal.api_token).then(function(responses) {

        var appointment = JSON.parse(responses.appointment);
        //console.log();

        var new_var = appointment.service_date;

        var today = new Date(new_var);

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
     //   console.log($scope.photos);
    })

    /*...................................... End reschedule_appointment Service ..................................*/  
    
    /*...................................... start textbox hide and show function ..................................*/      

    $scope.other = function(data) {
        if (data == 'Others') {
            document.getElementById("others_resn").style.display = "block";
            $scope.note = document.getElementById("res_resn").value;
        } else {
            document.getElementById("others_resn").style.display = "none";
            $scope.note = data;
        }
    }

 /*...................................... End textbox hide and show function ..................................*/      
    $scope.selectedIndex = 1;

    $scope.itemClicked = function($index, data) {
      //  console.log($index);
        $scope.selectedIndex = $index;

        $scope.date_change = $filter('date')(data, "MMMM dd , yyyy");
     //   console.log($scope.date_change);
    }
 /*...................................... start reschdule function ..................................*/      
    $scope.reschdule = function(id) {
        var notes = $scope.note;
        var requested_date = $scope.date_change;
        var api_token = storageService.get("api_token");
        $scope.orginal.api_token = JSON.parse(api_token);
        var data = "note=" + notes + "&requested_date=" + requested_date + "&api_token=" + $scope.orginal.api_token;
      
        vendors.reschedule_date(id, data).then(function(responses) {
        //    console.log(responses);

            storageService.save('toggle', {
            'status': 1,'type':'reschdule'}); 
           $state.go("overdue");
        })
        

    }
    
    
        $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        vendors.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }
    
 /*...................................... End reschdule function ..................................*/  
})


/*....................  End Reschedule Controller.................................... */

/*....................  start Bid Controller.................................... */

.controller('BidCtrl', function($scope, $state, $http, vendors, storageService, $stateParams, $ionicLoading, $compile, ApiEndpoint) {

    $scope.orginal = {};
    $scope.auction = {};
    $scope.vendor_auctions_place_bid = {};
    var vendor_id = $stateParams.vendorId;
    var api_token = storageService.get("api_token");
    $scope.orginal.api_token = JSON.parse(api_token);
    var json = {
        'auction_id': vendor_id,
        'api_token': $scope.orginal.api_token
    };

    // Coordinates to center the map
    $scope.latlong = {};
    // if HTML DOM Element that contains the map is found...
    
     /*...................................... start initialize function to show map on place bid page ..................................*/  
    function initialize() {

        vendors.vendorInfo(json).then(function(response) {
          console.log(response);

            $scope.descrip = response.lawn;
            var descrip = $scope.descrip.description;
            $scope.descriptions = descrip.trim();

          //  console.log($scope.descriptions);
            /*===how_often and last_cut====*/
            $scope.place_bid_cat = JSON.parse(response.auction);

            var place_cat = $scope.place_bid_cat;
            $scope.category = place_cat;
            /*===how_often and last_cut====*/

            //console.log(response.auction);
            var auction = JSON.parse(response.auction);

            $scope.latlong.lat = response.hash[0].lat;
            $scope.latlong.lon = response.hash[0].lng;


            var myLatlng = new google.maps.LatLng($scope.latlong.lat, $scope.latlong.lon);

            // Other options for the map, pretty much selfexplanatory

            var mapOptions = {
                zoom: 14,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var panoramaOptions = {
                position: myLatlng,
                pov: {
                    heading: 34,
                    pitch: 10
                }
            };
            var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
            //  map.setStreetView(panorama);



            // Attach a map to the DOM Element, with the defined settings
            var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);


            var place_bid = {
                'auctions': auction,
                'response': response
            }

            $scope.vendor_auctions_place_bid = place_bid;
  console.log( $scope.vendor_auctions_place_bid);
        })
    //    console.log($scope.latlong);

    }
    /*...................................... End initialize function to show map on place bid page ..................................*/  
    google.maps.event.addDomListener(window, 'load', initialize());

    $scope.you_place_bid = function(item) {
        var bid_amt = document.getElementById("amt").value;
        var vendor_note = document.getElementById("bid_resn").value;
        if (bid_amt > 0) {
            var api_token = storageService.get("api_token");
            $scope.orginal.api_token = JSON.parse(api_token);
           // console.log($scope.orginal.api_token);
            var data = "bid_amount=" + bid_amt + "&vendor_note=" + vendor_note + "&api_token=" + $scope.orginal.api_token;

            vendors.update_vendor_auctions(data, item).then(function(responses) {
                 storageService.save('toggle', {
                            'status': 1,'type':'bid'
                 });
                //console.log(data);
                $state.go("overdue");    
              })
           
        }
    }

    $scope.logout = function() {

        var api_token = storageService.get("api_token");
        var api_token = JSON.parse(api_token);
        var data = {
            'api_token': api_token
        };

        vendors.logoutuser(data).then(function(response) {
            //console.log(response);

            $state.go("login");
        });

    }


})
/*....................  End Bid Controller.................................... */
