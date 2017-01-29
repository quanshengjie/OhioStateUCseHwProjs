-- Create Tables
create table EMPLOYEES 
(
eID int not null IDENTITY,
LastName varchar(255) null,
MidInit varchar(255) null,
FirstName varchar(255) null,
PhoneNum varchar(255) null,
Birthday date null,
dID int null,
sID int null
PRIMARY KEY(eID)
);

create table DEPENDENTS
(
eID int not null,
Dep_Name varchar(255) not null,
Sex TinyINT, -- 0=not know, 1=male, 2=female, 9=not applicable
Relationship varchar(255),
Birthday date,
PRIMARY KEY(eID, Dep_Name)
);

create table WAREHOUSE
(
wID int not null IDENTITY,
Street varchar(255),
City varchar(255),
State varchar(255),
Zip varchar(255),
supID int not null,
PRIMARY KEY(wID)
);

create table ITEM
(
iID int not null IDENTITY,
name varchar(255),
weight real,
supID int not null,
PRIMARY KEY(iID),
constraint weight_item_check_positive check(weight > 0)
);

create table COUPONS
(
cID int not null IDENTITY,
Expiration datetime,
Discount real not null,
iID int not null,
PRIMARY KEY(cID)
);

create table PRESCRIPTION
(
pID int not null IDENTITY,
Doctor_name varchar(255),
Patient_name varchar(255),
sID int not null,
PRIMARY KEY(pID)
);

create table WEEKLY_AD
(
adID int not null IDENTITY,
sID int not null,
PRIMARY KEY(adID)
);

create table [ORDER]
(
oID int not null IDENTITY,
Date date,
sID int not null,
supID int not null,
primary key(oID)
);

create table SUPPLIER
(
supID int not null IDENTITY,
supplierName varchar(255) not null,
primary key(supID),
constraint supplierName_supplier_unique unique(supplierName)
);

create table SHIPMENT
(
shipID int not null IDENTITY,
Date date,
wID int not null,
sID int not null,
plateNo varchar(7) not null,
primary key(shipID)
);

create table TRUCKS
(
plateNo varchar(7) not null,
capacity real not null,
Type varchar(255),
primary key(plateNo)
);

create table INCLUDES
(
adID int not null,
cID int not null,
primary key(adID, cID)
);

create table CONSISTS_OF
(
iID int not null,
oID int not null,
primary key(iID, oID)
);

create table [CONTAINS]
(
iID int not null,
shipID int not null,
primary key(iID, shipID)
);

create table DEPARTMENT
(dID int not null IDENTITY,
 Department_name varchar(15) not null,
 Street varchar(25),
 City varchar(15),
 State char(2),
 Zip char(5),
 primary key(dID));

create table STORE
(sID int not null IDENTITY,
 Phone# char(10),
 Street varchar(25),
 City varchar(15),
 State char(2),
 Zip char(5),
 primary key(sID));

create table SHIFT
(shID int not null IDENTITY,
 HourRate real,
 StartTime datetime,
 EndTime datetime,
 sID int not null,
 primary key(shID));

create table MEMBERS
(mID int not null IDENTITY,
 LastName varchar(15),
 MidInit char(1),
 FirstName varchar(15),
 Street varchar(25),
 City varchar(15),
 State char(2),
 Zip char(5),
 Phone# char(10),
 Birthday date,
 sID int not null,
 primary key(mID));

create table WORKS
(eID int not null,
 shID int not null,
 Hour int,
 primary key(eID, shID));

create table SENT_TO
(mID int not null,
 adID int not null,
 primary key (mID, adID));

create table STOCK
(sID int not null,
 iID int not null,
 stock int,
 primary key(sID, iID)); 

create table MEMBERS_AUDIT
(
id int not null,
comments varchar(255),
primary key(id)
);
GO

-- Index automatically created by sql server are primary keys
-- Create Index
CREATE INDEX employees_name_index ON EMPLOYEES(LastName, FirstName);
CREATE INDEX item_name_index ON ITEM(Name);
CREATE INDEX item_weight_index ON ITEM(Weight);
-- The reason we choose these columns as indices is because the user may want to order by last
-- name or the first name of employees and name, weight of items.
GO
-- Load Data
INSERT INTO EMPLOYEES (LastName, MidInit, FirstName, PhoneNum, Birthday, dID, sID) 
values
 ('James','E','Borg','8886655556','1937-11-10',NULL, 1),
 ('Jennifer','S','Wallace','9876546321','1941-06-20',NULL, 4),
 ('Franklin','T','Wong','3334455575','1955-12-08',NULL, 5),
 ('Ahmad','V','Jabbar','9879879787','1969-03-29',NULL ,4),
 ('Joyce','A','English','4534534553','1972-07-31',5, NULL),
 ('Ramesh','K','Narayan','6668844444','1962-09-15',5, NULL),
 ('Alicia','J','Zelaya','9998873777','1962-09-16', 4, NULL),
 ('John','B','Smith','1234567589','1965-01-09',5, NULL);

INSERT INTO DEPENDENTS(eID, Dep_Name, Sex, Birthday, Relationship)
values
 (2,'Alice',2,'1986-04-05','Daughter'),
 (3,'Theodore',1,'1983-10-25','Son'),
 (1,'Joy',2,'1958-05-03','Spouse'),
 (4,'Abner',1,'1942-02-28','Spouse'),
 (5,'Michael',1,'1988-01-04','Son'),
 (6,'Alice',2,'1988-12-30','Daughter'),
 (7,'Elizabeth',2,'1967-05-05','Spouse');

 INSERT INTO WAREHOUSE (Street, City, State, Zip, supID)
values
('450 Stone', 'Houston', 'TX', '55000', 1),
('291 Berry', 'Bellaire', 'TX', '43000', 2),
('638 Voss', 'Houston', 'TX', '40000', 5),
('980 Dallas', 'Houston', 'TX', '25000', 4),
('5631 Rice', 'Houston', 'TX', '25000', 5),
('975 Fire Oak', 'Humble', 'TX', '55000', 5),
('450 Stone', 'Houston', 'TX', '38000', 4),
('3321 Castle', 'Spring', 'TX', '21000', 3);

INSERT INTO ITEM(name, weight, supID) 
values
('Apple', 1.0, 1),
('Apricot', 2.1, 2),
('Avocado', 0.5, 3),
('Banana', 3.2, 4),
('Bilberry', 4.3, 5),
('Blackberry', 2.5, 5),
('Blackcurrant', 1.1, 2),
('Blueberry', 6.5, 4),
('Blackcurrant', 3.234, 3),
('Cherry', 2.34, 5);

insert into COUPONS (Expiration, Discount, iID) 
values 
('2016-06-05', 0.18, 7),
('2016-01-23', 0.08, 10),
('2016-03-04', 0.12, 6),
('2015-11-17', 0.21, 8),
('2016-07-18', 0.26, 1),
('2016-04-03', 0.29, 5),
('2016-10-14', 0.23, 9),
('2016-03-14', 0.2, 8),
('2015-11-03', 0.29, 5),
('2016-05-31', 0.23, 8);

insert into PRESCRIPTION (Doctor_name, Patient_name, sID)
values
('Julia Jones', 'Jeremy Lawrence', 10),
('David Jacobs', 'Jesse Stephens', 5),
('Donna Kelley', 'Mark Sanchez', 8),
('Diane Jackson', 'Diane Evans', 7),
('Helen Morris', 'Kelly Bennett', 2),
('Keith Williamson', 'Sean Pierce', 3),
('Jeffrey Miller', 'Amanda Rose', 5),
('Samuel Alvarez', 'Clarence Schmidt', 4),
('Jose Clark', 'Marilyn Freeman', 6),
('Larry Barnes', 'Ryan Gutierrez', 1);

insert into WEEKLY_AD (sID)
values
(8),
(9),
(3),
(7),
(2),
(7),
(8),
(7),
(1),
(10);

insert into [ORDER] (Date, sID, supID)
values
 ('2016-07-21', 1, 1),
 ('2016-07-24', 1, 2),
 ('2016-08-21', 2, 2),
 ('2016-08-28', 3, 3),
 ('2016-09-01', 4, 4),
 ('2016-09-19', 5, 3),
 ('2016-09-20', 5, 1),
 ('2016-09-29', 6, 1),
 ('2016-09-30', 10, 4),
 ('2016-10-01', 7, 3),
 ('2016-10-03', 8, 5),
 ('2016-10-15', 1, 2);

insert into SUPPLIER (supplierName)
values
 ('Skimia'),
 ('Realfire'),
 ('Oyope'),
 ('Zazio'),
 ('Yacero');

insert into SHIPMENT (Date, wID, sID, plateNo)
values
 ('2016-07-23', 1, 1, 'HHY8876'),
 ('2016-07-29', 2, 1, 'SII8743'),
 ('2016-08-22', 2, 2, 'SII8743'),
 ('2016-08-29', 8, 3, 'YFD4359'),
 ('2016-09-03', 4, 4, 'FWE2929'),
 ('2016-09-22', 8, 5, 'YFD4359'),
 ('2016-09-22', 1, 5, 'HHY8876'),
 ('2016-10-01', 1, 6, 'XYU9331'),
 ('2016-10-02', 7, 10, 'ALR7401'),
 ('2016-10-05', 8, 7, 'YFD4359'),
 ('2016-10-06', 3, 8, 'QLW1893'),
 ('2016-10-18', 2, 1, 'SII8743');

insert into TRUCKS
values
 ('HHY8876', 42000, 'Dry Van'), 
 ('YFD4359', 45000, 'Dry Van'), 
 ('XYU9331', 44000, 'Refrigerated'), 
 ('SII8743', 45000, 'Refrigerated'), 
 ('FWE2929', 44000, 'Refrigerated'), 
 ('ALR7401', 42000, 'Extendable'),
 ('QLW1893', 42000, 'Extendable'); 

insert into INCLUDES
values
 (1, 2),
 (1, 3),
 (2, 3),
 (3, 3),
 (3, 8),
 (4, 8),
 (5, 8),
 (5, 10),
 (6, 10),
 (6, 1),
 (7, 1),
 (7, 5),
 (8, 1),
 (8, 5),
 (8, 7),
 (9, 7),
 (10, 7),
 (10, 4);


insert into CONSISTS_OF
values
 (1, 1),
 (2, 1),
 (10, 1),
 (8, 2),
 (10, 3),
 (8, 3),
 (4, 4),
 (1, 4),
 (5, 5),
 (6, 5),
 (3, 5),
 (9, 5),
 (7, 6),
 (8, 6),
 (1, 6),
 (2, 7),
 (3, 7),
 (4, 8),
 (10, 8),
 (1, 8),
 (2, 9),
 (3, 10),
 (6, 10),
 (7, 11),
 (8, 11),
 (10, 11),
 (5, 12),
 (6, 12);

insert into [CONTAINS]
values
 (1, 1),
 (2, 1),
 (10, 1),
 (8, 2),
 (10, 3),
 (8, 3),
 (4, 4),
 (1, 4),
 (5, 5),
 (6, 5),
 (3, 5),
 (9, 5),
 (7, 6),
 (8, 6),
 (1, 6),
 (2, 7),
 (3, 7),
 (4, 8),
 (10, 8),
 (1, 8),
 (2, 9),
 (3, 10),
 (6, 10),
 (7, 11),
 (8, 11),
 (10, 11),
 (5, 12),
 (6, 12);

Insert into DEPARTMENT (Department_name, Street, City, State, Zip)
values
 ('Administration', '7290 Main St.', 'Columbus', 'OH', '43215'),
 ('Marketing', '6895 Park St.', 'Chicago', 'IL', '60601'),
 ('Human Resources', '1020 Mason St.', 'Atlanta', 'GA', '30303'),
 ('Operations', '2001 Springfield Blvd.', 'Philadelphia', 'PA', '19102'),
 ('Finance', '5888 Symmetra Blvd.', 'Charlotte', 'NC', '28202'),
 ('IT','1832 Angola Ave.', 'Orlando', 'FL', '32801');

Insert into STORE (Phone#, Street, City, State, Zip)
values
 ('6143808124', '7123 Birch St.', 'Columbus', 'OH', '43201'),
 ('5134538148', '5022 Cedar Ave.', 'Cincinnati', 'OH', '45205'),
 ('2168201845', '2335 Oak St.', 'Cleveland', 'OH', '44101'),
 ('3124458181', '3881 Summer Ave.', 'Chicago', 'IL','60615'),
 ('4129446215', '9435 Washington Ave.', 'Pittsburgh', 'PA', '15204'),
 ('7342468182', '2426 Jackson Blvd.', 'Ann Arbor', 'MI', '48106'),
 ('6789906424', '6440 Peach Tree St.', 'Atlanta', 'GA', '30308'),
 ('4078713522', '4441 Orange Rd.', 'Orlando', 'FL', '32809'),
 ('7042456603', '3553 Augustus Ave.', 'Charlotte', 'NC', '28220'),
 ('2155359900', '7990 Pine Hill Rd.', 'Philadelphia', 'PA', '19108');

Insert into MEMBERS (LastName, MidInit, FirstName, Street, City, State, Zip, Phone#, Birthday, sID)
values
 ('Smith', 'C', 'John', '2844 Lumiose Blvd.', 'Columbus', 'OH', '43201', '6142832990', '1993-09-23', 1),
 ('Turner', 'T', 'Ashley', '9902 Green Meadows St.', 'Columbus', 'OH', '43201', '6146436643', '1990-12-01', 1),
 ('Lee', 'H', 'Alan', '4431 Hill Ave.', 'Cincinnati', 'OH', '45205', '5135563354', '1984-01-30', 2),
 ('Johnson', 'I', 'Nancy', 'Stanbury Rd.', 'Cleveland', 'OH', '44101', '2169831345', '1962-02-15', 3),
 ('Dawson', 'H', 'Kevin', '1040 Crescent Dr.', 'Chicago', 'IL', '60615', '3129337227', '1970-03-23', 4),
 ('Campbell', 'E', 'Macy', '4848 Sunrise Blvd.', 'Chicago', 'IL', '60615', '3123446477', '1995-06-03', 4),
 ('Wang', 'T', 'Ellie', '3341 Northeast Ave.', 'Pittsburgh', 'PA', '15204', '4124456526', '1954-07-05', 5),
 ('Carter', 'D', 'Derek', '6800 Orchard St.', 'Ann Arbor', 'MI', '48106', '7348551333', '1968-11-30', 6),
 ('Atkinson', 'C', 'Mary', '1009 Fox Bend Dr.', 'Atlanta', 'GA', '30308', '6782246477', '1972-01-22', 7),
 ('Elliot', 'A', 'Joanne', '5455 Harbor Light Rd.', 'Orlando', 'FL', '32809', '4072118500', '1964-04-16', 8),
 ('Cortez', 'S', 'James', '7277 Millenia Ave.', 'Orlando', 'FL', '32810', '4072568101', '1994-12-18', 8),
 ('Patterson', 'W', 'Raymond', '1033 Aqua Vista Blvd.', 'Charlotte', 'NC', '28220', '7045542562', '1985-10-22', 9),
 ('Wilson', 'G', 'Aaron', '1552 Whitefur Dr.', 'Philadelphia', 'PA', '19108', '2155671235', '1977-08-01', 10);

Insert into SHIFT (HourRate, StartTime, EndTime, sID)
values
 (9.75, '20161023 08:00:00 AM', '20161023 02:00:00 PM', 1),
 (9.75, '20161023 02:00:00 PM', '20161023 08:00:00 PM', 1),
 (8.50, '20161023 04:00:00 PM', '20161023 10:00:00 PM', 1),
 (8.75, '20161023 09:00:00 AM', '20161023 03:00:00 PM', 2),
 (8.75, '20161023 03:00:00 PM', '20161023 09:00:00 PM', 2),
 (9.25, '20161023 09:00:00 AM', '20161023 02:00:00 PM', 3),
 (9.50, '20161023 02:00:00 PM', '20161023 06:00:00 PM', 3),
 (9.50, '20161023 06:00:00 PM', '20161023 10:00:00 PM', 3),
 (8.50, '20161023 09:00:00 AM', '20161023 03:00:00 PM', 4),
 (8.75, '20161023 03:00:00 PM', '20161023 09:00:00 PM', 4),
 (9.00, '20161023 08:00:00 AM', '20161023 02:00:00 PM', 5),
 (9.00, '20161023 02:00:00 PM', '20161023 06:00:00 PM', 5),
 (9.25, '20161023 06:00:00 PM', '20161023 10:00:00 PM', 5),
 (8.75, '20161023 09:00:00 AM', '20161012 03:00:00 PM', 6),
 (9.00, '20161023 03:00:00 PM', '20161023 09:00:00 PM', 6),
 (9.50, '20161023 09:00:00 AM', '20161023 03:00:00 PM', 7),
 (9.75, '20161023 03:00:00 PM', '20161023 09:00:00 PM', 7),
 (9.75, '20161023 08:00:00 AM', '20161023 02:00:00 PM', 8),
 (10.00, '20161023 02:00:00 PM', '20161023 08:00:00 PM', 8),
 (10.00, '20161023 08:00:00 AM', '20161023 02:00:00 PM', 9),
 (10.00, '20161023 02:00:00 PM', '20161023 08:00:00 PM', 9),
 (9.00, '20161023 09:00:00 AM', '20161023 03:00:00 PM', 10),
 (9.25, '20161023 03:00:00 AM', '20161023 09:00:00 PM', 10);

Insert into WORKS (eID, shID, Hour)
values
 (1, 2, 6),
 (2, 4, 6),
 (3, 7, 4),
 (3, 8, 4),
 (4, 12, 4),
 (4, 13, 4);

Insert into SENT_TO (mID, adID)
values
(1, 2),
(2, 6),
(3, 3),
(4, 4),
(5, 1),
(6, 7),
(7, 9),
(8, 10),
(9, 8),
(10, 5),
(11, 5),
(12, 1),
(13, 4);


Insert into STOCK (sID, iID, stock)
values
(1, 6, 100),
(2, 2, 50),
(3, 5, 75),
(4, 3, 100),
(5, 1, 80),
(6, 7, 25),
(7, 9, 30),
(8, 8, 45),
(9, 10, 10),
(10, 4, 15),
(3, 6, 100),
(3, 2, 50),
(3, 3, 100),
(3, 1, 80),
(3, 7, 25),
(3, 9, 30),
(3, 8, 45),
(3, 10, 10),
(3, 4, 15);
GO
-- Create Constraints
alter table EMPLOYEES
add constraint employees_dID_key foreign key(dID) references DEPARTMENT(dID);

alter table EMPLOYEES
add constraint employees_sID_key foreign key(sID) references Store(sID);

alter table DEPENDENTS
add constraint dependents_eID_key foreign key(eID) references EMPLOYEES(eID);

alter table WAREHOUSE
add constraint warehouse_supID_key foreign key(supID) references SUPPLIER(supID);


alter table ITEM
add constraint item_supID_key foreign key(supID) references SUPPLIER(supID);


alter table COUPONS
add constraint coupons_iID_key foreign key(iID) references ITEM(iID);


alter table PRESCRIPTION
add constraint prescription_sID_key foreign key(sID) references Store(sID);


alter table WEEKLY_AD
add constraint weekly_ads_sID_key foreign key(sID) references Store(sID);


alter table [ORDER]
 add constraint store_for_order_key foreign key(sID) references STORE(sID);

alter table [ORDER] 
 add constraint supplier_for_order_key foreign key(supID) references SUPPLIER(supID);

alter table SHIPMENT
 add constraint warehouse_for_shipment_key foreign key(wID) references WAREHOUSE(wID);

alter table SHIPMENT
 add constraint store_for_shipment_key foreign key(sID) references STORE(sID);

alter table SHIPMENT
 add constraint truck_for_shipment_key foreign key(plateNo) references TRUCKS(plateNo);

alter table INCLUDES
 add constraint ad_includes_key foreign key(adID) references WEEKLY_AD(adID);

alter table INCLUDES
 add constraint coupons_included_key foreign key(cID) references COUPONS(cID);

alter table CONSISTS_OF
 add constraint consists_of_item_key foreign key(iID) references ITEM(iID);

alter table CONSISTS_OF
 add constraint order_consists_of_key foreign key(oID) references [ORDER](oID);

alter table [CONTAINS]
 add constraint items_contained_key foreign key(iID) references ITEM(iID);

alter table [CONTAINS]
 add constraint shipment_contains_key foreign key(shipID) references SHIPMENT(shipID);

alter table SHIFT add constraint shift_sID_key foreign key(sID) references STORE(sID);
alter table MEMBERS add constraint members_sID_key foreign key(sID) references STORE(sID);
alter table WORKS add constraint works_eID_key foreign key(eID) references EMPLOYEES(eID);
alter table WORKS add constraint works_shID_key foreign key(shID) references SHIFT(shID);
alter table SENT_TO add constraint sent_to_mID_key foreign key(mID) references MEMBERS(mID);
alter table SENT_TO add constraint sent_to_adID_key foreign key(adID) references WEEKLY_AD(adID);
alter table STOCK add constraint stock_sID_key foreign key(sID) references STORE(sID);
alter table STOCK add constraint stock_iID_key foreign key(iID) references ITEM(iID);
GO
-- Create Triggers
-- This trigger will add a row into a audit table when it suspect that 
-- someone has more than one membership. This help to enforce the constain that
-- a person can only has one membership.
create trigger membership_after_trigger on MEMBERS after insert
as
declare @mID int;
declare @LastName varchar(255);
declare @MidInit varchar(255);
declare @FirstName varchar(255);
declare @Street varchar(255);
declare @City varchar(255);
declare @State varchar(255);
declare @Zip varchar(255);
declare @Phone# varchar(255);
declare @Birthday date;
declare @sID int;

select @mID=m.mID from inserted m;
select @LastName=m.LastName from inserted m;
select @MidInit=m.MidInit from inserted m;
select @FirstName=m.FirstName from inserted m;
select @Street=m.Street from inserted m;
select @City=m.City from inserted m;
select @State=m.State from inserted m;
select @Zip=m.Zip from inserted m;
select @Phone#=m.Phone# from inserted m;
select @Birthday=m.Birthday from inserted m;
select @sID=m.sID from inserted m;

begin
	if((select count(m.mID) from MEMBERS as m where m.LastName=@LastName and m.MidInit=@MidInit and
				   m.FirstName = @FirstName and m.Street = @Street and m.City = @City and m.State= @State and
				   m.Zip = @Zip and m.Phone# = @Phone# and m.Birthday=@Birthday and m.sID=@sID) > 1)
	begin
		insert into MEMBERS_AUDIT(id, comments)
		values
		(@mID, 'After Insert: This member seems like already exsits.');
		PRINT 'After Insert: A Duplicate member being added';
	end
end
go

create trigger membership_after_trigger_update on MEMBERS after update
as
declare @mID int;
declare @LastName varchar(255);
declare @MidInit varchar(255);
declare @FirstName varchar(255);
declare @Street varchar(255);
declare @City varchar(255);
declare @State varchar(255);
declare @Zip varchar(255);
declare @Phone# varchar(255);
declare @Birthday date;
declare @sID int;

select @mID=m.mID from inserted m;
select @LastName=m.LastName from inserted m;
select @MidInit=m.MidInit from inserted m;
select @FirstName=m.FirstName from inserted m;
select @Street=m.Street from inserted m;
select @City=m.City from inserted m;
select @State=m.State from inserted m;
select @Zip=m.Zip from inserted m;
select @Phone#=m.Phone# from inserted m;
select @Birthday=m.Birthday from inserted m;
select @sID=m.sID from inserted m;

begin
	if((select count(m.mID) from MEMBERS as m where m.LastName=@LastName and m.MidInit=@MidInit and
				   m.FirstName = @FirstName and m.Street = @Street and m.City = @City and m.State= @State and
				   m.Zip = @Zip and m.Phone# = @Phone# and m.Birthday=@Birthday and m.sID=@sID) > 1)
	begin
		insert into MEMBERS_AUDIT(id, comments)
		values
		(@mID, 'After Update: This member seems like already exsits.');
		PRINT 'After Update: A Duplicate member being added';
	end
end
go

-- This trigger enforce the constain that only employees working in store 
-- can have shifts.
create trigger works_triger_instead on WORKS instead of insert
as
declare @eID int;
declare @shID int;
declare @hour int;
select @eID=w.eID from inserted w;
select @shID=w.shID from inserted w;
select @hour=w.Hour from inserted w;
declare @dID int;
declare @sID int;
begin
	set @dID = (select e.dID from EMPLOYEES as e where e.eID=@eID);
	set @sID = (select e.sID from EMPLOYEES as e where e.eID=@eID);
	if(@dID is not null or @sID is null)
	begin
		RAISERROR ('Cannot create shift for employee not working in store.',16,1);
		ROLLBACK;
	end
	else
	begin
		insert into WORKS values(@eID, @shID, @hour);
		COMMIT;
		PRINT 'Work Instead: Work on shift record added.'
	end
end
go
-- We tested the triggers on MEMBERS by inserting duplicate rows (all attributes are same 
-- except mID).
-- We tested the trigger on WORKS by inserting a row that has a employee not working in
-- a store and also a employee working in the store to test the two conditions in the 
-- trigger.