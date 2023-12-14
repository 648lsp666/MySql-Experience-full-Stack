const express = require ('express');
const router = express.Router();
const course = require ('../../modules/handlecourse');
const bodyParser=require("body-parser");
const jsonParser = bodyParser.json ();
router.get('/', jsonParser, function(req, res, next) {
    course.getCourseList(req.body, res);
});

module.exports = router;