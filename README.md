# bamazon
## Week 12

A CLI Amazon-like storefront with two user views: 

    * **Customer** *(bamazonCustomer.js)*
      1. User is able to view a table of available products stored in the bamazon DB and their prices, ordered by **ID**
      2. User may then input product (by **ID**) and quantity to purchase via Inquirer prompts
      3. If user input is valid and stock is sufficient, purchase will be processed. Summary printed to console and product stock updated in DB

    * **Manager** *(bamazonManager.js)*
      * User may select from a list of menu options including methods for viewing and editing products in DB
        * *View Products for Sale*
          * Identical to Customer view of products (prints to console)
        * *View Low Inventory*
          * Prints table of products (**ID**, **name**, and **stock**) having stock less than 5. 
        * *Add to Inventory*
            * User may choose product (by **ID**) and add any quantity to stock via Inquirer prompts. 
        * *Add New Product*
            * User may add an entirely new product to DB by inputting **name**, **department**, **price**, and **quantity** via Inquirer prompts.
