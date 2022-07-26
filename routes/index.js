var express = require('express');
var router = express.Router();
var Sach = require('../models/book');
var sql = require('mysql');
var config = require('../data/dbConfig');

router.get('/', function(req, res, next) {
  config.getConnection((err, connection) => {
    if(err) throw err
    console.log('da ket noi mysql');
    connection.query("SELECT sach.Id,sach.Name,sach.Description,sach.Infomation,sach.Image,category.Name AS category_Name FROM `sach`,`category` WHERE sach.category_Id = category.category_Id", (err, rows)=>{
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

router.get('/deletebook/:id', function(req, res, next){
  config.getConnection((err, connection) => {
    if(err) throw err
    console.log('da ket noi mysql');
    connection.query("DELETE FROM `sach` WHERE id = ?", [req.params.id], (err, rows)=>{
        if(!err){
          res.redirect('/danhsach');
        }else{
          console.log(err);
        }
    });
  })
})

module.exports = router;
