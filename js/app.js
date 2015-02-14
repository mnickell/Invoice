(function(){
	//Create the Invoice module using ngRoute as a dependency
	var app = angular.module('invoice', ['ngRoute']);

	//Configure the routing
	app.config(getRoutes);

	//Create the Controller
	app.controller('InvoiceController', ['$scope', function($scope){

		//Initial object of invoice details
		$scope.details = {
			invoiceNumber: 	'',
			customer: 		'',
			date: 			'',
			lineItems: 		[]
		};

		//List of available products
		/**
		 * In a real setting, this would be obtained by recieving the data from a server
		 * rather than loading in a list of objects manually.
		 */
		$scope.products = window.products;

		/**
		 * Direct the window location to the invoice page and reload the page
		 * in order to reset the app
		 * @return {none}
		 */
		$scope.newInvoice = function(){
			window.location.href = '#/invoice';
			window.location.reload();
		}

		/**
		 * Obtain the total price of the particular line and ensure it is sent back
		 * as a 2 decimal point float
		 * @param  {Integer} quantity
		 * @param  {Float}   price
		 * @return {Float}
		 */
		$scope.itemTotal = function(quantity, price){
			var total = quantity * price;
			return parseFloat(total.toFixed(2));
		}

		/**
		 * Calculate the subtotal of the entire invoice
		 * @return {Float}
		 */
		$scope.subtotal = function(){
			var subtotal = 0.0;
			//Loop over line items
			angular.forEach($scope.details.lineItems, function(item, key){
				//Add the result of multiplying the quantity and price
				subtotal += (item.quantity * item.price);
			});
			return subtotal;
		}

		/**
		 * Calculate the total amount of tax due on the invoice and
		 * set the tax to be 2 decimal places
		 * @return {Float}
		 */
		$scope.tax = function(){
			return parseFloat(((6 * $scope.subtotal())/100).toFixed(2));
		}

		/**
		 * Calculate the grand total of the invoice
		 * @return {Float}
		 */
		$scope.grandtotal = function(){
			return $scope.tax() + $scope.subtotal();
		}

		/**
		 * Adds the selected product item to the array of line items on the invoice
		 * Sets the "added" flag to true
		 * @param {Object} item
		 */
		$scope.addItem = function(item){
			//Set flag to true to indicate the item has been added for display purposes
			item.added = true;
			//Append to lineItems array
			$scope.details.lineItems.push(item);
		}

		/**
		 * Saves the invoice to the database
		 * @return {none}
		 */
		$scope.saveInvoice = function(){
			/**
			 * In a real setting, this would make an ajax call to a server, 
			 * and pass the $scope.details object to be saved in a database.
			 */
			alert('Invoice Number ' + $scope.details.invoiceNumber + ' saved!');
		}
	}]);
	
	/**
	 * Set the specific routes for the app
	 * @param  {Object} $routeProvider
	 * @return {none}
	 */
	function getRoutes($routeProvider){
		$routeProvider
			.when('/', {templateUrl: 'js/partials/home.html'})
			.when('/invoice', {templateUrl: 'js/partials/invoice.html'})
			.when('/products', {templateUrl: 'js/partials/products.html'})
			.otherwise({ redirectTo: '/' });
	}
})();
