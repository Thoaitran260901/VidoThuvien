var express = require('express');
var router = express.Router();
var Sach = require('../../models/book');
var sql = require('mysql');
var config = require('../../data/dbConfig');

router.get('/:id', function(req, res, next){
    config.getConnection((err, connection) => {
      if(err) throw err
      console.log('da ket noi mysql');
      connection.query("SELECT * FROM `sach` WHERE id = ?", [req.params.id], (err, rows)=>{
          if(!err){
            res.render('editSach',{Sach : rows});
          }else{
            console.log(err);
          }
      });
    })
  })

router.post('/:id', function(req, res, next){
    config.getConnection((err, connection) => {
      if(err) throw err
      const {Name,Description,Infomation} = req.body;
      connection.query("UPDATE `sach` SET `Name`= ?,`Description`= ?,`Infomation`= ? WHERE id = ?", [Name,Description,Infomation,req.params.id],(err, rows)=>{
          if(!err){
            res.redirect('/');
          }else{
            console.log(err);
          }
      });
    })
})

module.exports = router;