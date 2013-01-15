'use strict';

/* Controllers */
var myApp = angular.module('myApp', []);

function mainCtrl($scope, $http) {
    $scope.tweets = [];
    $scope.activeTweet = {};
    var numTweets = 20;
    var counter = 0;

    $scope.nextTweet = function () {
        counter++;
        if(counter !== numTweets) {
            $scope.activeTweet = $scope.tweets[counter];
        } else {
           counter = 0;
           $scope.activeTweet = $scope.tweets[counter];
        }
    };

    (function () {
        $http.jsonp('https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=BSlowAndCo&count=' + numTweets + '&callback=JSON_CALLBACK').
            success(function(data) {
                angular.copy(data, $scope.tweets);
                $scope.activeTweet = $scope.tweets[counter];
                console.log($scope.tweets);
            }).error(function(data){
                console.log("Error");
            });
    })();
}

