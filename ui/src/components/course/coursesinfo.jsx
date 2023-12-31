import React, { useState } from 'react';
import "../css/student.css"
import StudentFormcard from '../studentformcard';
import PaginationComponent from '../pagination';
import Coursecard from './coursecard';
import SingleCourse from './singlecourse';
import axios from 'axios';
import { message,Button,Input } from 'antd';
const { Search } = Input;

function CoursesInfo(props) {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getcourseinfo');
            setCourses(response.data.courseinfo);
        } catch (error) {
            message.error('获取课程信息失败!');
            console.log(error);
        }
    };

    useState(() => {
        fetchData();
    }, [courses]);

    const itemsPerPage = 12;
    console.log(courses);
    const coursesLength = courses.length;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentPageData = courses.slice(startIndex, endIndex);

    const coursesList = currentPageData.map((course) => (
        <SingleCourse 
        props={course} 
        key={course.Cno} 
        fetchData={fetchData}
       />
    ));

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function handleAddCourse() {
        setNewCourse({
            Cno: 'newCno',
            // 添加其他属性及初始值
        });
    }

    const renderNewCourseRow = () => {
        if (newCourse) {
            return <Coursecard 
            key={newCourse.Cno} 
            setCourses={setCourses}
            setNewCourse={setNewCourse}
            
            />;
        }
        return null;
    };

    function handleSearch(e) {
        e.preventDefault();
        const searchInput = document.querySelector('.search input').value;
        const searchResult = courses.filter((course) => {
            return course.Cno.includes(searchInput);
        });
        setCourses(searchResult);
    }
    return (
        <div className="container">
            
            <div className="card-header">
                <h3 className="card-title">课程信息</h3>
                <Button
                    style={{
                        position: 'absolute',
                        transform:"translateX(100px)"
                    }}
                    type='primary'
                    onClick={handleAddCourse}
                >+添加课程</Button>
                {/* 其他组件 */}
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
                    {/* 渲染现有课程 */}
                    <table>
                        <thead>
                            <tr>
                                <th>课程编号</th>
                                <th>课程全称</th>
                                <th>课程先行号</th>
                                <th>课程学分</th>
                                <th>课程处理</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderNewCourseRow()}
                            {coursesList}
                        </tbody>
                    </table>
                </div>
            </div>
            <PaginationComponent
                totalItems={coursesLength}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default CoursesInfo;
