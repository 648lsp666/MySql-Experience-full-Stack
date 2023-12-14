import React,{useState,useEffect, Fragment} from "react";
import "./css/detailcard.css";
import axios from "axios";
import defaultsrc from "../images/defaultavatar.png";

function DetailCard({profile,gradedetail,showedit}) {
    const {Sno,Sname,Sdept,grade}=profile;
    console.log(gradedetail);
    const gradelist = gradedetail.map((item)=>{
        return(
            <Fragment key={item.Sno}>
            <tr>
                <td>{item.Cname}</td>
                <td>{item.grade}</td>
            </tr>
            </Fragment>
        )
    });
    function showform(){
        showedit(true);
    }
    
  return (
    <div className="detailcard">
       <div className="detailprofile">
       <img src={defaultsrc} alt="默认头像" />
       <div className="scroll">
            <span><h3>学号:</h3> <p>{Sno}</p></span>
            <span><h3>姓名:</h3> <p>{Sname}</p></span>
            <span><h3>系别:</h3> <p>{Sdept}</p></span>
            <span><h3>加权成绩:</h3> <p>{parseFloat(grade).toFixed(2)}</p></span>
       </div>
       </div>
        <div className="gradeprofile">
            <span className="title">
                <h3>课程成绩</h3>
            </span>
            <div className="scroll">
                <table>
                    <thead>
                    <tr>
                        <th>课程名</th>
                        <th>成绩</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gradelist}
                    </tbody>
                </table>
            </div>
            
            <button className="formbtn"
            style={{
                width:"100%",
                background:'#97f4ff94',
            }}
            onClick={showform}
            >修改信息</button>
            
        </div>
       
    </div>
    )
}

export default DetailCard;