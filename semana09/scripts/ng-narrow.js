(function() { 'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownAppController', NarrowItDownAppController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      foundItems: '<',
      onRemove: '&',
      isEmpty: '&'
    }
    // ,controller: NarrowItDownAppController,
    // controllerAs: 'narrowapp',
    // bindToController: true
  };

  return ddo;
}

NarrowItDownAppController.$inject = ['MenuSearchService'];
function NarrowItDownAppController(MenuSearchService) { var _this = this;
	_this.searchTerm = "";

	_this.foundItems;

	_this.narrow = function() {                                                   /*DEBUG*/ console.log('narrowing for:',_this.searchTerm);
		MenuSearchService.getMatchedMenuItems(_this.searchTerm)
		.then(function(result) {                                                 /*DEBUG*/ console.log('got response:',result);
			_this.foundItems = result;
		})
		.catch(function(error){
			console.log("error:", error);
		})
	}

  _this.onRemove = function(index) {                                             /*DEBUG*/ console.log('removing:',index);
    _this.foundItems.splice(index, 1);
  }

	_this.isEmpty = function() {                                             
    if ( (_this.foundItems != undefined) & (_this.foundItems.length == 0) )  {                      /*DEBUG*/ console.log('isEmpty');
      return true;
    }
    else {                                                                    /*DEBUG*/ console.log('isNotEmpty');
      return false;
    }
  }

}

MenuSearchService.$inject = ['$q', '$http'];
function MenuSearchService($q, $http) { var _this = this;

	var itemsUrl = 'https://davids-restaurant.herokuapp.com/menu_items.json';

	_this.getMatchedMenuItems = function(term) {                                  /*DEBUG*/ console.log('fetching:',itemsUrl);
   	var deferred = $q.defer();
    var foundItems = [];

    if (term.trim() == "") {
      deferred.resolve(foundItems);

      return deferred.promise;
    }
    else {
      return $http({
        method: "GET",
        url: itemsUrl,
      })
      .then( function (response) {                                               /*DEBUG*/ console.log('got: ',response.data);
        var items = response.data.menu_items;

        for (var i in items) {                                                   /*DEBUG*/ console.log('checking:',i);
          var item = items[i];

          if (item.description.search(term) > 0) {                               /*DEBUG*/ console.log('searching:',term);
            foundItems.push(item);                                               /*DEBUG*/ console.log('pushing:',item);
          }
        }
        return foundItems;
      })
      .catch(function(error){
        console.log("error:", error);
      });
    }
	}
}

})();