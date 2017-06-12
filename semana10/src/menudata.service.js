(function () {
'use strict';

angular.module('MenuData')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) { var _this = this;

	var categoriesUrl = 'https://davids-restaurant.herokuapp.com/categories.json';

	_this.getAllCategories = function() {                                  /*DEBUG*/ console.log('fetching:', categoriesUrl);
    return $http({
      method: "GET",
      url: categoriesUrl,
    })
    .then( function (response) {                                               /*DEBUG*/ console.log('got response: ', response.data);
      return response.data;;
    })
    .catch(function(error){
      console.log("error:", error);
    });
	};

	var catItemsUrl = 'https://davids-restaurant.herokuapp.com/menu_items.json';

	_this.getItemsForCategory = function(categoryShortName) {                     /*DEBUG*/ console.log('gettingItemsForCategory:', categoryShortName);
    return $http({
      method: "GET",
      url: catItemsUrl,
      params: {category: categoryShortName}
    })
    .then( function (response) {                                               /*DEBUG*/ console.log('gotItemsForCategory: ', response.data);
      var items = response.data.menu_items;

      return items;
    })
    .catch(function(error){
      console.log("error:", error);
    });
	};

}


})();
