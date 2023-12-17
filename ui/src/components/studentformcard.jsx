import { useEffect,useState } from "react";
import React from "react";
import "./css/formcard.css";
import axios from "axios";
import { message,Input,Tooltip,Button,Form} from "antd";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';


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
    const editlist = profilenames.map((profilename) => (
        
        <Form.Item
            label={profilenamesql[profilename]}
            name={profilename} // 添加 name 属性
            key={profilename}
            style={{
                margin: "15px 30px 30px 30px",
            }}
            rules={[
                {
                    required: profilenamesql[profilename] !== "奖学金情况" ? true : false,
                    message: `请输入${profilenamesql[profilename]}`,
                },
            ]}
        >
            {(mode === 2 && profilename === 'Sno') ? (
                <Input
                    className="readonly"
                    value={formValues[profilename]}
                    onChange={(e) => handleChange(profilename, e.target.value)}
                    readOnly
                    suffix={
                        <Tooltip title="学号不可更改">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />
            ) : (
                <Input
                    value={formValues[profilename]}
                    onChange={(e) => handleChange(profilename, e.target.value)}
                />
            )}
            {errorMessages[profilename] && (
                <p className="wrongmessage">{errorMessages[profilename]}</p>
            )}
        </Form.Item>
    ));
    

    function handlesubmit(){
        const newErrorMessages = {};
        profilenames.forEach((profilename) => {
          if (profilename !== "Scholarship" && (formValues[profilename] === undefined|| formValues[profilename] == "")) {
            newErrorMessages[profilename] = `请输入${profilenamesql[profilename]}`;
          } else {
            newErrorMessages[profilename] = "";
          }
        });
    
        setErrorMessages(newErrorMessages);
        const hasEmptyFields = profilenames.some(
            (profilename) =>{
                return (profilename !== "Scholarship" && (formValues[profilename] === undefined|| formValues[profilename] == ""))?true:false;
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
                message.success("添加学生"+response.data.studentinfo.Sno+"信息成功");
            }catch(error){
                console.log(error);
                message.error("添加学生失败!");
            }
            console.log(data);
    }
    async function putdata(){
        try{
            const response = await axios.post("http://localhost:3001/updatestudent",formValues);
            console.log(response.data);
            message.success("修改学生"+response.data.studentinfo.Sno+"信息成功");
        }catch(error){
            message.error("修改学生信息失败!");
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
                <Form
                initialValues={formValues}
                onFinish={handlesubmit}>
                {editlist}
                </Form>
                <div className="button">
                    <Button
                    type="primary"
                    onClick={handlesubmit}
                    style={{
                        width:"100px",
                        margin:"5px 10px 10px",
                    }}
                    >确定</Button>
                    <Button
                    onClick={deleteformcard}
                    type="dashed"
                    style={{
                        width:"100px",
                        margin:"5px 10px 10px",
                    }}>
                        取消
                    </Button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default StudentFormcard;