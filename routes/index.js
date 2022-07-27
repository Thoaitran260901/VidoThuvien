var express = require('express');
var router = express.Router();
var Sach = require('../models/book');
var sql = require('mysql');
var config = require('../data/dbConfig');

router.get('/', function(req, res, next) {
  config.getConnection((err, connection) => {
    if(err) throw err
    console.log('da ket noi mysql');
    connection.query("SELECT sach.Id,sach.Name,sach.Description,sach.Infomation,category.category_name FROM `sach`,`category` WHERE sach.category_Id = category.category_Id", (err, rows)=>{
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

//search
router.post('/', function(req, res, next){
  config.getConnection((err, connection) => {
    if(err) throw err
    console.log('da ket noi mysql');
    let searchTerm = req.body.search;
    connection.query('SELECT sach.Name,sach.Description,sach.Infomation,category.category_name FROM `sach` INNER JOIN category ON sach.Id = category.category_Id WHERE sach.Name LIKE? OR sach.Description LIKE? OR sach.Infomation LIKE? OR category.category_name LIKE?', ['%'+ searchTerm + '%','%'+ searchTerm + '%','%'+ searchTerm + '%','%'+ searchTerm + '%'], (err, rows)=>{
        if(!err){
          res.render('index', { Sach: rows });
        }else{
          console.log(err);
        }
    });
  })
})
//delete
router.get('/deletebook/:id', function(req, res, next){
  config.getConnection((err, connection) => {
    if(err) throw err
    console.log('da ket noi mysql');
    connection.query("DELETE FROM `sach` WHERE id = ?", [req.params.id], (err, rows)=>{
        if(!err){
          res.redirect('/');
        }else{
          console.log(err);
        }
    });
  })
})


module.exports = router;
