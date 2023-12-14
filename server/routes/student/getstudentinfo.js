const express = require ('express');
const router = express.Router();
const student = require ('../../modules/handlestudent');
const bodyParser=require("body-parser");
const jsonParser = bodyParser.json ();
router.get('/', jsonParser, function(req, res, next) {
    student.getStudentinfo(req.body,res);
});

module.exports = router