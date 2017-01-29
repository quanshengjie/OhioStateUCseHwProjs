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