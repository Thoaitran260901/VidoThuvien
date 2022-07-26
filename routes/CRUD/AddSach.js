var express = require('express');
var router = express.Router();
var Sach = require('../../models/book');
var sql = require('mysql');
var config = require('../../data/dbConfig');

// router.get('/', function(req,res,next){
//     res.render('addSach');
// })
router.post('/createbook', function(req, res, next){
    config.getConnection((err, connection) => {
      if(err) throw err
      var sampleFile;
      var uploadFile;
      if(!req.files || Object.keys(req.files).length == 0){
        res.status(400).send('No file were uploaded!');
      }
      sampleFile = req.files.Image;
      uploadFile = __dirname+'../../../'+'/image/'+sampleFile.name;
      console.log(sampleFile);

      sampleFile.mv(uploadFile, function(err){
        if(err){
          return res.status(400).send(err);
        }
      });

      console.log('connect database success')
      connection.query("INSERT INTO `sach`(`Name`, `Description`, `Infomation`, `Image`, `category_Id`) VALUES (?,?,?,?,?)", [req.body.Name,req.body.Description,req.body.Infomation,sampleFile.name,req.body.category_Id],(err, rows)=>{
          if(!err){
            res.redirect('/danhsach');
          }else{
            console.log(err);
          }
      });
    })
})

router.get('/', function(req, res, next) {
  config.getConnection((err, connection) => {
    if(err) throw err
    console.log('da ket noi mysql');
    connection.query("SELECT * FROM `category`", (err, rows)=>{
        if(!err){
          res.render('addSach', { Category: rows });
        }else{
            console.log(err);
        }
    });
  })
});

module.exports = router;