var express = require('express');
var router = express.Router();
var config = require('../../data/dbConfig');
/* GET users listing. */
router.get('/', function(req, res, next) {
  config.getConnection((err, connection) => {
    if(err) throw err
    console.log('da ket noi mysql');
    connection.query("SELECT sach.Id,sach.Name,sach.Description,sach.Infomation,sach.Image,category.Name AS category_Name FROM `sach`,`category` WHERE sach.category_Id = category.category_Id", (err, rows)=>{
        if(!err){
          res.render('trangchinh', { Sach: rows });
        }else{
            console.log(err);
        }
    });
  })
});


module.exports = router;