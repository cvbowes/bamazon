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
  menu();
});

function menu() {
	inquirer
		.prompt({
			name: "action",
			type: "list",
			message: "What would you like to do?",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
		})
		.then(function(answer) {
			switch (answer.action) {
				case "View Products for Sale":
					showItems();
					break;

				case "View Low Inventory":
					showLowInv();
					break;

				case "Add to Inventory":
					addToInv();
					break;

				case "Add New Product":
					newProductInfo();
					break;

				case "Quit":
					connection.end();
					break;
			}
		});
}

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

		menu();
	});
}

function showLowInv() {
	connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5", function(err, res) {
		var table = new Table({
			head: ['ID', 'Name', 'Stock']
			, colWidths: [10, 40, 15]
		});

		var id, name, stock;

		for (var i = 0; i < res.length; i++) {
		 	id = res[i].item_id;
		  	name = res[i].product_name;
		  	stock = res[i].stock_quantity;
			table.push([id, name, stock]);
		}

		console.log(table.toString());

		menu();
	});
}

function addToInv() {
	inquirer
		.prompt([{
			name: "id",
			type: "input",
			message: "ID of the item you would like to update: "
		
		},{
			name: "qty",
			type: "input",
			message: "Quantity to add: "

		}])
		.then(function(answers) {
			var updateID = parseInt(answers.id);
			var updateQty = parseInt(answers.qty);

			if(!updateID || !updateQty) {
				console.log ("Please enter a valid numerical ID and quantity");
				addToInv();
			} else {
				updateStock(updateID, updateQty);
			}
		});
}

function updateStock(id, qty) {
	connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE item_id=?",
		[id], function(err, res) {
			if (err) throw err;

			if (res.length === 0) {
				console.log("Sorry, no item matching ID " + id);
				addToInv();
			} else {
				console.log("Adding " + qty + " of " + res[0].product_name + "...");
				connection.query(
					"UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: res[0].stock_quantity + qty
						},
						{
							item_id: id
						}
					],
					function(err, result) {
						console.log(result.affectedRows + " products successfully updated!\n");

						menu();
					});
			}
		});
}

function newProductInfo() {
	inquirer
		.prompt([{
			name: "name",
			type: "input",
			message: "Name of product to be added: "

		}, {
			name: "department",
			type: "input",
			message: "Department of product to be added: "

		}, {
			name: "price",
			type: "input",
			message: "Price of product to be added: "

		}, {
			name: "qty",
			type: "input",
			message: "Quantity of product to be added: "

		}])
		.then(function(answers) {
			var name = answers.name;
			var dept = answers.department;
			var price = parseFloat(answers.price);
			var qty = parseInt(answers.qty);

			if(!name || !dept || !price || !qty) {
				console.log("Please enter valid Name, Department, Price, and Quantity of product to be added.");
				newProductInfo();

			} else {
				addProduct(name, dept, price, qty);
			}
		});
}

function addProduct(name, dept, price, qty) {
	console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
     	product_name: name,
     	department_name: dept,
      price: price,
      stock_quantity: qty
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
	    
	    menu();
    }
  );
}
