const express = require ('express');
const router = express.Router();
const course = require ('../../modules/handlecourse');
const bodyParser=require("body-parser");
const jsonParser = bodyParser.json ();
router.post('/', jsonParser, function(req, res, next) {
    course.deleteCourse(req.body, res);
});

module.exports = router;