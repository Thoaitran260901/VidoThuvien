var express = require('express');
var router = express.Router();
var account =[
    {Id:1,MSSV:'1906020150',Password:'123'},
    {Id:2,MSSV:'1906020101',Password:'567'}
]

router.get('/', function(req, res){
  res.render('login', {'account': account});
})  

module.exports = router;