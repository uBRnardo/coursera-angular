(function() {
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckCtrlr', LunchCheckCtrlr);

	LunchCheckCtrlr.$inject = ['$scope'];
	console.log('loaded ng-app')

	function LunchCheckCtrlr($scope) {
		$scope.lunch = "";
		$scope.evaluation = "";
		$scope.CheckLunch = function() {
			var lunch = $scope.lunch;
				// get lunch
			var lunchArray = lunch.split(',')
				// convert lunch to array
			var count = 0;
			for (var i in lunchArray) {
				var lunchItem = lunchArray[i].trim();
				if (lunchItem.length > 0) {
					count += 1;
				}
			}
			if (count <= 0) {
				$scope.evaluation = "Please enter data first";
			} else if (count <= 3) {
				$scope.evaluation = "Enjoy!";
			} else {
				$scope.evaluation = "Too much!" ;
			}
		};
	};


})();