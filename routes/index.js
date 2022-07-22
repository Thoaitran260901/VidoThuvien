var express = require('express');
var router = express.Router();
var Sach = require('../models/book');
var sql = require('mysql');
var config = require('../data/dbConfig');

router.get('/', function(req, res, next) {
  config.getConnection((err, connection) => {
    if(err) throw err
    console.log('da ket noi mysql');
    connection.query("SELECT * FROM `sach`", (err, rows)=>{
        if(!err){
          res.render('index', { Sach: rows });
        }else{
            console.log(err);
        }
    });
  })
});

router.get('/sach', function(req, res, next){
  config.getConnection((err, connection) => {
    if(err) throw err
    console.log('da ket noi mysql');
    connection.query("SELECT * FROM `sach`", (err, rows)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
  })
})
module.exports = router;
