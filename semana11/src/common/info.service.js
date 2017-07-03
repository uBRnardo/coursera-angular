(function () {
"use strict";

angular.module('common')
.service('InfoService', InfoService);

function InfoService() { var _this = this;

  _this.saved = false;

  _this.info = [];

  _this.set = function (info) {    /*DEBUG*/ console.log("definindo informação:", info);   
    _this.info = info;

    if (_this.info) {
      _this.saved = true;
    }
    else {
      _this.saved = false;
    }
  };

  _this.get = function () { /*DEBUG*/ console.log("obtendo informação:", _this.info);   
    return _this.info;
  };

}



})();
