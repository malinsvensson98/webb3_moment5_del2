'use strict'

document.getElementById('name').value=''; 
   

// Variabler
let coursesEl = document.getElementById("courses"); 
let addCourseBtn = document.getElementById("addCourse");  
let codeInput = document.getElementById("code"); 
let nameInput = document.getElementById("name"); 
let progressionInput = document.getElementById("progression"); 
let coursesyllabusInput = document.getElementById("coursesyllabus"); 


// Händelselyssnare
window.addEventListener('load', getCourses);
addCourseBtn.addEventListener('click', addCourse); 

// Funktioner
function getCourses() {
    coursesEl.innerHTML = ''; 
    fetch("https://malinsvensson.se/miun/webbutveckling3/moment5/api/read.php")
    .then(response => response.json()
    .then(data => {
        data.forEach(courses => {
coursesEl.innerHTML += 
`<div class="course"> 
<p> 
<b> Kod:</b> ${courses.code} <br/>
<b> Namn:</b> ${courses.name}<br/>
<b> Progression:</b> ${courses.progression}<br/>
<b> Kursplan:</b> <a class="syllabus_link" href="${courses.coursesyllabus}" target="_blank">Klicka här</a></p>
<button id="${courses.id}" onClick="deleteCourse(${courses.id})">Radera</button>
</div>` 
       
}) 
    }))
}

function deleteCourse(id) { 
    fetch("https://malinsvensson.se/miun/webbutveckling3/moment5/api/delete.php?id=" + id, {
        method: "DELETE", 
    })
    .then(response => response.json())
    .then(data => { 
        getCourses(); 
    })
.catch(error => { 
    console.log('Error: ', error); 
})
}

function addCourse(){ 
    let code = codeInput.value; 
    let name = nameInput.value; 
    let progression = progressionInput.value; 
    let coursesyllabus = coursesyllabusInput.value; 

    let courses = {'code': code, 'name': name, 'progression': progression, 'coursesyllabus': coursesyllabus}; 

    fetch("https://malinsvensson.se/miun/webbutveckling3/moment5/api/create.php", {
        method: "POST", 
        body: JSON.stringify(courses),
    })
    .then(response => response.json())
    .then(data => { 
        getCourses(); 
    })
.catch(error => { 
    console.log('Error: ', error); 
})

document.getElementById('name').value=''; 
document.getElementById('code').value=''; 
document.getElementById('progression').value=''; 
document.getElementById('coursesyllabus').value=''; 
}


