import React, { useState } from "react";
import "../css/coursecard.css";
import axios from "axios";

function Coursecard({setCourses,setNewCourse,setWhethershowadd}){
    const [Cno,setCno] = useState(null);    
    const [Cname,setCname] = useState(null);    
    const [Cpno,setCpno] = useState(null);    
    const [Ccredit,setCcredit] = useState(null);
    const handleSubmit = async ()=>{
        const newcourse = {
            Cno:Cno,
            Cname:Cname,
            Cpno:Cpno,
            Ccredit:Ccredit,            
        }
        try{
            const response = await axios.post("http://localhost:3001/addcourse",newcourse);
            console.log(response);
            alert(response.data.status);
            
        }catch(error){
            console.log(error);
        }
        
        setCourses((prevCourses) => [...prevCourses,newcourse]);
        setNewCourse(null);
    }
    const handleCancel = ()=>{
        setCourses((prevCourses) =>{
            return prevCourses.filter((course) => course.Cno!== null);
        })
        setNewCourse(null);
    }
    return(
        <tr >
    <td>
        <input type="text" className='formedit' onChange={(e)=>setCno(e.target.value)}></input></td>
    <td><input type="text" className='formedit' onChange={(e)=>setCname(e.target.value)}></input></td>
    <td><input 
    type="text" 
    className='formedit' 
    onChange={(e)=>setCpno(e.target.value)} 
    readOnly
    style={{
        cursor:"not-allowed",
        border:"1px solid #000",
    }}></input></td>
    <td><input type="text" className='formedit' onChange={(e)=>setCcredit(e.target.value)}></input></td>
    <td>
        <input type='button' className='formbtn' value="确定" onClick={handleSubmit}/>
        <input type='button' className='formbtn' value="取消" style={{
            background:""}}
            onClick={handleCancel}/>
    </td>
</tr>
    )
}

export default Coursecard;