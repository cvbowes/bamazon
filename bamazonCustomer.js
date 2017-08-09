var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "passw0rd",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  showItems();
});


function showItems() {
	connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
		var table = new Table({
			head: ['ID', 'Name', 'Price']
			, colWidths: [10, 40, 15]
		});

		var id, name, price;

		for (var i = 0; i < res.length; i++) {
		 	id = res[i].item_id;
		  	name = res[i].product_name;
		  	price = '$' + res[i].price.toFixed(2);
			table.push([id, name, price]);
		}

		console.log(table.toString());

		startShopping();
	});
}

function startShopping() {
	inquirer
		.prompt([{
			name: "id",
			type: "input",
			message: "Enter the ID of the item you would like to purchase: ",

		}, {
			name: "qty",
			type: "input",
			message: "Enter the quantity you would like to purchase: "

		}])
		.then(function(answers) {
			var purchaseID = answers.id;
			var purchaseQty = parseInt(answers.qty);

			connection.query("SELECT * FROM products WHERE item_id=?", 
				[parseInt(purchaseID)], function(err, res) {
					if (err) throw err;

					if (res.length === 0) {
						console.log("Sorry, no item matching ID " + purchaseID);
						startShopping();

					} else if (purchaseQty > res[0].stock_quantity) {
						console.log("Insufficient quantity of " + res[0].product_name);
						startShopping();
					} else {
						console.log("Completing purchase...");
						connection.query(
							"UPDATE products SET ? WHERE ?",
							[
								{
									stock_quantity: res[0].stock_quantity - purchaseQty
								},
								{
									item_id: purchaseID
								}
							],
							function(err, result) {
								var total = (parseInt(purchaseQty) * parseFloat(res[0].price)).toFixed(2);

								console.log("Purchased " + purchaseQty + " of " + res[0].product_name + ".");
								console.log("Total: $" + total);

								nextAction();
							});
					}
				})
		});
}

function nextAction() {
	inquirer
		.prompt({
			name: "again",
			type: "list",
			message: "Would you like to shop again?",
			choices: ["YES", "NO"]
		})
		.then(function(answer) {
			if (answer.again === "YES") {
				startShopping();
			} else {
				connection.end();
			}
		})
}