// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
// 创建数据库连接
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: '3li',
  password: 'hhjikol815530704',
  database: 'studentinfomanager',
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from('hhjikol815530704', 'utf-8'), // 替换为你的密码
  },
});

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// 创建路由，获取数据
app.use('/getstudentinfo',require("./routes/student/getstudentinfo"));
app.use('/addstudent',require("./routes/student/addstudent"));
app.use('/updatestudent',require("./routes/student/updatestudent"));
app.use('/deletestudent',require("./routes/student/deletestudent"));
app.use('/getstudentinfobyid',require("./routes/student/getstudentinfobyid"));

app.use('/getcourseinfo',require("./routes/course/getcourseinfo"));
app.use('/addcourse',require("./routes/course/addcourse"));
app.use('/updatecourse',require("./routes/course/updatecourse"));
app.use('/deletecourse',require("./routes/course/deletecourse"));

//app.use('/getcourselist',require("./routes/grade/getcourselist"));
app.use('/getgradeinfo',require("./routes/grade/getgradeinfo"));
app.use('/getallgrade',require("./routes/grade/getallgradeinfo"));
app.use('/getallgradebycno',require("./routes/grade/getallgradebycno"));
app.use('/getallgradebysdept',require("./routes/grade/getallgradebysdept"));

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
