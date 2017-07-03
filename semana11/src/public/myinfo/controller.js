(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['info','ApiPath', 'InfoService'];
function InfoController(info, ApiPath, InfoService) { var _this = this;
  _this.infosrvc = InfoService;
  _this.info = info;
  _this.basePath = ApiPath;
}


})();
