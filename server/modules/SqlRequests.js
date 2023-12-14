const studentQuery = {
    getStudent: 'SELECT * FROM student ORDER BY Sno ASC',
    getStudentById: 'SELECT * FROM student WHERE id = ?1',
    updateStudent: '',    
}
const courseQuery = {
    getCourse: 'SELECT * FROM course ORDER BY convert(Cno,signed)',
    addCourse: 'insert into course values(?,?,?,?)',
    updateCourse: 'UPDATE course SET Cname=?,Cpno=?,Ccredit=? WHERE Cno=?',
    deleteCourse: 'DELETE FROM course WHERE Cno=?',
}
const gradeQuery = {
    getAvgGrade: 'select student.Sno,Sname,Sdept,avg(sc.grade) as grade from student,sc where student.Sno=sc.Sno group by sc.Sno',
    getGradeById: "select sc.Sno,course.Cname,sc.grade from course,sc where sc.Sno=? and course.Cno = sc.Cno",
}

module.exports = {
    studentQuery,
    courseQuery,
    gradeQuery
}