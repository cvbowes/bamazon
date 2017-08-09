drop database if exists bamazon;
create database bamazon;

use bamazon;

create table products (
	item_id int auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(100) not null,
    price decimal(10,2) not null,
    stock_quantity int not null,
    primary key (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("Digit spinner", "Toys", 16.00, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("Potato", "Food", 50, 3);

insert into products(product_name, department_name, price, stock_quantity)
values ("Starbucks mermaid body pillow", "Home", 300.0, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("Pink dog wig", "Pets", 32.98, 30);

insert into products(product_name, department_name, price, stock_quantity)
values ("Dragon scrubber", "Pets", 39.99, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("50 Birds of Prey", "Books", 7.99, 80);

insert into products(product_name, department_name, price, stock_quantity)
values ("Red Necktie", "Men's clothing", 18, 40);

insert into products(product_name, department_name, price, stock_quantity)
values ("Parks and Recreation Blu-ray box set", "Entertainment", 60, 5);

insert into products(product_name, department_name, price, stock_quantity)
values ("Signed Dwight K. Schrute bobblehead", "Entertainment", 1000, 1);

insert into products(product_name, department_name, price, stock_quantity)
values ("Heavily used iPad", "Gadgets & Tech", 40, 1);

insert into products(product_name, department_name, price, stock_quantity)
values ("Authentic 1830s ritual altar", "Home", 3500, 1);

select * from products;