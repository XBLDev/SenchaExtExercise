# SenchaExtExercise

Sample code and experiments of Sencha's ExtJS/ExtReact, with sample code from: https://github.com/sencha/extjs-reactor/tree/master/packages

Comment 29/09/2017, 1:33:

New (FAKE) user login based on the REST example, since it's not really a formal user
authentication and it cannot remember user login session(it goes back to the login page
when the page is freshed, which is not supposed to happen), it's more of a REST api exercise.

For now the first page upon opening the page is a log in form with default username and password, 
and clicking on log in will result in the sqlite3 DB finding the matching row and return 
the result, and if the result is not null then the list of employees appear.

Asked a question about user Auth in ExtReact: 
https://www.sencha.com/forum/showthread.php?442118-Is-there-any-example-about-ExtReact-user-log-in-out-system

Comment 26/09/2017, 7:22:

Made a minimal user login/out with the ExtJS Rest example and sqlite3, most of the
ideas come from: https://stackoverflow.com/questions/23481817/node-js-passport-autentification-with-sqlite

Since React comes with the userAuth packages that can store session automatically and 
handle other userAuth, this is just an alternative that might come in handy if needed.

Tried redirecting the page to the employee info page that comes with the example, but 
doesn't quite work. 

Tomorrow maybe try load some data and put them in table form with sqlite3 and React.

Comment 22/09/2017, 8:48:

Tested the sample ReactREST backend example, replaced the original text file db
with the database created with sqlite3 command line, seems easy enough.

Next week maybe start working on building an user authentication system, and some
basic DB operations such as insert/delete etc.

Comment 21/09/2017, 9:15:

This Ext-React seems pretty easy to understand, at least with the responsive-UI
part of it, maybe it will be hard once I get to the backend, will explore the 
backend tomorrow with the example provided.

The code for now is just the sample code generated when creating the project. 

Added a "Dev" tab in the NavMenu on the left, and added HoursTaken, HoursRemaining
columns, which the sample code somehow forgot to put in, to the Home table, 


