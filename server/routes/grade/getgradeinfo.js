const express = require ('express');
const router = express.Router();
const grade = require ('../../modules/handlegrade');
const bodyParser=require("body-parser");
const jsonParser = bodyParser.json ();
router.get('/', jsonParser, function(req, res, next) {
    grade.getAvgGrade(req.body, res);
});

module.exports = router;