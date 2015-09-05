angular.module('starter.services', [])

//factory for authentication and login signup 

.service('Session', function() {
  this.create = function(user) {
    this.user = user;
  };
  this.destroy = function() {
    this.user = null;
  }
  return this;
})

.factory('SharedService', function() {
  var SchMediaPath = '';
  var commDelay = '';
  var cPlaying = '';
  var mediaDomain = '';
  var nextcommStart = '';
  var CommMediaPath = [];

  var addSchMedia = function(newObj) {
  
      SchMediaPath = newObj;
  };
  
  var getSchMediaPath = function(){
      return SchMediaPath;
  };
  
  var addCommMedia = function(newObj) {
      CommMediaPath.push(newObj);
  };

  var getCommMediaPath = function(){
  var item = CommMediaPath[Math.floor(Math.random()*CommMediaPath.length)];
    return item;
  };
  
  var addcommDelay = function(newObj) {
  
      commDelay = newObj;
  };

   var getcommDelay = function(){
      return commDelay;
  };
  
  
  var addcPlaying = function(newObj) {
  
      cPlaying = newObj;
  };

  var getcPlaying = function(){
      return cPlaying;
  };
  
  
  var addmediaDomain = function(newObj) {
  
      mediaDomain = newObj;
  };

  var getmediaDomain = function(){
      return mediaDomain;
  };
  
  
   var addnextcommStart = function(newObj) {
  
      nextcommStart = newObj;
  };

  var getnextcommStart = function(){
      return nextcommStart;
  };
  
    
  
  return {
    addSchMedia: addSchMedia,
    addCommMedia: addCommMedia,
    getCommMediaPath: getCommMediaPath,
    getSchMediaPath: getSchMediaPath,
    addcommDelay:addcommDelay,
    getcommDelay: getcommDelay,
    
    addnextcommStart:addnextcommStart,
    getnextcommStart: getnextcommStart,
    
    
    addcPlaying:addcPlaying,
    getcPlaying: getcPlaying,
    addmediaDomain:addmediaDomain,
    getmediaDomain: getmediaDomain,
    
    
    
  };
})

.factory('Auth', function($http,$q, $rootScope, $window, Session, ApiEndpoint) {
    
     var baseurl = ApiEndpoint.url;
     var _user = $window.localStorage['user'];
     var setUser = function (user) {
        _user = user.user;
        $window.localStorage['user'] =  _user;
     }
   
	  return {
        login: function(username, password) {
            var Url = baseurl+'applogin?email='+username+'&password='+password;
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
        setUser: setUser,
        isLoggedIn: function () {
           return $window.localStorage['user'] ? true : false;
        },
        getUser: function () {
           return $window.localStorage['user'];
        },
        logout: function () {
          $window.localStorage.removeItem('user');
           _user = null;
        },
        Profile: function(user_id) {
            var Url = baseurl+'getprofile?user_id='+user_id;
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
       
       
  
    }
        
 })
 

.factory('Church', function($http, $q, ApiEndpoint,$window) {
    
    var baseurl = ApiEndpoint.url;
	  return {
        Programe: function(categoryid,churchid) {
            var Url = baseurl+'getprogramslist/'+churchid;
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
        Mediadetails: function(mediaid,churchid) {
            var Url = baseurl+'getclientmediadeails/'+mediaid+'/'+churchid;
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
        Media: function(categoryid,churchid) {
            var Url = baseurl+'getclientmedia/'+categoryid+'/'+churchid;
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
        Archive: function(churchid) {
            var Url = baseurl+'getclientmediacategory/'+churchid;
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
        Live: function(churchid) {
            var Url = baseurl+'getclientsevent/'+churchid;
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
        
        Detail: function(churchid) {
            var Url = baseurl+'getclientdetail/'+churchid;
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
        Addfav: function(client_id,action) {
            var Url = baseurl+'appaddtoav?user_id='+$window.localStorage['user']+'&client_id='+client_id+'&action='+action;
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
        Getfav: function(user_id) {
            var Url = baseurl+'getfavouritechannel?user_id='+user_id;
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
        List: function() {
            var Url = baseurl+'getclientlist';
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
        Bylocation: function(mysrclat,mysrclong) {
            var range = 20000000;
            var Url = baseurl+'getchannelbylocation?mysrclat='+mysrclat+'&mysrclong='+mysrclong+'&range='+range;
            var defer = $q.defer();
            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        }
    }
        
 }); 
 