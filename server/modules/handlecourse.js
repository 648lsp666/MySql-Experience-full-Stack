const mysqlconfig = require("mysql2");
// 引入mysql连接配置
const mysql = require ('../config/mysql');
// 引入连接池配置
const poolExtend = require ('./poolExtend.js');
const { gradeQuery } = require("./SqlRequests");
//随机数生成器
const courseQuery = require('./SqlRequests').courseQuery;
// 使用连接池，提升性能
const pool = mysqlconfig.createPool (poolExtend ({}, mysql));
const handleCourse = {
    getCourseList: (param, res) => {
        // 使用 pool.promise() 获取基于 Promise 的接口
        pool.getConnection((err,Connection)=>{
            Connection.query(courseQuery.getCourse,(err,result)=>{
                if(err){
                    const result = {status:'failed'}
                    res.send(JSON.stringify(result))
                }
                else{
                    const r = {status:"success",courseinfo:result};
                    res.send(JSON.stringify(r));
                }

            })
            Connection.release();
        })
    },
    addCourse: (param, res) => {
        // 使用 pool.promise() 获取基于 Promise 的接口
        const newcourse = [
            param.Cno,
            param.Cname,
            null,
            param.Ccredit,
        ]
        console.log(newcourse);
        pool.getConnection((err,Connection)=>{
            Connection.query(courseQuery.addCourse,newcourse,(err,result)=>{
                if(err){
                    const result = {status:err.sqlMessage}
                    console.log(err.sqlMessage);
                    res.send(JSON.stringify(result))
                }
                else{
                    const r = {status:"添加成功！",courseinfo:result};
                    res.send(JSON.stringify(r));
                    console.log(r);
                }

            })
            Connection.release();
        })
    },
    updateCourse:(param,res)=>{
        pool.getConnection((err,Connection)=>{
            Connection.query(courseQuery.updateCourse,[param.Cname,param.Cpno,param.Ccredit,param.Cno],(err,result)=>{
                if(err){
                    const result = {status:err.sqlMessage}
                    console.log(err.sqlMessage);
                    res.send(JSON.stringify(result))
                }
                else{
                    const r = {status:"修改成功！",courseinfo:result};
                    res.send(JSON.stringify(r));
                    console.log(r);
                }

            })
            Connection.release();
        })
    },
    deleteCourse:(param,res)=>{
        console.log(param.Cno);
        pool.getConnection((err,Connection)=>{
            Connection.query(courseQuery.deleteCourse,[param.Cno],(err,result)=>{
                if(err){
                    const result = {status:err.sqlMessage}
                    console.log(err.sqlMessage);
                    res.send(JSON.stringify(result))
                }
                else{
                    const r = {status:"删除成功！",courseinfo:result};
                    res.send(JSON.stringify(r));
                    console.log(r);
                }

            })
            Connection.release();
        })
    }
}


module.exports = handleCourse;