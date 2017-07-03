(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService','InfoService'];
function SignUpController(MenuService, InfoService) { var _this = this;
  _this.user = [];

  _this.submitted = 0;

  _this.submit = function() {
  	var favorite = _this.user.favorite;
  	if (favorite) {
      MenuService.getMenuItem(favorite).then(function (ret) {
        var item = ret;

    		if (item) {                /*DEBUG*/ console.log("salvando item:", item);    
    			_this.user.item = item;

    			InfoService.set(_this.user);

    			_this.submitted = 1;
    		}
    		else {
    			_this.submitted = -1;
    		}
      })
      .catch(function(error) {
        console.log("signup erro: " + error)
      })
  	}
  }

}


})();
