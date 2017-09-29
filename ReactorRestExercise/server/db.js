const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database(':memory:')
const path = require('path');

const sourcePath = path.join(__dirname, './maindb')


const db = new sqlite3.Database(sourcePath, sqlite3.OPEN_READWRITE, function(err)
{
  console.log(sourcePath);
  if(err != null){  
   console.log(err);
  }
  else{
   console.log('maindb loaded');

  }
})
const data = require('./data');



// db2.serialize(() => {

//   db2.run('CREATE TABLE candidateInfo (id INT, dt TEXT);');  


// });  
  


// db2.all("SELECT * FROM employeeInfo", function(err, rows) {  
//         // rows.forEach(function (row) {  
//         //     console.log(row.firstName, row.lastName, row.gender, row.age, row.email);  
//         // })  
//         if(err != null){
//             console.log(err);
//             //callback(err);
//         }
//         else{  
//             for (let row of rows) {
//                 console.log(row.firstName, row.lastName, row.gender, row.age, row.email);  
//             }    
//         }    

//         //console.log('read data from employerDetails!');
// });   


// const db3 = new sqlite3.Database('');


// db2.serialize(function() {

//     db2.all('SELECT * FROM employerInfo', function(err, allRows) {

//         if(err != null){
//             console.log(err);
//             //callback(err);
//         }
//         console.log('read data from employerInfo!');
//         //console.log(util.inspect(allRows));

//         //callback(allRows);
//         //db.close();

//     });


// });


// db2.close();  


// db.serialize(() => {
//   db.run('SELECT * FROM employeeInfo');

//   // const stmt = db.prepare('INSERT INTO employees VALUES (?, ?, ?, ?, ?)')

//   // for (let record of data) {
//   //   stmt.run(record.first_name, record.last_name, record.gender, record.age, record.email);  
//   // }

//   // stmt.finalize()
// })


// db.serialize(() => {
//   db.run('CREATE TABLE employees (firstName TEXT, lastName TEXT, gender TEXT, age INTEGER, email TEXT)');

//   const stmt = db.prepare('INSERT INTO employees VALUES (?, ?, ?, ?, ?)')

//   for (let record of data) {
//     stmt.run(record.first_name, record.last_name, record.gender, record.age, record.email);  
//   }

//   stmt.finalize()
// })

module.exports = db;

