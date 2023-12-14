import React, { Component } from 'react';
import axios from 'axios';

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
    async function handleDelete(){
        if(!window.confirm("确认删除该学生信息吗?")){
            return;
        }
        //props.deleteStudent(Sno);
        try{
            const response = await axios.post("http://localhost:3001/deletestudent",{Sno:Sno});
            console.log(response.data);
            alert("删除学生"+response.data.studentinfo.Sno+"信息成功");
        }catch(error){
            alert("删除学生信息失败!");
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
        <input type='button' className='formbtn' value="编辑" onClick={handleEdit}/>
        <input type='button' className='formbtn' value="删除"  style={{color:'red'}} onClick={handleDelete}/>
    </td>
</tr>
)}

export default SingleStudent;