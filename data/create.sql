SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Participants](
	[ParticipantId] [int] IDENTITY(700,1) NOT NULL,
	[FirstName] [nvarchar](100) NULL,
	[LastName] [nvarchar](100) NULL,
	[Email] [nvarchar](100) NULL,
	[Phone] [nvarchar](100) NULL,
	[Method] [nvarchar](500) NULL,
	[Assistive] [nvarchar](500) NULL,
	[AssistiveOther] [nvarchar](500) NULL,
	[UserType] [nvarchar](100) NULL,
	[UserTypeOther] [nvarchar](100) NULL,
	[Licensed] [nvarchar](100) NULL,
	[Location] [nvarchar](500) NULL,
	[Source] [nvarchar](500) NULL,
	[SourceOther] [nvarchar](500) NULL,
	[Tech] [nvarchar](500) NULL,	
	[Status] [nvarchar](50) NULL,
	[Created] [datetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Participants] ADD PRIMARY KEY CLUSTERED 
(
	[ParticipantId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF) ON [PRIMARY]
GO
