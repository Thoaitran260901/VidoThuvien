var express = require('express');
var router = express.Router();
var Sach = require('../../models/book');
var sql = require('mysql');
var config = require('../../data/dbConfig');

router.get('/', function(req,res,next){
    res.render('addSach');
})
router.post('/createbook', function(req, res, next){
    config.getConnection((err, connection) => {
      if(err) throw err
      console.log('connect database success')
      connection.query("INSERT INTO `sach` SET ?", req.body,(err, rows)=>{
          if(!err){
            res.redirect('/');
          }else{
            console.log(err);
          }
      });
    })
})

module.exports = router;