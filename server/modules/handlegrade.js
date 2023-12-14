const mysqlconfig = require("mysql2");
// 引入mysql连接配置
const mysql = require ('../config/mysql');
// 引入连接池配置
const poolExtend = require ('./poolExtend.js');
//随机数生成器
const courseQuery = require('./SqlRequests').courseQuery;
const gradeQuery = require('./SqlRequests').gradeQuery;
// 使用连接池，提升性能
const pool = mysqlconfig.createPool (poolExtend ({}, mysql));
const handleGrade = {
    getCourseList: (param, res) => {
        // 使用 pool.promise() 获取基于 Promise 的接口
        pool.getConnection((err,Connection)=>{
            Connection.query(courseQuery.getCourse,(err,result)=>{
                if(err){
                    const result = {status:'failed'}
                    res.send(JSON.stringify(result))
                }
                else{
                    const r = {status:"success",gradeinfo:result};
                    res.send(JSON.stringify(r));
                }

            })
            Connection.release();
        })
    },
    getAvgGrade:(param,res)=>{
        pool.getConnection((err,Connection)=>{
            Connection.query(gradeQuery.getAvgGrade,(err,result)=>{
                if(err){
                    const r = {status:"error",message:"获取平均成绩失败"};
                    res.send(JSON.stringify(r));
                }
                else {
                const r = {status:"success",message:"获取平均成绩成功",gradeinfo:result};
                res.send(JSON.stringify(r));
            }
            })
            Connection.release();
        })

    },
    getAllGrade:(param,res)=>{
        console.log(param);
        const Sno = param.Sno;
        pool.getConnection((err,Connection)=>{
            Connection.query(gradeQuery.getGradeById,[Sno],(err,result)=>{
                if(err){
                    const r = {status:"error",message:"获取成绩失败"};
                    res.send(JSON.stringify(r));
                }
                else {
                    const r = {status:"success",message:"获取成绩成功",gradeinfo:result};
                    res.send(JSON.stringify(r));
                }
            })
            Connection.release();
        })
    }

}


module.exports = handleGrade;