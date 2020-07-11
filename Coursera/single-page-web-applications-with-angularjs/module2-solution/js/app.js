(function() {
  'use strict';

angular.module("ShoppingListCheckOff", [])
.controller("ToBuyController", ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("service", ShoppingListCheckOffService);



ToBuyController.$inject = ['service'];
function ToBuyController(service) {
 var buy = this;
 buy.list = service.getBuyList();
 buy.remove = function (index) {
   service.removeFromBuy(index);
 };
}



AlreadyBoughtController.$inject = ['service'];
function AlreadyBoughtController(service) {
 var bought = this;
 bought.list = service.getBoughtList();
}



function ShoppingListCheckOffService() {
  var shop = this;
  var toBuyList = [
    {
      name: "Chips",
      quantity: "10 bags"
    },
    {
      name: "Drinks",
      quantity: "15 bottles"
    },
    {
      name: "Cookies",
      quantity: "5 bags"
    },
    {
      name: "Sanitizer",
      quantity: "5 bottles"
    },
    {
      name: "Masks!!",
      quantity: "5"
    }
  ];

  var boughtList = [];

  shop.getBuyList = function () {
    return toBuyList;
  };

  shop.getBoughtList = function () {
    return boughtList;
  };

  shop.removeFromBuy = function (index) {
    var itemArray = toBuyList.splice(index, 1);
    shop.addToBought(itemArray[0]);
  };

  shop.addToBought = function (item) {
    boughtList.push(item);
  };

}
}());
