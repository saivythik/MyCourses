(function() {
  'use strict';

angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.directive("foundItems", FoundItems);


function FoundItems() {
  var ddo = {
    templateUrl: 'item.html',
    scope: {
      found: '<list',
      onremove: '&'
    },
    controller: DirectiveController,
    controllerAs: 'c',
    bindToController: true
  };

  return ddo;
}



function DirectiveController() {
  var c = this;

  c.error = function () {
    if (c.found == undefined) {
      return false;
    }

    else {
      if ((c.found).length == 0) {
        return true;
      }
      else {
        return false;
      }
    }
  };

}




NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;
  var itemList = [];
  ctrl.searchTerm = "";

  ctrl.narrow = function () {
    ctrl.found = [];
    var promise= MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
    promise.then(function (response) {

      itemList = response.data;

      if ((ctrl.searchTerm) != 0) {
        for (var i = 0; i < itemList.menu_items.length; i++) {
          var item = itemList.menu_items[i].name;
          if (item.toLowerCase().search((ctrl.searchTerm).toLowerCase()) != -1) {
            (ctrl.found).push(item);
          }
        }
      }

    },
    function () {
      console.log("Error");
    });

  };


  ctrl.remove = function (index) {
    (ctrl.found).splice(index, 1);
  };
}




MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function () {
    var response = $http ({
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    });

    return response;
  };


}

}());
