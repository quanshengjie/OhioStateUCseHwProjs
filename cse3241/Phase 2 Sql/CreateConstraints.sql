use Store;
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