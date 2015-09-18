 angular.module('starter.services')


 //factory for authentication and login signup 
 .factory('vendors', function($http, $q, ApiEndpoint) {
     console.log(ApiEndpoint);
     var baseurl = ApiEndpoint.url;
     return {

/*....................  Start Place Bid service.................................... */ 
         Create_Bid: function(items, item) {

             var Url = baseurl + 'vendor/auctions/' + item;

             var defer = $q.defer();

             $http.post(Url, items).
             success(function(data, status, headers, config) {
                 defer.resolve(data);
             }).
             error(function(data, status, headers, config) {
                 defer.reject();
             });

             return defer.promise;
         },
/*....................  End Place Bid service.................................... */ 

/*....................  Start vendor_list_appointment service.................................... */ 
         vendor_list_appointment: function(item) {

             var Url = baseurl + 'vendor/appointments?api_token=' + item.api_token;

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
         
/*....................  End vendor_list_appointment service.................................... */ 

/*....................  Start reschedule service.................................... */ 
         reschedule_date: function(vid, item) {

             var Url = baseurl + 'vendor/requested_appointment_date_changes/' + vid + '/create';

             var defer = $q.defer();

             $http.post(Url, item).
             success(function(data, status, headers, config) {
                 defer.resolve(data);
             }).
             error(function(data, status, headers, config) {
                 defer.reject();
             });

             return defer.promise;
         },
/*....................  End reschedule service.................................... */ 

/*....................  Start specificvendorappointment service.................................... */ 
         specificvendorappointment: function(item) {

             var Url = baseurl + 'vendor/appointments/' + item.vendor_appointment_id + '?api_token=' + item.api_token;

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

/*....................  End specificvendorappointment service.................................... */ 

/*....................  Start dispute_view service.................................... */ 
         dispute_view: function(item) {

             var Url = baseurl + 'vendor/disputes/' + item.disputeappointmentId + '/view?api_token=' + item.api_token;

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
/*....................  End dispute_view service.................................... */ 

/*....................  Start cancel_services service.................................... */ 
         cancel_services: function(cncl, id, tokens) {
             var Url = baseurl + '/vendor/disputes/' + id + '/cancel?api_token=' + tokens;

             var defer = $q.defer();


             $http.post(Url, cncl).
             success(function(data, status, headers, config) {

                 defer.resolve(data);

             }).
             error(function(data, status, headers, config) {
                 console.log(data);
                 defer.reject();

             });

             return defer.promise;
         },

/*....................  End cancel_services service.................................... */ 

/*....................  Start payments service.................................... */ 
         payments: function(item) {

             var Url = baseurl + '/vendor/payments?api_token=' + item;

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

/*....................  End payments service.................................... */ 

/*....................  Start specific payments service.................................... */ 
         specific_payments: function(item) {

             var Url = baseurl + '/vendor/payments/' + item.vendor_appointment_id + '?api_token=' + item.api_token;

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


/*....................  End specific payments service.................................... */ 

/*....................  Start location_url service.................................... */ 

         location_url: function(item) {

             var Url = item;

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

/*....................  end location_url service.................................... */ 

/*....................  Start update_vendor_auctions service.................................... */ 
 
         update_vendor_auctions: function(items, item) {
             var Url = baseurl + '/vendor/auctions/' + item + '/update_auction';

             var defer = $q.defer();


             $http.post(Url, items).
             success(function(data, status, headers, config) {

                 defer.resolve(data);

             }).
             error(function(data, status, headers, config) {
                 console.log(data);
                 defer.reject();

             });

             return defer.promise;
         },

/*....................  End update_vendor_auctions service.................................... */ 

/*....................  Start vendor_auctions service.................................... */ 
         vendor_auctions: function(item) {
             var Url = baseurl + 'vendor/auctions?api_token=' + item.api_token;

             var defer = $q.defer();


             $http.get(Url).
             success(function(data, status, headers, config) {

                 defer.resolve(data);

             }).
             error(function(data, status, headers, config) {
                 console.log(data);
                 defer.reject();

             });

             return defer.promise;
         },



/*....................  End vendor_auctions service.................................... */ 

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

/*....................  Start update_appointment service.................................... */ 

         update_appointment: function(item, items) {
             var Url = baseurl + 'vendor/appointments/' + items;

             var defer = $q.defer();


             $http.post(Url, item).
             success(function(data, status, headers, config) {

                 defer.resolve(data);

             }).
             error(function(data, status, headers, config) {
                 console.log(data);
                 defer.reject();

             });

             return defer.promise;
         },

/*....................  End update_appointment service.................................... */ 

/*....................  Start complaint service.................................... */ 
         complaint: function(item, items, token) {


             var Url = baseurl + '/vendor/disputes/' + items + '/update?api_token=' + token;

             var defer = $q.defer();


             $http.post(Url, item).
             success(function(data, status, headers, config) {

                 defer.resolve(data);

             }).
             error(function(data, status, headers, config) {
                 console.log(data);
                 defer.reject();

             });

             return defer.promise;
         },

/*....................  End complaint service.................................... */


/*....................  Start app_complete send service.................................... */  
         completed_update_appointment: function(item, items) {
             var Url = baseurl + 'vendor/appointments/' + items + '/update_appointment';

             var defer = $q.defer();


             $http.post(Url, item).
             success(function(data, status, headers, config) {

                 defer.resolve(data);

             }).
             error(function(data, status, headers, config) {
                 console.log(data);
                 defer.reject();

             });

             return defer.promise;
         },


/*....................  End app_complete send service.................................... */  

/*....................  Start reschedule_appointment service.................................... */  

         reschedule_appointment: function(item, items) {
             var Url = baseurl + 'vendor/appointments/' + item + '/change?api_token=' + items;

             var defer = $q.defer();


             $http.get(Url).
             success(function(data, status, headers, config) {

                 defer.resolve(data);

             }).
             error(function(data, status, headers, config) {
                 console.log(data);
                 defer.reject();

             });

             return defer.promise;
         },

/*....................  End reschedule_appointment service.................................... */  

/*....................  Start cancel_appointment service.................................... */  

         cancel_appointment: function(item, items) {


             var Url = baseurl + 'vendor/appointments/' + items + '/cancel';

             var defer = $q.defer();


             $http.post(url, item).
             success(function(data, status, headers, config) {

                 defer.resolve(data);

             }).
             error(function(data, status, headers, config) {
                 console.log(data);
                 defer.reject();

             });

             return defer.promise;
         },

/*....................  End cancel_appointment service.................................... */  

/*....................  Start vendorInfo service.................................... */  

         vendorInfo: function(item) {
             console.log(item);
             var Url = baseurl + 'vendor/auctions/' + item.auction_id + '?api_token=' + item.api_token;

             var defer = $q.defer();


             $http.get(Url).
             success(function(data, status, headers, config) {

                 defer.resolve(data);

             }).
             error(function(data, status, headers, config) {
                 console.log(data);
                 defer.reject();

             });

             return defer.promise;
         },



/*....................  End vendorInfo service.................................... */ 


/*....................  Start vendor auction service.................................... */   
         listall: function() {
             var Url = baseurl + 'vendor/auctions';

             var defer = $q.defer();


             $http.get(Url).
             success(function(data, status, headers, config) {

                 defer.resolve(data);

             }).
             error(function(data, status, headers, config) {
                 console.log(data);
                 defer.reject();

             });

             return defer.promise;
         },

     }
/*....................  End vendor auction service.................................... */  
 })
