import React, { Component, useState } from 'react';
import { useParams } from 'react-router';
import { Select } from 'antd';
import { PieChart, Pie, Cell, Legend, Tooltip,LabelList } from 'recharts';
import axios from 'axios';

function Gradebycourse(){
  const [grade, setGrade] = useState([]);
  const {Cno} = useParams();
  const Great = grade.filter(grade => grade.Grade >= 90);
  const formal = grade.filter(grade => grade.Grade < 90 && grade.Grade >=60);
  const Pass = grade.filter(grade => grade.Grade < 60);
  const data = [
      { name: '优秀人数', value: Great.length },
      { name: '中游人数', value: formal.length },
      { name: '不及格人数', value: Pass.length },
    ];
  const fetchdata = async ()=>{
    if(Cno){
      try{
      const response = await axios.post("http://localhost:3001/getallgradebycno",{Cno:Cno});
      console.log(response.data.gradeinfo);
      setGrade(response.data.gradeinfo);
      }catch(err){
        console.log(err);
      }
  }
}
  useState(()=>{
      fetchdata();
  },[Cno]);
      // 计算总和
  const total = data.reduce((acc, entry) => acc + entry.value, 0);

  // 计算百分比
  const dataWithPercentage = data.map(entry => ({
    ...entry,
    percentage: ((entry.value / total)*100).toString()+"%",
  }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const CustomLegend = (props) => {
      const { payload } = props;
  
      return (
        <ul>
          {payload.map((entry, index) => (
            <li key={`legend-${index}`}>
              <span style={{ color: entry.color }}>{`${entry.payload.name}: ${entry.payload.value}`}</span>
            </li>
          ))}
        </ul>
      );
    };
  
  
  return (
    <div className="container">
      <div className="card-header">
            <h3 className="card-title">数据库成绩统计</h3>
            <Select
              defaultValue="数据库"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'Yiminghe',
                  label: 'yiminghe',
                },
              ]}
            />
        </div>
        <div className="card-body">
          
    <PieChart width={300} height={300}>
      <Pie
        data={dataWithPercentage}
        cx={80}
        cy={150}
        outerRadius={80}
        fill="white"
        dataKey="value"

      > 
        {dataWithPercentage.map((entry,index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <LabelList dataKey="percentage" position="inside" />
      </Pie>
      <Tooltip />
      <Legend align="right" content={<CustomLegend/>} layout='vertical' verticalAlign='middle'/>
    </PieChart>

    </div>
    </div>
    );
}

export default Gradebycourse;
