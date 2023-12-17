const express = require ('express');
const router = express.Router();
const grade = require ('../../modules/handlegrade');
const bodyParser=require("body-parser");
const jsonParser = bodyParser.json ();
router.post('/', jsonParser, function(req, res, next) {
    grade.getAllGradeBySdept(req.body, res);
});

module.exports = router;