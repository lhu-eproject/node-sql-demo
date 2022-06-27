-- Create user, database and grant privileges
create user app@localhost identified by '123456';
create database auto_purchase;
grant all privileges on auto_purchase.* to app@localhost;

-- Create tables
use auto_purchase;
create table company(
	`id` int auto_increment,
    `name` nvarchar(255) not null,
	constraint `company_pk` primary key (`id`)
);
create table product(
	`id` int auto_increment,
    `code` varchar(255) not null,
    `name` nvarchar(255) not null,
    `company_id` int not null,
    constraint `product_pk` primary key (`id`),
    constraint `product_company_fk`
		foreign key (`company_id`) references company(`id`)
);

-- Insert sample data
insert into company(`name`) values (N'DOW Việt Nam');
insert into company(`name`) values (N'Công ty bán');
insert into product(`code`, `name`, `company_id`) values ('SP001', N'Sơn', 1);
insert into product(`code`, `name`, `company_id`) values ('SP002', N'Thùng rỗng', 1);
insert into product(`code`, `name`, `company_id`) values ('SP003', N'Cuộn thép', 1);
