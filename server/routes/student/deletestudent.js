const express = require ('express');
const router = express.Router();
const student = require ('../../modules/handlestudent');
const bodyParser=require("body-parser");
const jsonParser = bodyParser.json ();
router.post('/', jsonParser, function(req, res, next) {
    student.deleteStudent(req.body, res);
});

module.exports = router;