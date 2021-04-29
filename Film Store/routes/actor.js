var express = require('express');
var path = require('path');
const sql = require('mssql');
const dbConfig = require('../dbConfig');

var router = express.Router();

/* GET actor page. */
router.get('/', function(req, res, next) {
  res.statusCode = 200;
  res.sendFile(path.resolve('public/actor.html'));
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  const pool = new sql.ConnectionPool(dbConfig)

  pool.connect(err => {
      var req = new sql.Request(pool)
      req.query(`Select * from tblActor where ActorName = '${id}'`, (err, rec) => {
          if (err) {
              console.log`Error: ${err}`
              return
          }

          res.render('actor', rec.recordset[0])
      })
  })

})

module.exports = router;
