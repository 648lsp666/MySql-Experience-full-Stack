const mysqlconfig = require("mysql2");
// 引入mysql连接配置
const mysql = require ('../config/mysql');
// 引入连接池配置
const poolExtend = require ('./poolExtend.js');

//随机数生成器
const studentQuery = require('./SqlRequests').studentQuery;
// 使用连接池，提升性能
const pool = mysqlconfig.createPool (poolExtend ({}, mysql));

const handleStudent = {
    // 注册
    addnewStudent:(param,res) =>{
        const addinfoquery = 'INSERT INTO student values(?,?,?,?,?,?)';
        const Sno = param.Sno;
        const Sname = param.Sname;
        const Ssex = param.Ssex;
        const Sage = param.Sage;
        const Sdept = param.Sdept;
        const Scholarship = param.Scholarship;
        console.log(Sno);
        //处理输入逻辑
        /**/
        pool.getConnection((err,Connection)=>{
            Connection.query(addinfoquery,[Sno,
            Sname,
            Ssex,
            Sage,
            Sdept,
            Scholarship],(err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                res.status(500).send('Internal Server Error');
            }
            else{
                const r = {code:"success",mysqlinfo:results,
                studentinfo:{Sno:Sno,Sname:Sname,Ssex:Ssex,Sage:Sage,Sdept:Sdept,Scholarship:Scholarship}};
                res.send(JSON.stringify(r));
            }
            })
        Connection.release();
        })
    },
    getStudentinfo:(param,res)=>{
        pool.getConnection((err,Connection)=>{
            Connection.query(studentQuery.getStudent,(err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                res.status(500).send('Internal Server Error');
            }
            else{
                const r = {code:"success",studentinfo:results};
                res.send(JSON.stringify(r));
            }
            })
        Connection.release();
        })
    },
    updateStudent:(param,res)=>{
        const updateinfoquery = 'UPDATE student SET Sname=?,Ssex=?,Sage=?,Sdept=?,Scholarship=? WHERE Sno=?';
        const Sno = param.Sno;
        const Sname = param.Sname;
        const Ssex = param.Ssex;
        const Sage = param.Sage;
        const Sdept = param.Sdept;
        const Scholarship = param.Scholarship;
        pool.getConnection((err,Connection)=>{
            Connection.query(updateinfoquery,[Sname,Ssex,Sage,Sdept,Scholarship,Sno],(err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                res.status(500).send('Internal Server Error');
            }
            else{
                const r = {code:"success",
                mysqlinfo:results,
                studentinfo:{Sno:Sno,Sname:Sname,Ssex:Ssex,Sage:Sage,Sdept:Sdept,Scholarship:Scholarship}}
                res.send(JSON.stringify(r));
            }
            })
        Connection.release();
        })
    },
    deleteStudent:(param,res)=>{
        const deleteinfoquery = 'DELETE FROM student WHERE Sno=?';
        const Sno = param.Sno;
        console.log(param);
        pool.getConnection((err,Connection)=>{
            Connection.query(deleteinfoquery,[Sno],(err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                res.status(500).send('Internal Server Error');
                res.status(404).send('Not Found');
            }
            else{
                const r = {code:"success",
                mysqlinfo:results,
                studentinfo:{Sno:Sno}}
                res.send(JSON.stringify(r));
            }
            })
        Connection.release();
        })
    },
    getStudentinfoById:(param,res)=>{
        pool.getConnection((err,Connection)=>{
            if(err){
                res.send(JSON.stringify({code:"error"}));
            }
            console.log(param);
            const ID = param.value;
            if(ID==''){
                res.status(400).send(JSON.stringify("No Empty String!"));
            }
            else{
            Connection.query(studentQuery.getStudentById,[`%${ID}%`],(err,results)=>{
                if(err){
                    console.error('Error querying database:', err);
                    res.status(500).send('Internal Server Error');
                    res.status(404).send('Not Found');
                }
                else{
                    const r = {
                        code:"success",
                        mysqlinfo: results,
                        studentinfo: results,
                    }
                    res.status(200).send(JSON.stringify(r));
                }
            })
            Connection.release();
        }//else
        })
        
    }
}

module.exports = handleStudent;