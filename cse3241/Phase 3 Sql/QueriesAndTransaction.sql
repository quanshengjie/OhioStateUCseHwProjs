use store;
-- Query 1: Retrieve information about employees (eID, LastName, MidInit, FirstName) 
-- that work any shifts or work in stores located in Ohio. (union)
SELECT e.eID, e.LastName, e.MidInit, e.FirstName
FROM EMPLOYEES AS e
WHERE e.eID IN (SELECT w.eID FROM WORKS AS w)
UNION
SELECT e.eID, e.LastName, e.MidInit, e.FirstName
FROM EMPLOYEES AS e
WHERE e.sID IN (SELECT s.sID FROM STORE AS s WHERE s.State = 'OH')

-- Query 2: Retrieve information about employees (eID, LastName, MidInit, FirstName) 
-- that work any shifts and work in stores located in Ohio. (intersection)
SELECT e.eID, e.LastName, e.MidInit, e.FirstName
FROM EMPLOYEES AS e
WHERE e.eID IN (SELECT w.eID FROM WORKS AS w)
INTERSECT
SELECT e.eID, e.LastName, e.MidInit, e.FirstName
FROM EMPLOYEES AS e
WHERE e.sID IN (SELECT s.sID FROM STORE AS s WHERE s.State = 'OH')

-- Query 3: Retrieve the names (first and last) of employees who do not have any 
-- dependents. (difference)
SELECT e.FirstName, e.LastName
FROM EMPLOYEES AS e
WHERE NOT EXISTS (SELECT * 
                  FROM DEPENDENTS AS d 
                  WHERE e.eID = d.eID)

-- Query 4: Retrieve the ID of stores that have every item in stock. (division)
SELECT s.sID
FROM STORE AS s
WHERE NOT EXISTS (SELECT i.iID
                  FROM ITEM AS i
                  WHERE NOT EXISTS (SELECT *
                                    FROM STOCK AS t
                                    WHERE i.iID = t.iID AND s.sID = t.sID))

-- Query 5: Count the number of Warehouse owned by each supplier. Result ordered 
-- by warehouse number.(aggregation)
select sup.supID, sup.supplierName as 'Supplier Name', cou.numWarehouse as 'Number of Warehouse' from 
(select supID, count(wID) as numWarehouse from WAREHOUSE group by supID) as cou join 
SUPPLIER as sup on cou.supID = sup.supID order by numWarehouse desc;

-- Query 6: Calculate the Payslip of each employee who works in Store. Result 
-- ordered by Payslip amount. (Inner Join among EMPLOYEES, WORKS and SHIFT)
select em.LastName, em.MidInit, em.FirstName, g.Payslip from EMPLOYEES as em join 
(select e.eID as eID, sum(w.Hour * sh.HourRate) as Payslip from EMPLOYEES as e join 
WORKS as w on e.sID is not null and e.eID = w.eID join SHIFT as sh on w.shID = sh.shID group by e.eID) as g on 
em.eID = g.eID order by Payslip desc;

-- Outer Join Query

Select e.FirstName, e.LastName, e.eID, d.Dep_Name, d.Relationship
From EMPLOYEES AS e
LEFT JOIN
Dependents AS d on e.eID = d.eID;

-- Simple Transaction:
select * from SHIFT;
Declare @intErrorCode int;
begin tran
	update SHIFT set HourRate = 1.05 * HourRate where HourRate >= 9;
	select @intErrorCode = @@ERROR
	if(@intErrorCode <> 0) goto Problem
	update SHIFT set HourRate = 1.01 * HourRate where HourRate < 9;
	select @intErrorCode = @@ERROR
	if(@intErrorCode <> 0) goto Problem
commit tran
Problem:
if(@intErrorCode <> 0) begin
	PRINT 'Unexpected error occurred!'
	rollback tran
end
select * from SHIFT;

-- Nested Transaction:

SELECT 'Before BEGIN TRAN', @@TRANCOUNT 
BEGIN TRAN
	SELECT 'After BEGIN TRAN', @@TRANCOUNT
	INSERT INTO employees values ('Doe','E','John','6141012929','1968-11-11', NULL, 5)
	BEGIN TRAN nested
		SELECT 'After BEGIN TRAN nested', @@TRANCOUNT
		UPDATE employees
		SET sID = 3
		WHERE FirstName = 'John' AND LastName = 'Doe'
	COMMIT TRAN nested
	SELECT 'After COMMIT TRAN nested', @@TRANCOUNT
	SELECT * FROM employees
ROLLBACK TRAN
SELECT 'After ROLLBACK TRAN', @@TRANCOUNT 
SELECT * FROM employees


-- Transaction with Save Points:

SELECT 'Before BEGIN TRAN', @@TRANCOUNT
-- The value of @@TRANCOUNT is 0
BEGIN TRAN main
    SELECT 'After BEGIN TRAN main', @@TRANCOUNT
    -- The value of @@TRANCOUNT is 1
    INSERT INTO EMPLOYEES values ('Jackson','A','Adam','6149035622','1985-05-16', 1, NULL)
    SAVE TRAN addrec
    SELECT 'After SAVE TRAN addrec', @@TRANCOUNT
    -- The value of @@TRANCOUNT is still 1
    SELECT * FROM EMPLOYEES
    BEGIN TRAN nested
        SELECT 'After BEGIN TRAN nested', @@TRANCOUNT
        -- The value of @@TRANCOUNT is 2
        UPDATE EMPLOYEES
        SET PhoneNum = '6142245644'
        WHERE LastName = 'James' AND FirstName = 'Borg'
        SAVE TRAN updaterec
        SELECT 'After SAVE TRAN updaterec', @@TRANCOUNT
        -- The value of @@TRANCOUNT is still 2
        SELECT * FROM EMPLOYEES
    ROLLBACK TRAN addrec
    SELECT 'After ROLLBACK TRAN addrec', @@TRANCOUNT
    -- The value of @@TRANCOUNT is still 2
    SELECT * FROM EMPLOYEES
IF (@@TRANCOUNT > 0) BEGIN
    ROLLBACK TRAN
    SELECT 'AFTER ROLLBACK TRAN', @@TRANCOUNT
    -- The value of @@TRANCOUNT is 0 because ROLLBACK TRAN always rolls back all transactions and sets @@TRANCOUNT to 0.
END
SELECT * FROM EMPLOYEES