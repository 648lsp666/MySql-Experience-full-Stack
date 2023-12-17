import React,{useState,useEffect, Fragment} from "react";
import "./css/detailcard.css";
import axios from "axios";
import defaultsrc from "../images/defaultavatar.png";
import { Button,Drawer } from "antd";

function DetailCard({profile,gradedetail,showedit,open,ifopen}) {
    const {Sno,Sname,Sdept,grade}=profile;
    const gradelist = gradedetail.map((item)=>{
        if(item.Sno===Sno){
            return(
                <Fragment key={item.Cno}>
                <tr>
                    <td>{item.Cname}</td>
                    <td>{item.grade}</td>
                    <td>{item.Ccredit}</td>
                </tr>
                </Fragment>
            )
        }
    });
    function showform(){
        showedit(true);
    }
    
  return (
    <Drawer open={open} 
    onClose={()=>ifopen(false)}
    getContainer={false}
    style={{
        position:"relative",
    }}
    title={Sno}>
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
                        <th>学分</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gradelist}
                    </tbody>
                </table>
               
            </div>
            <Button 
            style={{
                width:"100%",
            }}
            type="primary"
            onClick={showform}
            >修改信息</Button>
            
        </div>
       
    </Drawer>
    )
}

export default DetailCard;