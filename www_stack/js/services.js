angular.module('starter.services', ['firebase'])
  .factory('Stack',function($http,$q,ApiEndpoint){
  
   var baseurl =ApiEndpoint.url;
   
  // alert(baseurl);
  // var baseurl =ApiEndpoint.url;
    return{

    Login:function(username,password){
		//alert(info);
           var Url = baseurl+'login?email='+username+'&password='+password;
           
           var defer = $q.defer();
           
          // console.log(item);
           $http.post(Url).
              success(function (data, status, headers, config) {
				
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
   },
   
   fbLogin:function(username,password,name){
		//alert(info);
           var Url = baseurl+'fbLogin?email='+username+'&password='+password+'&name='+name;
           
           var defer = $q.defer();
           
          // console.log(item);
           $http.post(Url).
              success(function (data, status, headers, config) {
				
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
   },
   
   
 
  Register:function(fname,lname,email,password,image){
		//alert(image);
            var Url = baseurl+'register?fname='+fname+'&lname='+lname+'&email='+email+'&password='+password;
           
           var defer = $q.defer();
           
          // console.log(item);
           $http.post(Url,image).
              success(function (data, status, headers, config) {
				
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
   },
 
 
 Questions:function(){
		//alert(info);
            var Url = baseurl+'questions';
           
           var defer = $q.defer();
           
          // console.log(item);
           $http.post(Url).
              success(function (data, status, headers, config) {
				
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
   },
 
  CreateQuestion:function(id,title,question){
		
            var Url = baseurl+'createQuestion?title='+title+'&id='+id+'&question='+question;
           
           var defer = $q.defer();
           
          // console.log(item);
           $http.post(Url).
              success(function (data, status, headers, config) {
				
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
   },
 
       ViewQuestion:function(id,title,question){
		
            var Url = baseurl+'viewQuestions?id='+id;
           
           var defer = $q.defer();
           
          // console.log(item);
           $http.post(Url).
              success(function (data, status, headers, config) {
				
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
   },
   
   
   
   
   
     Answer:function(userId,id,answer){
		
            var Url = baseurl+'answer?id='+id+'&userId='+userId+'&answer='+answer;
           
           var defer = $q.defer();
           
          // console.log(item);
           $http.post(Url).
              success(function (data, status, headers, config) {
				
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
   }, 
 AnswerDetail:function(userId,id){
		
            var Url = baseurl+'answerDetail?id='+id+'&userId='+userId;
           
           var defer = $q.defer();
           
          // console.log(item);
           $http.post(Url).
              success(function (data, status, headers, config) {
				
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
   }, 
 
 
 
 
  }
 
})

.factory('Rooms', function ($firebase) {
  var firebaseUrl = 'https://scorching-torch-6154.firebaseio.com/';
    // Might use a resource here that returns a JSON array
    var ref = new Firebase(firebaseUrl);
    var rooms = $firebase(ref.child('rooms')).$asArray();

    return {
        all: function () {
            return rooms;
        },
        get: function (roomId) {
            // Simple index lookup
            return rooms.$getRecord(roomId);
        }
    }
    
})

.factory('Chats', function ($firebase, Rooms) {
  var firebaseUrl = 'https://scorching-torch-6154.firebaseio.com/';
    var selectedRoomId;

    var ref = new Firebase(firebaseUrl);
    var chats;

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.$remove(chat).then(function (ref) {
                ref.key() === chat.$id; // true item has been removed
            });
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        },
        
        selectRoom: function (roomId) {
            console.log("selecting the room with id: " + roomId);
            selectedRoomId = roomId;
            if (!isNaN(roomId)) {
                chats = $firebase(ref.child('rooms').child(selectedRoomId).child('chats')).$asArray();
                console.log(chats);
            }
        },
        send: function (from, message) {
            console.log("sending message from :" + from + " & message is " + message);
           
            if (from && message) {
                var chatMessage = {
                    from: from,
                    message: message,
                   // id:6,
                    createdAt: Firebase.ServerValue.TIMESTAMP
                };
                chats.$add(chatMessage).then(function (data) {
                    console.log("message added");
                });
            }
        }
    }
});



