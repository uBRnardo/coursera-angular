(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['categoriesList'];
function CategoriesController(categoriesList) { var _this = this;
  _this.categoriesList = categoriesList;
}

})();
