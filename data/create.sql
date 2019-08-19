CREATE TABLE Participants (
    ParticipantId int IDENTITY(700,1) PRIMARY KEY,
    FirstName nvarchar(100),
    LastName nvarchar(100),
    Email nvarchar(100),
    Phone nvarchar(100),
    Method nvarchar(100),
    Disability  bit null, 
    DisabilityDetail nvarchar(1000) null,    
    TelNo nvarchar(50),
    UserType nvarchar(100),    
    Licensed bit,
    Created DATETIME
);