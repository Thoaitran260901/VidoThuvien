var express = require('express');
var router = express.Router();
var Sach = require('../../models/book');
var sql = require('mysql');
var config = require('../../data/dbConfig');

router.get('/:id', function(req, res, next){
    config.getConnection((err, connection) => {
      if(err) throw err
      console.log('da ket noi mysql');
      connection.query("SELECT sach.Id,sach.Name,sach.Description,sach.Infomation,category.Name AS category_Name,category.category_Id,category.post_Id FROM `sach`,`category` WHERE sach.category_Id = category.category_Id AND sach.Id = ?", [req.params.id], (err, rows)=>{
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
      const {Name,Description,Infomation,category_Id} = req.body;
      connection.query("UPDATE `sach` SET `Name`= ?,`Description`= ?,`Infomation`= ?,`category_Id` = ? WHERE id = ?", [Name,Description,Infomation,category_Id,req.params.id],(err, rows)=>{
          if(!err){
            res.redirect('/danhsach');
          }else{
            console.log(err);
          }
      });
    })
})

module.exports = router;