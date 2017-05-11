(function() { 'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyListController', ToBuyListController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyListController.$inject = ['ShoppingListCheckOffService'];
function ToBuyListController(checkoff) {
	this.getItems = function() {                                                  //*DEBUG*/ console.log('returning items of tobuy');
		return checkoff.getToBuy();
	}
	this.bought = function(index) {
		checkoff.boughtItem(index);
	}
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(checkoff) {
	this.getItems = function() {                                                  //*DEBUG*/ console.log('returning items of bought');
		return checkoff.getBought();
	}
};


function ShoppingListCheckOffService() {
	var tobuyitems = [
		{	name: 'cenoura', quantity: 3 },
		{	name: 'alface', quantity: 6 },
		{	name: 'tomate', quantity: 2 },
		{	name: 'banana', quantity: 1 },
		{	name: 'maça', quantity: 1 },
	];

	var boughtitems = [];

	this.boughtItem = function(index) {                                           //*DEBUG*/ console.log('buying item 1');
		var boughtItem = tobuyitems.splice(index, 1)[0];                            //*DEBUG*/ console.log('item:',boughtItem.name, boughtItem.quantity);
		boughtitems.push(boughtItem);
	}

	this.removeItem = function(index)	{
		return ;
	}

	this.getToBuy = function() {
		return tobuyitems;
	}
	this.getBought = function() {
		return boughtitems;
	}
}

})();