const path = require('path');
const express = require('express');
const sql = require('mssql');
const dbConfig = require('../dbConfig');

var router = express.Router();

/* GET film page. */
router.get('/', (req, res, next) => {
    res.statusCode = 200;
    res.sendFile(path.resolve('public/film.html'));
})

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    const pool = new sql.ConnectionPool(dbConfig)

    pool.connect(err => {
        var req = new sql.Request(pool)
        req.query(`Select * from tblFilm where FilmName = '${id}'`, (err, rec) => {
            if (err) {
                console.log`Error: ${err}`
                return
            }

            res.render('film', rec.recordset[0])
        })
    })

})

module.exports = router;
