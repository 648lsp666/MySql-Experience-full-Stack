import React,{useState,useEffect} from'react';
import './css/student.css';
import PaginationComponent from './pagination';
import axios from 'axios';
import SingleStudent from './singlestudent';
import StudentFormcard from './studentformcard';
import { message,Button ,Input} from 'antd';
const { Search } = Input;


function StudentsInfo(props) {
    const [whethershowadd,setwhethershowadd] = useState(0);
    const [mode,setmode] = useState(0);
    const [students, setStudents] = useState([]);
    const [currentStudent,setcurrentStudent] = useState(0);

    function handleaddClick(){
        setcurrentStudent({});
        setwhethershowadd(1);
        setmode(1);
    }
    function handleeditclick(){
        setcurrentStudent();
        setwhethershowadd(1);
        setmode(2);
    }
    function oncancel(){
        setwhethershowadd(0);
    }
    function handleSearch(){
        //搜索学生
    }

    useEffect(() => {
        fetchData();
    }, [students]);

    const fetchData = async () => {
        try {
        const response = await axios.get('http://localhost:3001/getstudentinfo');
        setStudents(response.data.studentinfo);
        } catch (error) {
            message.error('获取学生信息失败!');
            console.log(error);
        }
    };
    
    const itemsPerPage = 12;
    const studentlength = students.length;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // 截取当前页的数据
    const currentPageData = students.slice(startIndex, endIndex);      
    const studentsList = currentPageData.map((student) => (
        <SingleStudent key={student.id} props={student} onEdit={[setcurrentStudent,handleeditclick]} />
    ));

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
      
        // 截取当前页的数据
        const currentPageData = students.slice(startIndex, endIndex);      
        const studentsList = currentPageData.map((student) => (
            <SingleStudent key={student.id} props={student} onEdit={[setcurrentStudent,handleeditclick]}/>
          ));
        
      // 这里可以调用你的数据加载函数或请求等
    };


    return (
        <div className="container">
            {whethershowadd!=0 && <StudentFormcard mode={mode} oncancel={oncancel} data={currentStudent} onsubmit={handlePageChange}></StudentFormcard>}
            <div className="card-header">
                <h3 className="card-title">学生信息</h3>
                <Button type="primary" style={{
                    position: 'absolute',
                    transform: 'translateX(100px)',
                }} onClick={handleaddClick}>+添加学生</Button>
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
                                <th>性别</th>
                                <th>年龄</th>
                                <th>系别</th>
                                <th>奖学金情况</th>
                                <th style={{
                                    color:'red',
                                    minWidth:"150px",
                                }}>学籍异动</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsList}
                        </tbody>
                    </table>

                </div>
                
        </div>
        <PaginationComponent
                totalItems = {studentlength} 
                itemsPerPage = {itemsPerPage} 
                onPageChange = {handlePageChange}/>
        </div>
)}

export default StudentsInfo;