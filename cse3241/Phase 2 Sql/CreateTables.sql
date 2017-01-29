use Store;
create table EMPLOYEES 
(
eID int not null IDENTITY,
LastName varchar(255),
MidInit varchar(255),
FirstName varchar(255),
PhoneNum varchar(255),
Birthday date,
dID int,
sID int
PRIMARY KEY(eID)
);

create table DEPENDENTS
(
eID int not null,
Dep_Name varchar(255) not null,
Sex TinyINT, -- 0=not know, 1=male, 2=female, 9=not applicable
Relationship varchar(255),
Birthday date
PRIMARY KEY(eID, Dep_Name)
);

create table WAREHOUSE
(
wID int not null IDENTITY,
Street varchar(255),
City varchar(255),
State varchar(255),
Zip varchar(255),
supID int not null
PRIMARY KEY(wID)
);

create table ITEM
(
iID int not null IDENTITY,
name varchar(255),
weight real,
supID int not null
PRIMARY KEY(iID)
);

create table COUPONS
(
cID int not null IDENTITY,
Expiration datetime,
Discount real not null,
iID int not null
PRIMARY KEY(cID)
);

create table PRESCRIPTION
(
pID int not null IDENTITY,
Doctor_name varchar(255),
Patient_name varchar(255),
sID int not null
PRIMARY KEY(pID)
);

create table WEEKLY_AD
(
adID int not null IDENTITY,
sID int not null
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
primary key(supID)
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