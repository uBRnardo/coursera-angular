(function () {
'use strict';


angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: 'src/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    template: '<h1>All Categories</h1><categories category-list="ctrl.categoriesList"></categories>',
    controller: 'CategoriesController as ctrl',
    resolve: {
      categoriesList: [
        'MenuDataService',
        function (MenuDataService) {       /*DEBUG*/ console.log("registering categories resolver");
          return MenuDataService.getAllCategories();
        }
      ]
    }
  })

  .state('items', {
    url: '/items/{categoryShortName}',
    template: '<h1>Category Items</h1><items item-list="ctrl.categoryItems"></items>',
    controller: 'ItemsController as ctrl',
    resolve: {
      categoryItems: [
        '$stateParams',
        'MenuDataService',
        function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
            .then(function (items) { /*DEBUG*/ console.log("returning categoryItems:", items);
              return items;
            });
        }
      ]
    }
  });
}


})();
