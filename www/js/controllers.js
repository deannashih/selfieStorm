angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaCamera, selfieService) {

  $scope.newPhoto = {
    image: 'some string'
  };

  $scope.takePhoto = function(){
    console.log('take selfie');

      var options = {
        quality: 5,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true,
        cameraDirection:1
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        // var image = document.getElementById('myImage');

        $scope.newPhoto.image = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        console.error("selfie error:", err);
      });
  } //end takePhoto
  $scope.savePhoto = function(){
    console.log($scope.newPhoto);

    selfieService.savePhoto($scope.newPhoto)
    .then(function(data){
      console.log('photo saved: ', data);
      //redirect to gallery
    }, function(err){

    });
  }
}) // end controller DashCtrl

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.vibrate = function(){
    console.log("vibrate");
    navigator.vibrate(100);
  }
});
