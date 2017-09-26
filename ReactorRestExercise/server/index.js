const express = require('express');
const port = 8082;
const db = require('./db');
const webpack = require('webpack');
const config = require('../webpack.config')();
const path = require('path');
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const app = express();

const sourcePath = path.join(__dirname, './usersDB')
const userdb = new sqlite3.Database(sourcePath, sqlite3.OPEN_READWRITE, function(err)
{
//   console.log(sourcePath);
  if(err != null){  
   console.log(err);
  }
  else{
   console.log('usersDB in index.js loaded');

  }
});

function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}

passport.use(new Strategy(function(username, password, done) {
  console.log('Local strategy function is called'); 
//   userdb.get('SELECT salt FROM users WHERE username = ?', username, function(err, row) {
  userdb.get('SELECT username, password FROM userinfos WHERE username = ? AND password = ?', username, password, function(err, row) {
      
    if (!row) 
    {
        console.log('NOT FOUND USER IN userinfos');
        return done(null, false);
    }
    else{

        console.log('FOUND USER IN userinfos!');
    
        userdb.get('SELECT username, id FROM userinfos WHERE username = ? AND password = ?', username, password, function(err, row) {
        if (!row){ 
            console.log('CANNOT FIND USER ID IN userinfos WITH GIVEN USERNAME AND PASSWORD!');
            
            return done(null, false);}
        else{
            console.log('FOUND USER ID IN userinfos WITH GIVEN USERNAME AND PASSWORD!');
            console.log(row.id);    
            console.log(row.username);
            console.log(row.password);
            console.log(row.salt);            
            return done(null, row);
        }
        });

    }
    // console.log(row.id);    
    // console.log(row.username);
    // console.log(row.password);
    // console.log(row.salt);

    // return done(null, row);
    // var hash = hashPassword(password, row.salt);
    // userdb.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, function(err, row) {
    //   if (!row) return done(null, false);
    // //   return done(null, row);
    //   return done(null, username);
      
    // });
  });
}));

passport.serializeUser(function(user, done) {
//   return done(null, user.id);
    console.log('SERIALIZEUSER CALLED!');
    done(null, user.id);

});

passport.deserializeUser(function(id, done) {
  console.log('DESERIALIZE USER CALLED!');

  userdb.get('SELECT id, username FROM userinfos WHERE id = ?', id, function(err, row) {
    if (!row) return done(null, false);
    // return done(null, row);
    done(null, row);
    
  });
});


if (process.env.NODE_ENV !== 'production') {
    console.log('Environment not production, using webpack-dev-middleware');
    const webpackMiddleware = require("webpack-dev-middleware");
    app.use(webpackMiddleware(webpack(config)));
}


// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));



// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function(req, res) {
    // if(!req.user.username)
    // {
    //    console.log(req.user.username);
    // }

    res.render('home', { user: req.user });
    // res.render('home');
    
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log('SUPPOSED TO BE THE EMPLOYER INFO PAGE');
    // res.redirect('/employees');
    res.redirect('/');
    
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });


app.get('/employees', (req, res) => {
    db.serialize(() => {
        const { page, start, limit, filter, sort } = req.query;
        const criteria = [], params = [];
        
        if (filter) {
            const filters = {};

            for (let { property, value } of JSON.parse(filter)) {
                filters[property] = value;
            }

            if (filters.firstName) {
                criteria.push('firstName like ?');
                params.push(`%${filters.firstName}%`);
            }

            if (filters.lastName) {
                criteria.push('lastName like ?');
                params.push(`%${filters.lastName}%`);
            }

            if (filters.age) {
                criteria.push('(age >= ? and age <= ?)');
                params.push(filters.age[0]);
                params.push(filters.age[1]);
            }

            if (filters.gender) {
                criteria.push('gender = ?');
                params.push(filters.gender);
            }

            if (filters.text) {
                const nameCriteria = [];
                for (let word of filters.text.split(/\s+/)) {
                    nameCriteria.push('(firstName like ? or lastName like ?)');
                    params.push(`%${word}%`);
                    params.push(`%${word}%`);
                }
                criteria.push(`(${nameCriteria.join(' and ')})`);
            }
        }

        where = criteria.length ? `WHERE ${criteria.join(' and ')}` : '';

        const orderBy = req.query.sort ? ('ORDER BY ' + JSON.parse(sort).map(entry => `${entry.property} ${entry.direction}`).join(', ')) : '';
        const limitClause = limit ? `LIMIT ${start}, ${limit}` : '';
        //const sql = `SELECT rowid AS id, * FROM employees ${where} ${orderBy} ${limitClause}`;
        const sql = `SELECT rowid AS id, * FROM employeeInfo ${where} ${orderBy} ${limitClause}`;

        console.log(sql, params);

        db.all(sql, params, (err, rows) => {
            if (err) {
                res.send({ error: err.message })
            } else {
                // db.get(`select count(*) as totalRecords from employees ${where}`, params, (err, result) => {
                db.get(`select count(*) as totalRecords from employeeInfo ${where}`, params, (err, result) => {
                    
                    if (err) {
                        res.send({ error: err.message })
                    } else {
                        res.send({
                            total: result.totalRecords,
                            records: rows
                        })
                        // res.render('mainpage');

                    }
                });
            }
        })
    })
});

app.listen(port, () => console.log(`Server running on port ${port}.`));