angular.module('redditClone', ['ui.router'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostCtrl'
    });
    $urlRouterProvider.otherwise('home');
}])
.factory('posts', [function () {
  var o = {
    posts: []
  }
  return o;
}])
.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts) {
    $scope.test = "Hello World";
    $scope.posts = posts.posts;

    $scope.addPost = function() {
      if($scope.title === '') {return;}
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes:0,
        comments: [
          {author:'Anirvan', body:'This is awesome!', upvotes:0},
          {author:'Roni', body:'Great Job with the App!', upvotes:0}
        ]
      });
      $scope.title = '';
      $scope.link = '';
    }

    $scope.incrementUpvotes = function (post) {
      post.upvotes += 1;
    }
  }
])
.controller('PostCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function () {
      if($scope.body === '') {return;}
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    }
}]);