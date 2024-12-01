//for storing datas
const students = [];
const lectures = [];

const btnAddStudent = document.getElementById('btnAddStudent');
const btnAddLecture = document.getElementById('btnAddLecture');
const btnListStudents = document.getElementById('btnListStudents');
const btnListLectures = document.getElementById('btnListLectures');
const studentFormSection = document.getElementById('studentFormSection');
const lectureFormSection = document.getElementById('lectureFormSection');
const studentTableSection = document.getElementById('studentTableSection');
const lectureTableSection = document.getElementById('lectureTableSection');
const studentTable = document.getElementById('studentTable');
const lectureTable = document.getElementById('lectureTable');
const studentSearch = document.getElementById('studentSearch');

// for plane main page we can hide the sections until they are called

function hideSections(){
    studentFormSection.classList.add('hidden');
    lectureFormSection.classList.add('hidden');
    studentTableSection.classList.add('hidden');
    lectureTableSection.classList.add('hidden');
}

// when we clicked the buttons 'hidden' marks will remove then our sections can display

btnAddStudent.addEventListener('click', () => {
    hideSections();
    studentFormSection.classList.remove('hidden');
});

btnAddLecture.addEventListener('click', () => {
    hideSections();
    lectureFormSection.classList.remove('hidden');
});

btnListStudents.addEventListener('click', () => {
    hideSections();
    studentTableSection.classList.remove('hidden');
    renderingStudentTable();
});

btnListLectures.addEventListener('click', () => {
    hideSections();
    lectureTableSection.classList.remove('hidden');
    renderingLectureTable();
});

// Adding lectures
document.getElementById('lectureForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const lectureCode = document.getElementById('lectureCode').value;
    const lectureName = document.getElementById('lectureName').value;
    const lectureInstructor = document.getElementById('lectureInstructor').value;
    const gradingScale = document.querySelector('input[name = "gradingScale"]:checked')?.value;

    if (!gradingScale) {
        alert('Please select a grading scale..');
        return;
    }

    lectures.push({lectureCode, lectureName, lectureInstructor, gradingScale});
    updateLectureDropdown();
    renderingLectureTable();
    e.target.reset();
    alert('Lecture successfully added!');
});


studentSearch.addEventListener('input', () => {
    const searchValue = studentSearch.value.toLowerCase();
    const filteredStudent = students.filter(student =>
        student.sid.toLowerCase().includes(searchValue) ||
        student.sName.toLowerCase().includes(searchValue) ||
        student.sSurname.toLowerCase().includes(searchValue)
    );

    renderFilteredStudent(filteredStudent);
});

function renderFilteredStudent(filteredStudent) {
    studentTable.innerHTML = '';

    if (filteredStudent.length === 0) {
        studentTable.innerHTML = `<tr><td colspan="7">No students match your search!!</td></tr>`;
        return;
    }

    filteredStudent.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.sid}</td>
            <td>${student.sName}</td>
            <td>${student.sSurname}</td>
            <td>${student.midterm}</td>
            <td>${student.final}</td>
            <td>${student.grade}</td>
            <td>
                <button onclick="deleteStudent(${students.indexOf(student)})">Delete</button>
                <button onclick="editStudent(${students.indexOf(student)})">Edit</button>
            </td>
        `;
        studentTable.appendChild(row);
    });
}

//Adding students
document.getElementById('studentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const sid = document.getElementById('studentID').value;
    const sName = document.getElementById('studentName').value;
    const sSurname = document.getElementById('studentSurname').value;
    const midterm = parseFloat(document.getElementById('midtermScore').value);
    const final = parseFloat(document.getElementById('finalScore').value);
    const lectureCode = document.getElementById('lectureDropdown').value;

    if (!lectureCode) {
        alert('You have to select a lecture!');
        return;
    }

    updateLectureDropdown();
    const lecture = lectures.find((l) => l.lectureCode === lectureCode);
    const choosenScale = lecture.gradingScale; // choosenScale = 7 or 10 ?

    if (midterm < 0 || midterm > 100 || final < 0 || final>100) {
        alert('You have to enter a score between 0 and 100!!!')
    }
    const grade = gradeCalculator(midterm, final, choosenScale);

    students.push({sid, sName, sSurname, midterm, final, grade, lectureCode});
    renderingStudentTable();

    lecture.studentCount = (lecture.studentCount || 0) + 1; //increase the number of determined lecture's student number
    
    renderingLectureTable();
    e.target.reset();
    alert('Student successfully added!');
});


// this function for calculating letter grades
function gradeCalculator(midterm, final, choosenScale) {
    
    const total = midterm * 0.4 + final * 0.6;
    
    if (total<0 || total > 100) {
        alert('Invalid score interval!');
        return;
    }
    
    const gradeValues = {
        '7': {A:93, B: 85, C:77, D:70, F:69},
        '10': {A:90, B:80, C:70, D:60, F:59}
    }

    const selected = gradeValues[choosenScale];
    
    for (const grade in selected) {
        if (total >= selected[grade]) {
            return grade;
        }
    }
    
    return 'F';
}

// rendering student table
function renderingStudentTable(studentList = students) {
    studentTable.innerHTML = '';
    
    if (studentList.length === 0) {
        studentTable.innerHTML = `<tr><td colspan="8">No students available.</td></tr>`;
        return;
    }
    
    studentList.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.sid}</td>
            <td>${student.sName}</td>
            <td>${student.sSurname}</td>
            <td>${student.midterm}</td>
            <td>${student.final}</td>
            <td>${student.grade}</td>
            <td>${student.lectureCode}</td>
            <td>
                <button onclick="deleteStudent(${index})">Delete</button>
                <button onclick="editStudent(${index})">Edit</button>
            </td>
        `;
        studentTable.appendChild(row);
    });
}

document.getElementById('showPassed').addEventListener('click', () => { 
    const passedStudents = students.filter(student => student.grade !== 'F'); 
    renderingStudentTable(passedStudents); //shows successful students
}); 
 
document.getElementById('showFailed').addEventListener('click', () => { 
    const failedStudents = students.filter(student => student.grade === 'F'); 
    renderingStudentTable(failedStudents); //shows failed students
}); 
 
document.getElementById('showAll').addEventListener('click', () => { 
    renderingStudentTable(students); // shows all students
});

//rendering lecture table
function renderingLectureTable() {
    lectureTable.innerHTML = '';

    if (lectures.length === 0) {
        lectureTable.innerHTML = `<tr><td colspan="6">No lectures available.</td></tr>`;
        return;
    }

    lectures.forEach((lecture, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lecture.lectureCode}</td>
            <td>${lecture.lectureName}</td>
            <td>${lecture.lectureInstructor}</td>
            <td>${lecture.gradingScale}</td>
            <td>${lecture.studentCount || 0}</td>
            <td>
                <button onclick="deleteLecture(${index})">Delete</button>
                <button onclick="editLecture(${index})">Edit</button>
            </td>
        `;
        lectureTable.appendChild(row);
    });
}

// deleting a student
function deleteStudent(index){
    const student = students[index];
    const lecture = lectures.find((l) => l.lectureCode === student.lectureCode);
    if (lecture) {
        lecture.studentCount = (lecture.studentCount || 0) -1; //avoiding any errors we write the studentCount with that way
    }
    students.splice(index, 1);

    renderingStudentTable();
    renderingLectureTable();
    alert('This student deleted successfully...');
}

function editStudent(index) {
    const student = students[index];
    
    const studentID = prompt("Enter Student ID:", student.sid);
    const studentName = prompt("Enter Student Name:", student.sName);
    const studentSurname = prompt("Enter Student Surname:", student.sSurname);
    const midterm = parseFloat(prompt("Enter Midterm Score:", student.midterm));
    const final = parseFloat(prompt("Enter Final Score:", student.final));

    renderingLectureTable();
    const lecture = lectures.find((l) => l.lectureCode === student.lectureCode);
    const grade = gradeCalculator(midterm, final, lecture.gradingScale);

    students[index] = { sid: studentID, sName: studentName, sSurname: studentSurname, midterm, final, grade, lectureCode: student.lectureCode };

    renderingStudentTable();
    alert("Student edited successfully!");
}

//deleting a lecture and its relatives
function deleteLecture(index) {
    
    /*if (index < 0 || index >= lectures.length) {
        alert('Invalid index!');
        return;
    }*/

    const lectureCode = lectures[index].lectureCode;
    students = students.filter((student) => student.lectureCode !== lectureCode);
    lectures.splice(index, 1);
    
    renderingLectureTable();
    renderingStudentTable();
    alert('Lecture and its enrolled students deleted successfully!..')
}

function editLecture(index) {
    const lecture = lectures[index];
    
    const lectureCode = prompt("Enter Lecture Code:", lecture.lectureCode);
    const lectureName = prompt("Enter Lecture Name:", lecture.lectureName);
    const lectureInstructor = prompt("Enter Lecture Instructor:", lecture.lectureInstructor);
    const gradingScale = prompt("Enter Grading Scale (7 or 10):", lecture.gradingScale);

    if (gradingScale !== "7" && gradingScale !== "10") {
        alert("Grading scale must be 7 or 10.");
        return;
    }

    lectures[index] = { lectureCode, lectureName, lectureInstructor, gradingScale, studentCount: lecture.studentCount || 0 };

    renderingLectureTable();
    updateLectureDropdown();
    alert("Lecture updated successfully!");

}

function updateLectureDropdown() {
    const lectureDropdown = document.getElementById('lectureDropdown');
    lectureDropdown.innerHTML = `<option value="">Select Lecture</option>`;
    lectures.forEach((lecture) => {
        const option = document.createElement('option');
        option.value = lecture.lectureCode;
        option.textContent = lecture.lectureName;
        lectureDropdown.appendChild(option);
    });
}

