import React, { Component } from 'react';
import {Header} from '../components/Header.jsx';
import {Footer} from '../components/Footer.jsx';
import Leftbar from '../components/Leftbar.jsx';
import './css/home.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentsInfo from '../components/studentsinfo.jsx';
import CoursesInfo from '../components/course/coursesinfo.jsx';
import GradesInfo from '../components/grade/gradeinfo.jsx';

class Homepage extends Component {
  componentDidMount() {
    // Your componentDidMount logic, if needed
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <div className="corepage">
        <Leftbar/>
        <Router>
          <Routes>
            <Route path='/student' element={<StudentsInfo/>}>
            </Route>
            <Route path='/course' element={<CoursesInfo/>}>
            </Route>
            <Route path='/S-C' element={<GradesInfo></GradesInfo>}>
            </Route>
          
          </Routes>
        </Router>
        </div>
        <Footer/>
      </div>
      );
  }
}

export default Homepage;
