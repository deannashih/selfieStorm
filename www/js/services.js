angular.module('starter.services', [])

.factory('selfieService', function($http, $q, API_URL) {
  // Might use a resource here that returns a JSON array

  function savePhoto(photo){
    console.log("in service, photo received", photo);
      var deferred = $q.defer();

    $http.post(`${API_URL}/api/photos`, photo)
    .then(function(data){
      console.log("in service, photo saved: ", data);
      deferred.resolve(data);
    }, function(err){
      deferred.reject(err);
    });

    console.log("in service, before returning promise: ", deferred);

    return deferred.promise;
  }
  return {
    savePhoto:savePhoto
  }

});
