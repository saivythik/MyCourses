(function(){
	'use strict'
	
	var app = angular.module("lancheAPP" , []);
	var VIRGULA = ",";
	var MSG_BRANCO = "Please enter data first";
	var MSG_APROVEITE = "Enjoy!";
	var MSG_MUITO = "Too much!";
	
	app.controller("lancheAPP.LuncheCTRL" , LuncheCTRL);	
	
	LuncheCTRL.$inject = ['$scope'];
	
	function LuncheCTRL ($scope) {
		$scope.descricaoLanche = "";
		$scope.mensagem = "";
		
		$scope.mostrarMensagem = function() {
			var qtdPalavras = contarQtdPalavras($scope.descricaoLanche);
			if(qtdPalavras == 0) {
				$scope.mensagem = MSG_BRANCO;
			} else if(qtdPalavras <= 3 && qtdPalavras >= 1) {
				$scope.mensagem = MSG_APROVEITE;
			} else {
				$scope.mensagem = MSG_MUITO;
			}
		}
	}
	
	function contarQtdPalavras (palavra) {
		var qtdPalara = 0;
		var palavras = palavra.split(',');
		for(var i in palavras) {
			if(palavras[i].trim() != "") {
				qtdPalara++;
			}
		}			
		return qtdPalara;
	}
})();