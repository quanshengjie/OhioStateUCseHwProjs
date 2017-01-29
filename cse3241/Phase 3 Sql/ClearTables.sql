-- remove cnstraints
alter table EMPLOYEES drop constraint employees_dID_key;
alter table EMPLOYEES drop constraint employees_sID_key;
alter table DEPENDENTS drop constraint dependents_eID_key;
alter table WAREHOUSE drop constraint warehouse_supID_key;
alter table ITEM drop constraint item_supID_key;
alter table COUPONS drop constraint coupons_iID_key;
alter table PRESCRIPTION drop constraint prescription_sID_key;
alter table WEEKLY_AD drop constraint weekly_ads_sID_key;

alter table SHIFT drop constraint shift_sID_key;
alter table MEMBERS drop constraint members_sID_key;
alter table WORKS drop constraint works_eID_key;
alter table WORKS drop constraint works_shID_key;
alter table SENT_TO drop constraint sent_to_mID_key;
alter table SENT_TO drop constraint sent_to_adID_key;
alter table STOCK drop constraint stock_sID_key;
alter table STOCK drop constraint stock_iID_key;

alter table [ORDER]
 drop constraint store_for_order_key;

alter table [ORDER] 
 drop constraint supplier_for_order_key;

alter table SHIPMENT
 drop constraint warehouse_for_shipment_key;

alter table SHIPMENT
 drop constraint store_for_shipment_key;

alter table SHIPMENT
 drop constraint truck_for_shipment_key;

alter table INCLUDES
 drop constraint ad_includes_key;

alter table INCLUDES
 drop constraint coupons_included_key;

alter table CONSISTS_OF
 drop constraint consists_of_item_key;

alter table CONSISTS_OF
 drop constraint order_consists_of_key;

alter table [CONTAINS]
 drop constraint items_contained_key;

alter table [CONTAINS]
 drop constraint shipment_contains_key;

 -- drop tables
drop table COUPONS;
drop table DEPENDENTS;
drop table EMPLOYEES;
drop table ITEM;
drop table PRESCRIPTION;
drop table WAREHOUSE;
drop table WEEKLY_AD;
drop table DEPARTMENT;
drop table STORE;
drop table SHIFT;
drop table MEMBERS;
drop table WORKS;
drop table SENT_TO;
drop table STOCK;
drop table MEMBERS_AUDIT;
drop table CONSISTS_OF;
drop table [CONTAINS];
drop table INCLUDES;
drop table [ORDER];
drop table SHIPMENT;
drop table SUPPLIER;
drop table TRUCKS;

--drop trigger membership_after_trigger;
--drop trigger membership_after_trigger_update;
--drop trigger works_triger_instead;