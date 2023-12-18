import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { Select,Button,Drawer} from 'antd';
import "../css/ratio.css";
import { PieChart, Pie, Cell, Legend, Tooltip,LabelList,BarChart,Bar,XAxis,YAxis,CartesianGrid} from 'recharts';
import Detailcard from '../detailcard';
import PaginationComponent from '../pagination';

function Gradebydept(){
  const parentRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setparentHeight] = useState(0);

  useEffect(() => {
    const updateParentSize = () => {
      if (parentRef.current) {
        setParentWidth(parentRef.current.offsetWidth);
        setparentHeight(parentRef.current.offsetHeight-10);
      }
    };

    window.addEventListener('resize', updateParentSize);
    updateParentSize(); // 初始化时获取一次父元素的宽度

    return () => {
      window.removeEventListener('resize', updateParentSize);
    };
  }, []);

  const [grade,setgrade] = useState([]);
  const [currentSegment,setcurrentSegment] = useState([]);
  const [ratios,setratios] = useState(null);
  const {Sdept} = useParams();
  const [dept,setdept] = useState(Sdept);


  const Great = grade.filter(grade => parseFloat(grade.Grade) >= 90);
  const Good = grade.filter(grade => parseFloat(grade.Grade) >= 80 && parseFloat(grade.Grade) < 90);
  const Fair = grade.filter(grade => parseFloat(grade.Grade) >= 70 && parseFloat(grade.Grade) < 80);
  const Poor = grade.filter(grade => parseFloat(grade.Grade) >= 60 && parseFloat(grade.Grade) < 70);
  const Fail = grade.filter(grade => parseFloat(grade.Grade) < 60);
  const data = [
      { name: '>90', 人数: Great.length ,value:Great },
      { name: '80-89', 人数: Good.length ,value:Good },
      { name: '70-79', 人数: Fair.length, value:Fair },
      { name: '60-69', 人数: Poor.length, value:Poor },
      { name: '<60', 人数: Fail.length, value:Fail },
  ];

  const fetchdata = async () => {
    if(Sdept){
      try{
      const response = await axios.post("http://localhost:3001/getallgradebysdept",{Sdept:dept});
      console.log(response.data);
      setgrade(response.data.gradeinfo);
    }
    catch(err){
      console.log(err);
    }
    }
  };
  //分页操作
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //计算排名  

  //处理点击柱状图柱子创建list
  const [list,setlist] = useState([]);
  const handleBarClick = (data) => {
    setcurrentSegment(data.payload.value);  
    const calculateRank = () => {
      const sortedGrades = grade.slice().sort((a, b) => parseFloat(b.Grade) - parseFloat(a.Grade));
      const studentIndex = sortedGrades.findIndex(student => student.Sno === data.payload.value[0].Sno);
      const rank = studentIndex + 1;
      return rank;
    };
    setlist(data.payload.value.slice(startIndex, endIndex).map((item, index) => {
      return (
        <tr key={item.Sno}>
        <td>{item.Sno}</td>
        <td>{item.Sname}</td>
        <td>{item.Grade}</td>
        <td>{item.Credit}</td>
        <td>{calculateRank()+index}/{grade.length}</td>
        <td>
           <Button type="text" onClick={(e)=>showDrawerinfo({
            Sno:item.Sno,Sname:item.Sname,Sdept:Sdept,grade:item.Grade,
           })}>查看信息</Button>
        </td>
        </tr>
      );
    }));
  };

  //根据路由获取数据
  
  useEffect(() => {
    fetchdata();
    setlist([]);
  }, [dept]);
  //根据grade便获获取ratios数据

  const options = [
    {
      value: 'CS',
      label: '计算机',
    },
    {
      value: 'MA',
      label: '文学',
    },
    {
      value: 'IS',
      label: '信息安全',
    },
  ];
  const [label,setlabel] = useState((options.map((item)=>{
    if(item.value === Sdept){
      return item.label;
    }
  })));
  const handleChange = (value) => {
    console.log(value);
      setdept(value);
      setlabel(options.map((item)=>{
        if(item.value === value){
          return item.label;
        }
      }));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //数据栏,用Drawer显示
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
    setratios(
      <div className="ratios">
        <div className="ratio">
          <h3>优秀率：</h3>
          <span>{Math.round(Great.length/grade.length*100).toFixed(2)}%</span>
        </div>
        <div className="ratio">
          <h3>加权最高分：</h3>
          <span>{Math.max(...grade.map(grade => parseFloat(grade.Grade))).toFixed(2)}</span>
          </div>
        <div className="ratio">
          <h3>年级平均分：</h3>
          <span>{Math.round(grade.map(grade => parseFloat(grade.Grade)).reduce((a,b)=>a+b)/grade.length).toFixed(2)}</span>
          </div>
        <div className="ratio">
          <h3>加权最低分：</h3>
          <span>{Math.min(...grade.map(grade => parseFloat(grade.Grade))).toFixed(2)}</span>
        </div>
        <div className="ratio">
          <h3>年级中位数分：</h3>
          <span>{((parseFloat(grade[Math.floor((grade.length-1)/2)].Grade)+parseFloat(grade[Math.ceil((grade.length-1)/2)].Grade))/2).toFixed(2)}</span>
          </div>
        <div className="ratio">
          <h3>不及格率：</h3>
          <span>{Math.round(Fail.length/grade.length*100).toFixed(2)}%</span>
          </div>
      </div>
      )
  };
  const onClose = () => {
    setOpen(false);
  };
  //学生信息栏,和gradeinfo一样,用drawer显示
  const [openinfo, setOpeninfo] = useState(false);
  const [currentProfile,setcurrentProfile] = useState({});
  const showDrawerinfo = (param) => {
    setcurrentProfile(param);
    setOpeninfo(!openinfo);
  };

  
    return (
      <div className="container">
      <div className="card-header">
            <h3 className="card-title">{label}系成绩统计</h3>
            <Button 
            type="primary" 
            onClick={showDrawer}
            style={{
              position:"absolute",
              transform:"translateX(180px)",
            }}>
              导出成绩
            </Button>
            <Select
              defaultValue={Sdept}
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={
                options
              }
            />
        </div>
      <div className='card-body' ref={parentRef}>
          <BarChart 
          width={parentWidth} 
          height={parentHeight} 
          data={data}
          margin={{top: 20, right: 20, left: 0, bottom: 0}}
          >
            <CartesianGrid  />
            <XAxis dataKey="name" />
            <YAxis
              domain={100}
              interval={0}
              ticks={[0, 10, 20, 30]}
            />
            <Tooltip />
            <Bar dataKey="人数" 
            fill="#18ff09" 
            style={{
              cursor: 'pointer',
            }}
            label={{
              position: 'top',
            }}
            onClick={handleBarClick}/>
          </BarChart>
          <Drawer title={'成绩详情'} placement="right" onClose={onClose} open={open}>
            {ratios}
          </Drawer>
    </div>
    <div className="card-header">
            <h3 className="card-title">{label}系分段成绩排名</h3>
            </div>
            <div className="card-body">
            <table>
              <thead>
                  <tr>
                      <th>学号</th>
                      <th>姓名</th>
                      <th>加权成绩</th>
                      <th>总学分</th>
                      <th>系排名</th>
                      <th>操作</th>
                  </tr>
              </thead>
              <tbody>
                {list}
              </tbody>
          </table>
          <Detailcard 
                    profile={currentProfile} 
                    open = {openinfo}
                    ifopen = {setOpeninfo}
                    />
     </div>
     <PaginationComponent
            totalItems = {currentSegment.length} 
            itemsPerPage = {itemsPerPage} 
            onPageChange = {handlePageChange}/>
</div>

      );
}

export default Gradebydept;
