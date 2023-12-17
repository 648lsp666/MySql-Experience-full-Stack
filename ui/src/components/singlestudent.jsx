import React, { Component } from 'react';
import axios from 'axios';
import {Button, message, Modal} from 'antd';
const confirm = Modal.confirm;

function SingleStudent(props) {
  const { Sno, Sname, Ssex, Sage,Sdept, Scholarship } = props.props;

    function handleEdit(e){
        //props.editStudent(Sno);
        const onEdit = props.onEdit[1];
        onEdit();
        const setStudent = props.onEdit[0];
        setStudent({
            Sno:Sno,
            Sname:Sname,
            Ssex:Ssex,
            Sage:Sage,
            Sdept:Sdept,
            Scholarship:Scholarship
        });
    }
    const warning = ()=>{
        confirm({
            title: '警告！',
            content: '确认删除该学生信息吗?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    async function handleDelete(){
        if(!window.confirm("确认删除该学生信息吗?")){
            return;
        }
        //props.deleteStudent(Sno);
        try{
            const response = await axios.post("http://localhost:3001/deletestudent",{Sno:Sno});
            console.log(response.data);
            message.success("删除学生"+response.data.studentinfo.Sno+"信息成功");
        }catch(error){
            message.error("删除学生信息失败!");
            console.log(error);
        }
    }
  return (
    <tr >
    <td>{Sno}</td>
    <td>{Sname}</td>
    <td>{Ssex}</td>
    <td>{Sage}</td>
    <td>{Sdept}</td>
    <td>{Scholarship}</td>
    <td>
        <Button type="default" value="修改" 
        size='small'
        style={{
            marginRight: "5px",
        }}
        onClick={handleEdit}>修改</Button>
        <Button 
        type='default' 
        danger value="删除" 
        onClick={warning}
        size='small'>删除</Button>
    </td>
</tr>
)}

export default SingleStudent;