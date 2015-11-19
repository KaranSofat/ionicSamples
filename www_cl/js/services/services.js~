angular.module('starter.services', [])






//factory for authentication and login signup 
.factory('HomeOwners', function($http, $q, ApiEndpoint) {

    console.log(ApiEndpoint);
    var baseurl = ApiEndpoint.url;
	//var baseurl="http://localhost/"
    return {

  /*....................  start Create auction service.................................... */
        Create: function(item) {
            //alert(item);
            var Url = baseurl+'register' ;
            
			console.log(Url);
            var defer = $q.defer();
            console.log(item);
            $http.post(Url,item, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
        
 /*....................  End Create auction service.................................... */
 
	login_details: function(item) {
	

            var Url = baseurl + 'login';
			console.log(Url);
            var defer = $q.defer();
            console.log(item);
            $http.post(Url, item,{
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
		
	specific_Location: function(item) {
            //alert(item);
            var Url = baseurl + 'specificLocation';
			console.log(Url);
            var defer = $q.defer();
            console.log(item);
            $http.post(Url, item,{
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 /*....................  Start Show handyman service.................................... */
 
        show_services: function() {
            //alert(item);
            var Url = baseurl + 'Services';
			console.log(Url);
            var defer = $q.defer();
            
            $http.get(Url).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
		
		      getBusiness: function(id) {


            var Url = baseurl + 'getBusiness';

            var defer = $q.defer();


            $http.post(Url,id,{
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {

                defer.resolve(data);


            }).
            error(function(data, status, headers, config) {
                console.log(data);
                defer.reject();

            });

            return defer.promise;
        },
        
		 techInfo: function(id) {


            var Url = baseurl + 'techInfo';

            var defer = $q.defer();


            $http.post(Url,id,{
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {

                defer.resolve(data);

            }).
            error(function(data, status, headers, config) {
                console.log(data);
                defer.reject();

            });

            return defer.promise;
        },
		
 /*=============Jobs service Starts here===============================*/

jobs: function(id) {


            var Url = baseurl + 'appointmentFix';

            var defer = $q.defer();


            $http.post(Url,id,{
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {

                defer.resolve(data);

            }).
            error(function(data, status, headers, config) {
                console.log(data);
                defer.reject();

            });

            return defer.promise;
        },
        
/*==============Jobs service Ends here===============================*/    

/*=============Detail Jobservice Starts here===============================*/

detailJob: function(id) {

            var Url = baseurl + 'appointmentFixDetails';

            var defer = $q.defer();


            $http.post(Url,id,{
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {

                defer.resolve(data);

            }).
            error(function(data, status, headers, config) {
                console.log(data);
                defer.reject();

            });

            return defer.promise;
        },
        
        
 
ServiceMessage: function(id) {

            var Url = baseurl + 'user_detail_submit';

            var defer = $q.defer();


            $http.post(Url,id,{
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {

                defer.resolve(data);

            }).
            error(function(data, status, headers, config) {
                console.log(data);
                defer.reject();

            });

            return defer.promise;
        },
               
        
/*=============Detail Jobservice Starts here===============================*/  


 /*....................  End Show handyman service.................................... */
 
		show_specific_service_job: function(service_id) {
            //alert(item);
            var Url = baseurl + 'specificservicesjob?service_id='+service_id;
			console.log(Url);
            var defer = $q.defer();
            
            $http.get(Url).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
 
 
		show_Cities: function() {
            //alert(item);
            var Url = baseurl + 'Cities';
			console.log(Url);
            var defer = $q.defer();
            
            $http.get(Url).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
 
      	show_Cities_new: function() {
            //alert(item);
            var Url = baseurl + 'LocationCity';
			console.log(Url);
            var defer = $q.defer();
            
            $http.get(Url).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
 
			show_location: function(city_id) {
            //alert(item);
            var Url = baseurl + 'Location?city_id='+city_id;
			console.log(Url);
            var defer = $q.defer();
            
            $http.get(Url).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
		
		worker_near_by: function(item) {
            //alert(item);
            var Url = baseurl + "nearBY";
			console.log(Url,item);
            var defer = $q.defer();
            
            $http.post(Url,item,{
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
		
		
		workers_detail: function(item) {
            //alert(item);
            var Url = baseurl + 'WorkInfo?tech_id='+item;
			console.log(Url);
            var defer = $q.defer();
            
            $http.get(Url).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
		
		workers_detail_review: function(item) {
            //alert(item);
            var Url = baseurl + 'ReviewWorkInfo?tech_id='+item;
			console.log(Url);
            var defer = $q.defer();
            
            $http.get(Url).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
		appointment_create: function(item) {
            //alert(item);
            var Url = baseurl + 'appointment';
			console.log(Url);
            var defer = $q.defer();
            
            $http.post(Url,item, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
		
		
		  
		
		
		 
		show_mobile: function(item) {
            //alert(item);
            var Url = baseurl + 'phone';
			console.log(Url);
            var defer = $q.defer();
            
            $http.post(Url,item, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
		
 /*............old project services......................................................*/
 
 /*....................  start Card submit service.................................... */
        
        NewCard: function(data) {


            var Url = baseurl + 'card/create';

            var defer = $q.defer();

            $http.post(Url, data).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 /*....................  End Card submit service.................................... */
 
 
  Profile: function(id) {


            var Url = baseurl + 'myInformation';
			
            var defer = $q.defer();
            
            $http.post(Url,id, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},

       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
      
        ResetPassword: function(phone) {


            var Url = baseurl + 'forgot_password';
			
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
        ChangePassword: function(phone) {


            var Url = baseurl + 'change_password';
			
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
        SearchDetail: function(phone) {


            var Url = baseurl + 'getSpecificBusiness';
			
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
 
 
      
        SearchResult: function(phone) {


            var Url = baseurl + 'showBusiness';
			
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
 
      
        CountNotify: function(phone) {
//alert(phone);

            var Url = baseurl + 'CountNotify';
			
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
        MyNotify: function(phone) {
//alert(phone);

            var Url = baseurl + 'notifyResult';
			
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
      
 
        notify: function(phone) {


            var Url = baseurl + 'notify';
			
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
 
        techDetail: function(phone) {


            var Url = baseurl + 'getTechnicianDetail';
			
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
 
         EditInfo: function(data) {

        //alert(data);
            var Url = baseurl + 'UpdateInformation';
			
            var defer = $q.defer();
            
            $http.post(Url,data, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 reply_dispute: function(item,id) {


            var Url = baseurl + 'disputes/'+id+'/resolve?api_token='+item.api_token;

            var defer = $q.defer();

            $http.post(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 /*....................  Start Current Bid service.................................... */
 
        Bid: function(item) {

            var Url = baseurl + 'homeowner/my_bids?api_token=' + item.api_token;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
        
      
        About: function(phone) {


            var Url = baseurl + 'about';
			
			     // var Url = "http://localhost:4300/";
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
        
        Term: function(phone) {


            var Url = baseurl + 'term';
			
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
        
         Team: function(phone) {


            var Url = baseurl + 'team';
			
            var defer = $q.defer();
            
            $http.post(Url,phone, {
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {
              //  console.log(data);
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
 
        
 /*....................  End Current Bid service.................................... */
 
 /*....................  start review api to getting the comapny name service.................................... */
 review_company_name:function(id,item) {

            var Url = baseurl + 'appointments/'+id+'/review_and_pay?api_token=' + item.api_token;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
 /*.................... end review api to getting the comapny name service.................................... */
 
 
 
 
 
 /*....................  Start Date service.................................... */
 
        Schedule_date: function(item,tokens) {
 
            var Url = baseurl + 'appointments/?api_token='+tokens;
 
            var defer = $q.defer();
 
            $http.post(Url,item).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });
 
            return defer.promise;
        },
 /*....................  End Date service.................................... */

 /*....................  Start Bid Info service.................................... */
        BidInfo: function(item) {

            var Url = baseurl + 'homeowner/bidder_info/' + item.bid_id;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },

 /*....................  End Bid Info service.................................... */


        newlyCreated: function(item) {

            var Url = baseurl + 'homeowner/bidder_info/' + item.bid_id;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },


 /*....................  Start Bid Accept service.................................... */

        BidAccept: function(item) {

            var Url = baseurl + 'bid/' + item.bid_id + '/accept?api_token='+item.api_token;

            var defer = $q.defer();

            $http.post(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 /*....................  End Bid Accept service.................................... */
 
 /*....................  Start credit card info service.................................... */ 
        credit: function(item) {

            var Url = baseurl + 'card/new?api_token=' + item.api_token;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },

 /*....................  End credit card info service.................................... */ 
 
 /*....................  Start Appointment service.................................... */ 
        Appointment: function(item) {

            var Url = baseurl + 'appointments/all?api_token=' + item.api_token;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 /*....................  End Appointment service.................................... */ 
 
  /*....................  Start user_view service.................................... */ 
	user_view: function(item) {

            var Url = baseurl + 'users?user_id='+item;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },
 
 /*....................  End user_view service.................................... */ 

 
        checkauctions: function() {
            //alert("!");
            var Url = baseurl + 'homeowner/auctions';

            var defer = $q.defer();

            $http.jsonp(Url).
            success(function(data, status, headers, config) {

                defer.resolve(data);

            }).
            error(function(data, status, headers, config) {
                defer.reject();

            });

            return defer.promise;
        },

 /*....................  Start LoginDetail service.................................... */ 
        logindetail: function(data) {
            var Url = 'https://greenpal-staging.herokuapp.com/api/v1/user/session';

            var defer = $q.defer();


            $http.post(Url, data).
            success(function(data, status, headers, config) {

                defer.resolve(data);

            }).
            error(function(data, status, headers, config) {
                console.log(data);
                defer.reject();

            });

            return defer.promise;
        },
 /*....................  End LoginDetail service.................................... */
 
  /*....................  Start Review service.................................... */ 
 
        reviewer: function(data, tokens, id) {

            var Url = baseurl + 'appointments/' + id + '/submit_review_and_payment';

            var defer = $q.defer();


            $http.post(Url, data).
            success(function(data, status, headers, config) {

                defer.resolve(data);

            }).
            error(function(data, status, headers, config) {
                console.log(data);
                defer.reject();

            });

            return defer.promise;
        },
/*....................  End Review service.................................... */ 

    
        
 

/*....................  Start Submit dispute service.................................... */ 
        submit_dispute: function(data, tokens, id) {

            var Url = baseurl + 'appointments/' + id + '/submit_dispute?api_token=' + tokens;

            var defer = $q.defer();


            $http.post(Url, data,{
            
             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
       
            }).
            success(function(data, status, headers, config) {

                defer.resolve(data);

            }).
            error(function(data, status, headers, config) {
                console.log(data);
                defer.reject();

            });

            return defer.promise;
        },
/*....................  End Submit dispute service.................................... */ 

/*....................  Start HomePage service.................................... */ 
        Homepage: function(item) {

            var Url = baseurl + 'homeowner/index?api_token=' + item;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        },

/*....................  End HomePage service.................................... */ 


/*....................  Start Logout service.................................... */ 
        logoutuser: function(item) {
            //storageService.remove('api_token');
            //return 'nishant';


            var Url = baseurl + 'user/session/logout?api_token=' + item.api_token;

            var defer = $q.defer();

            $http.post(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;




        },




    }
/*....................  End Logout service.................................... */ 
})

//localstorage factory
.factory('storageService', function($rootScope) {

    return {

        get: function(key) {
            return localStorage.getItem(key);
        },

        save: function(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        },

        remove: function(key) {
            localStorage.removeItem(key);
        },

        clearAll: function() {
            localStorage.clear();
        }
    };
})

.directive("tooltip", function () {
    return {
        link: function (scope, element, attrs) {

            $(element).on("mouseover", function () {
                $(this).append("<span>"+ attrs.tooltip +"</span>");
            });
            
            $(element).on("mouseout", function () {
                $(this).find("span").remove();
            });
            
            scope.$on("$destroy", function () {
                $(element).off("mouseover");
                $(element).off("mouseout");                
            });
        }
    };
});
