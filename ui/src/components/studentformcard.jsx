import { useEffect,useState } from "react";
import React from "react";
import "./css/formcard.css";
import axios from "axios";

function StudentFormcard({mode,data,oncancel,onsubmit}){
    
    const [formValues, setFormValues] = useState({
        Sno: data.Sno,
        Sname: data.Sname,
        Ssex: data.Ssex,
        Sage: data.Sage,
        Sdept: data.Sdept,
        Scholarship: data.Scholarship,
    });
    //初始提交表单内容
    const [errorMessages, setErrorMessages] = useState({
        Sno: "",
        Sname: "",
        Ssex: "",
        Sage: "",
        Sdept: "",
      });
    
      const handleChange = (profilename, value) => {
        setFormValues((prevValues) => ({
          ...prevValues,
          [profilename]: value,
        }));
        setErrorMessages((prevErrorMessages) => ({
         ...prevErrorMessages,
          [profilename]: '',
        }));
      };
      //onchange实时更新表单内容到formvalues
      //添加学生表单为空，编辑学生表单有内容
      const profilenames = [
        "Sno",
        "Sname",
        "Ssex",
        "Sage",
        "Sdept",
        "Scholarship",
    ];
    const profilenamesql = {
        Sno:"学号",
        Sname:"姓名",
        Ssex:"性别",
        Sage:"年龄",
        Sdept:"系别",
        Scholarship:"奖学金情况",
    }
    //将中文内容连接到数据库属性
    const editlist = profilenames.map((profilename)=>(
        <div className="oneprofileedit" key={profilename}>
            <p className="profileEditTitle">{profilenamesql[profilename]}
            <span style={{color:"red"}}>
            {profilename !== 'Scholarship' && '*'}
            </span>
            </p>
            {(mode==2&&profilename=='Sno')?<input type="text" class="formedit readonly"
            value={formValues[profilename]}
            onChange={(e) => 
                handleChange(profilename, e.target.value)}
            readOnly
    />:<input type="text" class="formedit"
            value={formValues[profilename]}
            onChange={(e) => 
                handleChange(profilename, e.target.value)}
            />}
        {errorMessages[profilename] && (
        <p className="wrongmessage">{errorMessages[profilename]}</p>
        )}  
            </div>
    ))

    function handlesubmit(){
        const newErrorMessages = {};
        profilenames.forEach((profilename) => {
          if (profilename !== "Scholarship" && (formValues[profilename] === undefined|| formValues[profilename] === "")) {
            newErrorMessages[profilename] = `请输入${profilenamesql[profilename]}`;
          } else {
            newErrorMessages[profilename] = "";
          }
        });
    
        setErrorMessages(newErrorMessages);
        const hasEmptyFields = profilenames.some(
            (profilename) =>{
                return (profilename !== "Scholarship" && (formValues[profilename] === undefined|| formValues[profilename] === ""))?true:false;
            }
          );
        console.log(hasEmptyFields);
        if (!hasEmptyFields) {
            mode==1?postdata():putdata();
            oncancel();
        }
      
    }
    function deleteformcard(){
        oncancel();
    }

    async function postdata(){
            try{
                const response = await axios.post("http://localhost:3001/addstudent",formValues);
                console.log(response.data);
                alert("添加学生"+response.data.studentinfo.Sno+"信息成功");
            }catch(error){
                console.log(error);
                alert("添加学生失败!");
            }
            console.log(data);
    }
    async function putdata(){
        try{
            const response = await axios.post("http://localhost:3001/updatestudent",formValues);
            console.log(response.data);
            alert("修改学生"+response.data.studentinfo.Sno+"信息成功");
        }catch(error){
            alert("修改学生信息失败!");
            console.log(error);
        }
    }
    //传递数据到后端
    const title = mode==1?"添加学生":"修改信息";
    return (
        <div className="formcard">
            <div className="innercontainer">
            <div className="card-header">
            <h2 className="card-title">
                {title}
            </h2>
            </div>
            <div className="formcard-body">
                {editlist}
                <div className="button" style={{
                    padding:"20px",
                    gap:"20px",
                }}>
                    <input className="formbtn" 
                    type="button" 
                    value="确定" 
                    onClick={handlesubmit}
                    style={{
                        background:"#3e8080",
                    }}/>
                    <input 
                    className="formbtn" 
                    type="button" 
                    value="取消" 
                    onClick={deleteformcard}
                    style={{
                        background:"#3e8020",
                    }}/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default StudentFormcard;