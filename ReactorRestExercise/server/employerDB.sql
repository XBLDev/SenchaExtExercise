PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE employerDetails(
firstName TEXT,
lastName TEXT,
gender TEXT,
age INTEGER,
email TEXT);
INSERT INTO "employerDetails" VALUES('Xilong','Cao','Male',28,'weixindaxi@gmail.com');
INSERT INTO "employerDetails" VALUES('Ruby','Bennett','Femail',47,'rbennett0@zdnet.com');
COMMIT;
