import React, { useState } from 'react';
import axios from 'axios';

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
      alert(response.data.status);
      setonEdit(false);
      props.fetchData();
    }catch(err){
      console.log(err);
    }
  }
  const deletedata = async ()=>{
    console.log(Cno);
    if (window.confirm('确定要删除吗？')){  
    try{
      const response = await axios.post('http://localhost:3001/deletecourse',{Cno:Cno});
      alert(response.data.status);
      props.fetchData();
    }catch(err){
      console.log(err);
    }
  }
  }
  return !onEdit?(
    <tr >
    <td>{props.props.Cno}</td>
    <td>{props.props.Cname}</td>
    <td>{props.props.Cpno}</td>
    <td>{props.props.Ccredit}</td>
    <td>
        <input type='button' className='formbtn' value="编辑" onClick={()=>setonEdit(true)}/>
        <input type='button' className='formbtn' value="删除" onClick={()=>deletedata()} style={{color:'red'}}/>
    </td>
</tr>
):(
  <tr >
    <td><input type='text' className='formedit' value={Cno} style={{cursor:'not-allowed'}} readOnly/></td>
    <td><input type='text' className='formedit' onChange={(e)=>setCname(e.target.value)} value={Cname} /></td>
    <td><input type='text' className='formedit' onChange={(e)=>setCpno(e.target.value)} value={Cpno} /></td>
    <td><input type='text' className='formedit' onChange={(e)=>setCcredit(e.target.value)} value={Ccredit} /></td>
    <td>
        <input type='button' className='formbtn' value="取消" onClick={()=>setonEdit(false)} />
        <input type='button' className='formbtn' value="保存" onClick={()=>postdata()} />
    </td>
</tr>
)}

export default SingleCourse;