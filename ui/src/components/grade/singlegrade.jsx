import React from 'react';
import axios from 'axios';
import { Button } from 'antd';

function SingleGrade(props) {
  const { Sno,Sname,Sdept,grade} = props.props;
  const avggrade = parseFloat(grade).toFixed(2);
  function handleClick(e) {
    props.onshow(Sno);
    props.ondetail(1);
  }
  return (
    <tr>
    <td onClick={(e)=>handleClick(e)}>{Sno}</td>
    <td>{Sname}</td>
    <td>{Sdept}</td>
    <td>{avggrade}</td>
    <td>
    <Button type="text" onClick={(e)=>handleClick(e)}>查看信息</Button>
    </td>
</tr>
)}

export default SingleGrade;