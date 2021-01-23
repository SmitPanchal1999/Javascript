let courses = ["Javascript", "Git", "Html", "Css", "Linux"];
function showAllStudents() {
    let div = document.getElementById("showStudents");
    div.innerHTML = "";
    div.style.display="block";
    for (let key of Object.keys(localStorage)) {
        console.log(localStorage.getItem(key));
        let obj = JSON.parse(localStorage.getItem(key));
        console.log(obj)
        if (obj.userType == "student") {
            div.innerHTML += `<button class="btn btn-primary" style="margin-bottom:10px;"  onclick="showStudentCourses(this.innerHTML)">${key}</button><br>`;
        }
    }

}
function storeCourses() {

    localStorage.setItem("courses", JSON.stringify(courses));
    let table = document.getElementById("table");
    for (let i = 0; i < courses.length; i++) {
        let row = table.insertRow();
        let cell1 = row.insertCell();
        let text1 = document.createTextNode(courses[i]);


        cell1.appendChild(text1);

        cell1.style.backgroundColor = "silver";

        cell1.style.border = "1px solid black";





        let cell3 = row.insertCell();
        let edit = document.createElement("button");
        edit.innerHTML = "Edit";
        edit.className = "editButton";
        edit.onclick = () => { editRow(row.rowIndex) };
        edit.style.backgroundColor = "green";
        edit.style.color = "white";
        cell3.appendChild(edit);
        cell1.style.width = "40%";


        let cell4 = row.insertCell();
        let del = document.createElement("button");
        del.className = "deleteButton";
        del.innerHTML = "Delete";
        del.style.backgroundColor = "red";
        del.style.color = "white";

        del.onclick = () => { deleteRow(row.rowIndex) };
        cell4.appendChild(del);


    }

}
let selectedUser;
function showStudentCourses(username) {
    selectedUser = username;
    console.log(localStorage.getItem(username), username);
    let userObj = JSON.parse(localStorage.getItem(username));

    let print = document.getElementById("assignedCourses");
    print.style.display="block";
    print.innerHTML = "";
    if (userObj.courses == undefined) {
        courses.forEach(course => {
            let temp = "";
            temp += `<p><span style="margin-right:10px;color:red;font-weight:500;font-size:20px">${course}<button class="btn btn-primary" style="margin-bottom:10px;" onclick="add(this.parentNode.parentNode)">ADD</button></span></p>`


            print.innerHTML += temp;
        });
    }
    else {
        courses.forEach(course => {
            let temp = "";
            if (userObj.courses[course] == undefined) {
                temp += `<p><span style="margin-right:10px;color:red;font-weight:500;font-size:20px">${course}<button class="btn btn-primary" style="margin-bottom:10px;" onclick="add(this.parentNode.parentNode)">ADD</button></span></p>`
            }
            else {
                temp += `<p><span style="margin-right:10px;color:red;font-weight:500;font-size:20px">${course}<button class="btn btn-danger" style="margin-bottom:10px;" onclick="remove(this.parentNode.parentNode)">REMOVE</button></span></p>`

            }
            print.innerHTML += temp;
        });
    }
    print.style.display = "block";
}

function add(element) {

    let course = "";
    for (let i = 0; i < element.innerHTML.length; i++) {
        if (element.innerHTML[i] == ">") {
            for (let j = i + 1; j < element.innerHTML.length; j++) {
                if (element.innerHTML[j] == "<") {
                    break;
                }
                course += element.innerHTML[j]
            }
            break;
        }
    }
    let userObj = JSON.parse(localStorage.getItem(selectedUser));

    if (userObj.courses == undefined) {
        userObj.courses = {}
        userObj.courses[course] = 1;
    }
    else {
        userObj.courses[course] = 1;
    }
    localStorage.setItem(selectedUser, JSON.stringify(userObj));
    element.innerHTML = `<span style="margin-right:10px;color:red;font-weight:500;font-size:20px">${course}<button class="btn btn-danger" style="margin-bottom:10px;"  onclick="remove(this.parentNode.parentNode)">REMOVE</button></span>`;

}
function remove(element) {
    let course = "";
    for (let i = 0; i < element.innerHTML.length; i++) {
        if (element.innerHTML[i] == ">") {
            for (let j = i + 1; j < element.innerHTML.length; j++) {
                if (element.innerHTML[j] == "<") {
                    break;
                }
                course += element.innerHTML[j]
            }
            break;
        }
    }

    let userObj = JSON.parse(localStorage.getItem(selectedUser));
    delete userObj.courses[course];
    localStorage.setItem(selectedUser, JSON.stringify(userObj));
    element.innerHTML = `<span style="margin-right:10px;color:red;font-weight:500;font-size:20px">${course}<button class="btn btn-primary" style="margin-bottom:10px;" onclick="add(this.parentNode.parentNode)">ADD</button></span>`;
}






let getIndex;
function editRow(index) {
    document.getElementById("newCourse").value = courses[index];

    document.getElementById("addButton").style.display = "none";
    document.getElementById("updateButton").style.display = "inline-block";
    getIndex = index;
    let table = document.getElementById("table");
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[1].innerHTML = `<button style="background-color:#66ff66;color:white" disabled>Edit</button>`;
        table.rows[i].cells[2].innerHTML = `<button class='deleteButton' disabled=true style="background-color:#ff8080;color:white">Delete</button>`;
    }
    document.getElementById("cancelButton").style.display = "inline-block";
}
function update() {

    const course = document.getElementById("newCourse");

    if (course.value == "") {
        alert("Please enter course.");
    }
    else {

        let oldCourse = courses[getIndex];
        for (let key of Object.keys(localStorage)) {
            let obj = JSON.parse(localStorage.getItem(key));
            if (obj.userType == "student") {
                if (obj.courses[oldCourse] == 1) {
                    delete obj.courses[oldCourse];
                    obj.courses[course.value] = 1;
                    localStorage.setItem(key, JSON.stringify(obj));
                }
            }
        }
        courses[getIndex] = course.value;
        localStorage.setItem("courses", JSON.stringify(courses));
        let cells = document.getElementById("table").rows[getIndex].cells;
        cells[0].innerHTML = course.value;

        document.getElementById("addButton").style.display = "inline-block";
        document.getElementById("updateButton").style.display = "none";
        document.getElementById("cancelButton").style.display = "none";
        course.value = "";



        let table = document.getElementById("table");
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[1].innerHTML = `<button onclick="editRow(this.parentNode.parentNode.rowIndex)" style="background-color:green;color:white">Edit</button>`;
            table.rows[i].cells[2].innerHTML = `<button style="background-color:red;color:white" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
        }

    }
    let div = document.getElementById("showStudents");
    div.style.display="none";
    let print = document.getElementById("assignedCourses");
    print.style.display="none";
    showAllStudents();
}
function cancelUpdate() {
    document.getElementById("newCourse").value = "";
    document.getElementById("addButton").style.display = "inline-block";
    document.getElementById("updateButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";
    let table = document.getElementById("table");
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[1].innerHTML = `<button onclick="editRow(this.parentNode.parentNode.rowIndex)" style="background-color:green;color:white">Edit</button>`;
        table.rows[i].cells[2].innerHTML = `<button style="background-color:red;color:white" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
    }
    
}
function deleteRow(index) {
    console.log(index);
    document.getElementById("table").deleteRow(index);
    let course = courses[index];
    courses.splice(index, 1);
    console.log(course);
    localStorage.setItem("courses", JSON.stringify(courses));
    let keys = Object.keys(localStorage);
    for (let key of keys) {
        console.log(key);
        let obj = JSON.parse(localStorage.getItem(key));
        if (obj.userType == "student") {
            if (obj.courses == undefined) {
                continue;
            }
            if (obj.courses[course] == 1) {
                console.log(obj.courses[course]);
                delete obj.courses[course];

                localStorage.setItem(key, JSON.stringify(obj));

            }
        }
    }
    let div = document.getElementById("showStudents");
    div.style.display="none";
    let print = document.getElementById("assignedCourses");
    print.style.display="none";
    showAllStudents();
}
function addNew() {
    const table = document.getElementById("table");
    const course = document.getElementById("newCourse");
    if (course.value == "") {
        alert("Please enter course name")
    }
    else {
        courses.push(course.value);
        localStorage.setItem("courses", JSON.stringify(courses));

        let row = table.insertRow();
        let cell1 = row.insertCell();
        let text1 = document.createTextNode(course.value);


        cell1.appendChild(text1);

        cell1.style.backgroundColor = "silver";

        cell1.style.border = "1px solid black";





        let cell3 = row.insertCell();
        let edit = document.createElement("button");
        edit.innerHTML = "Edit";
        edit.className = "editButton";
        edit.onclick = () => { editRow(row.rowIndex) };
        edit.style.backgroundColor = "green";
        edit.style.color = "white";
        cell3.appendChild(edit);
        cell1.style.width = "40%";


        let cell4 = row.insertCell();
        let del = document.createElement("button");
        del.className = "deleteButton";
        del.innerHTML = "Delete";
        del.style.backgroundColor = "red";
        del.style.color = "white";

        del.onclick = () => { deleteRow(row.rowIndex) };
        cell4.appendChild(del);

        course.value = "";

    }
    let div = document.getElementById("showStudents");
    div.style.display="none";
    let print = document.getElementById("assignedCourses");
    print.style.display="none";
    showAllStudents();

}





