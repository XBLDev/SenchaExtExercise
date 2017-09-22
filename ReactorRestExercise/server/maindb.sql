PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE employerInfo (id INT, dt TEXT);
INSERT INTO "employerInfo" VALUES(1,'a');
INSERT INTO "employerInfo" VALUES(2,'b');
CREATE TABLE testtable (id INT, name TEXT, number INT);
COMMIT;
