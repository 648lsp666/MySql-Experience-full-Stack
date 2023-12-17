import React, { useState } from 'react';
import axios from 'axios';
import { message,Button,Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
const {confirm } = Modal;

function SingleCourse(props) {
  console.log(props);
  const [Cno,setCno] = useState(props.props.Cno);
  const [Cname,setCname] = useState(props.props.Cname);
  const [Cpno,setCpno] = useState(props.props.Cpno);
  const [Ccredit,setCcredit] = useState(props.props.Ccredit);
  const newCourse = {Cno:Cno,Cname:Cname,Cpno:Cpno,Ccredit:Ccredit};
  const [onEdit,setonEdit] = useState(false);
  const postdata = async ()=>{
    try{
      const response = await axios.post('http://localhost:3001/updatecourse',newCourse);
      console.log(response);
      setonEdit(false);
      props.fetchData();
      message.success('修改成功!');
    }catch(err){
      message.error('修改失败!');
      console.log(err);
    }
  }
  const warning = () => {
    confirm({
      title: '警告！',
      icon: <ExclamationCircleFilled />,
      content: '确认删除课程吗？',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deletedata();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const deletedata = async ()=>{
    console.log(Cno);
    try{
      const response = await axios.post('http://localhost:3001/deletecourse',{Cno:Cno});
  
      props.fetchData();
      message.success('删除成功!');
    }catch(err){
      message.error('删除失败!');
      console.log(err);
    }
  }
  return !onEdit?(
    <tr >
    <td>{props.props.Cno}</td>
    <td>{props.props.Cname}</td>
    <td>{props.props.Cpno}</td>
    <td>{props.props.Ccredit}</td>
    <td>
    <Button type="default"size='small'style={{
      margin: '0 5px'
    }} onClick={()=>setonEdit(true)} >编辑</Button>
    <Button type="default"size='small'style={{
    }} onClick={warning} danger>删除</Button>
    </td>
    
</tr>
):(
  <tr >
    <td><input type='text' className='formedit' value={Cno} style={{cursor:'not-allowed'}} readOnly/></td>
    <td><input type='text' className='formedit' onChange={(e)=>setCname(e.target.value)} value={Cname} /></td>
    <td><input type='text' className='formedit' onChange={(e)=>setCpno(e.target.value)} value={Cpno} /></td>
    <td><input type='text' className='formedit' onChange={(e)=>setCcredit(e.target.value)} value={Ccredit} /></td>
    <td>
        <Button size="small" type="default"
        style={{
            margin: '0 5px'
        }} onClick={()=>setonEdit(false)}>取消</Button>
        <Button size="small" type="default" onClick={()=>postdata()}>保存</Button>
    </td>
</tr>
)}

export default SingleCourse;