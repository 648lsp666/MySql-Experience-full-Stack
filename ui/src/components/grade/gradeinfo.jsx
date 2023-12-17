import React, { useEffect, useState } from'react';
import "../css/student.css";
import PaginationComponent from '../pagination';
import SingleGrade from './singlegrade';
import DetailCard from '../detailcard';
import GradeCard from './gradecard';
import axios from 'axios';
import { Input,Button,message} from 'antd';
const { Search } = Input;

function GradesInfo(props) {
    const [Grades, setGrades] = useState([]);
    const [CurrentSno, setCurrentSno] = useState(0);
    const [CurrentGrade, setCurrentGrade] = useState([]);
    const [Currentprofile, setCurrentprofile] = useState({});
    const [whethershowdetail, setwhethershowdetail] = useState(0);
    const [whethershowform, setwhethershowform] = useState(false);

    const fetchData = async () => {
        try {
        const response = await axios.get('http://localhost:3001/getgradeinfo');
        setGrades(response.data.gradeinfo);
        } catch (error) {
            console.log(error);
            message.error("连接服务器失败！");
        }
    };
    useState(()=>{
        fetchData();
    },[Grades]);
    const getdetail = async () =>{
        try {
            const response = await axios.post('http://localhost:3001/getallgrade',{Sno:CurrentSno});
            setCurrentGrade(response.data.gradeinfo);
            console.log(response.data.gradeinfo);
        } catch (error) {
            console.log(error);
            message.error("连接服务器失败！");
        }
    };

    useEffect(()=>{
        getdetail();
        Grades.map((Grade)=>{
            console.log(Grade.Sno);
            if(Grade.Sno === CurrentSno){
                setCurrentprofile(Grade);
            }
        });
    },[CurrentSno]);
    const itemsPerPage = 12;
    const Gradeslength = Grades.length;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // 截取当前页的数据
    const currentPageData = Grades.slice(startIndex, endIndex);      
    const GradesList = currentPageData.map((Grade) => (
        <SingleGrade props={Grade} onshow={setCurrentSno} ondetail={setwhethershowdetail} key={Grade.Sno}></SingleGrade>
    ));
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }
    function handleSearch(){

    }
    return (
        <div className="container">

        <GradeCard open={whethershowform} close={()=>setwhethershowform(false)}></GradeCard>
        <div className="card-header">
            <h3 className="card-title">成绩信息</h3>
            <form className='search'>
                    <Search
                    placeholder="根据内容搜索"
                    allowClear
                    enterButton="搜索"
                    size="middle"
                    onSearch={handleSearch}
                    />
                </form>
        </div>
        <div className="card-body">
            <div className="studentinfo">
                <table>
                    <thead>
                        <tr>
                            <th>学号</th>
                            <th>姓名</th>
                            <th>系别</th>
                            <th>加权成绩</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {GradesList}
                    </tbody>
                </table>
                <DetailCard 
                    profile={Currentprofile} 
                    gradedetail={CurrentGrade}
                    open = {whethershowdetail}
                    ifopen = {setwhethershowdetail}
                    showedit={setwhethershowform}
                    />
            </div>
        
    </div>
    <PaginationComponent
            totalItems = {Gradeslength} 
            itemsPerPage = {itemsPerPage} 
            onPageChange = {handlePageChange}/>
    </div>
    )
};

export default GradesInfo;