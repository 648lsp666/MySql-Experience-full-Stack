const studentQuery = {
    getStudent: 'SELECT * FROM student ORDER BY Sno ASC',
    getStudentById: 'select * from student where Sno like ?',
    updateStudent: '',    
}
const courseQuery = {
    getCourse: 'SELECT * FROM course ORDER BY convert(Cno,signed)',
    addCourse: 'insert into course values(?,?,?,?)',
    updateCourse: 'UPDATE course SET Cname=?,Cpno=?,Ccredit=? WHERE Cno=?',
    deleteCourse: 'DELETE FROM course WHERE Cno=?',
}
const gradeQuery = {
    getAvgGrade: 'select student.Sno,Sname,Sdept,sum(grade*Ccredit)/sum(Ccredit) as grade from student join sc on sc.Sno = student.Sno join course on sc.Cno = course.Cno group by student.Sno order by grade desc',
    getGradeById: "select sc.Sno,course.Cname,sc.grade,course.Ccredit from course,sc where sc.Sno=? and course.Cno = sc.Cno order by course.Cno;",
    getGradeprofilebyCno: "select student.*,sc.Grade from sc,student where sc.Cno = ? and sc.Sno=student.Sno order by sc.Grade",
    getGradeprofilebySdept: "select student.Sno,Sname,Sdept,round(sum(grade*Ccredit)/sum(Ccredit),2) as Grade, sum(Ccredit) as Credit from student join sc on sc.Sno = student.Sno join course on sc.Cno = course.Cno where student.Sdept =? group by student.Sno order by Grade desc",
}

module.exports = {
    studentQuery,
    courseQuery,
    gradeQuery
}