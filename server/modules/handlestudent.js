const mysqlconfig = require("mysql2");
// ����mysql��������
const mysql = require ('../config/mysql');
// �������ӳ�����
const poolExtend = require ('./poolExtend.js');

//�����������
const studentQuery = require('./SqlRequests').studentQuery;
// ʹ�����ӳأ���������
const pool = mysqlconfig.createPool (poolExtend ({}, mysql));

const handleStudent = {
    // ע��
    addnewStudent:(param,res) =>{
        const addinfoquery = 'INSERT INTO student values(?,?,?,?,?,?)';
        const Sno = param.Sno;
        const Sname = param.Sname;
        const Ssex = param.Ssex;
        const Sage = param.Sage;
        const Sdept = param.Sdept;
        const Scholarship = param.Scholarship;
        console.log(Sno);
        //���������߼�
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
}

module.exports = handleStudent;