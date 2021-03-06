let names = [];
let getIndex;
let checked = {};
function editRow(index) {
    document.getElementById("firstName").value = names[index].firstName;
    document.getElementById("lastName").value = names[index].lastName;
    document.getElementById("addButton").style.display = "none";
    document.getElementById("updateButton").style.display = "inline-block";
    getIndex = index;

    document.getElementById("cancelButton").style.display = "inline-block";
    let table = document.getElementById("table");
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[3].innerHTML = `<button style="background-color:#66ff66;color:white" disabled>Edit</button>`;
        table.rows[i].cells[4].innerHTML = `<button class='deleteButton' disabled=true style="background-color:#ff8080;color:white">Delete</button>`;
    }
    
    document.getElementById("deleteSelected").disabled=true;
}
function update() {

    const fname = document.getElementById("firstName");
    const lname = document.getElementById("lastName");
    if (fname.value == "" || lname.value == "") {
        alert("Please enter firstname and lastname.");
    }
    else {
        names[getIndex].firstName = fname.value;
        names[getIndex].lastName = lname.value;
        let cells = document.getElementById("table").rows[getIndex].cells;
        cells[1].innerHTML = fname.value;
        cells[2].innerHTML = lname.value;
        document.getElementById("addButton").style.display = "inline-block";
        document.getElementById("updateButton").style.display = "none";
        document.getElementById("cancelButton").style.display = "none";
        fname.value = "";
        lname.value = "";
        console.log(names);
        console.log(cells[3].innerHTML);
        let table = document.getElementById("table");
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[3].innerHTML = `<button onclick="editRow(this.parentNode.parentNode.rowIndex)" style="background-color:green;color:white">Edit</button>`;
            table.rows[i].cells[4].innerHTML = `<button style="background-color:red;color:white" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
        }
        
    }
    document.getElementById("deleteSelected").disabled=false;
}
function cancelUpdate() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("addButton").style.display = "inline-block";
    document.getElementById("updateButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";
    let table = document.getElementById("table");
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[3].innerHTML = `<button style="background-color:green;color:white" onclick="editRow(this.parentNode.parentNode.rowIndex)" >Edit</button>`;
        table.rows[i].cells[4].innerHTML = `<button style="background-color:red;color:white" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
    }

    document.getElementById("deleteSelected").disabled=false;
}
function deleteRow(index) {
    let table = document.getElementById("table");

    
   
    document.getElementById("totalSelected").innerHTML = 0;
   
    console.log(index);
    table.deleteRow(index);
    table=document.getElementById("table");
    names.splice(index, 1);
    console.log(names);
    checked = {};
    console.log(table.rows.length)
    for (let i = 0; i < table.rows.length; i++) {
        console.log(i,table.rows[i].cells[0].children[0].checked)
        if (table.rows[i].cells[0].children[0].checked) {
            checked[i] = 1;
        }


    }
    console.log(checked);
    document.getElementById("totalSelected").innerHTML = Number(Object.keys(checked).length);
    if (document.getElementById("totalSelected").innerHTML >= 1) {
        console.log("true");
        document.getElementById("showSelected").style.display = "inline-block";
    }
    else {
        console.log("true");
        document.getElementById("showSelected").style.display = "none";

    }
    if (table.rows.length >= 1) {
        document.getElementById("selectAllSpan").style.display = "inline-block";
    }
    else {
        document.getElementById("selectAllSpan").style.display = "none";
    }
    if (document.getElementById("table").rows.length == Number(Object.keys(checked).length)) {
        document.getElementById("selectAll").checked = true;
    }
    else {
        document.getElementById("selectAll").checked = false;

    }
}
function add() {
    const table = document.getElementById("table");
    const fname = document.getElementById("firstName");
    const lname = document.getElementById("lastName");
    if (fname.value == "" || lname.value == "") {
        alert("Please enter first name and last name")
    }
    else {
        names.push({ firstName: fname.value, lastName: lname.value });

        let row = table.insertRow();
        let cell0 = row.insertCell();
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.onclick = () => { checkedItems(row.rowIndex) };

        cell0.appendChild(checkbox);

        let cell1 = row.insertCell();
        let text1 = document.createTextNode(fname.value);


        cell1.appendChild(text1);
        let cell2 = row.insertCell();
        let text2 = document.createTextNode(lname.value);

        cell1.style.backgroundColor = "silver";
        cell2.style.backgroundColor = "silver";
        cell1.style.border = "1px solid black";

        cell2.style.border = "1px solid black";

        cell2.appendChild(text2);

        let cell3 = row.insertCell();
        let edit = document.createElement("button");
        edit.innerHTML = "Edit";
        edit.className = "editButton";
        edit.onclick = () => { editRow(row.rowIndex) };
        edit.style.backgroundColor = "green";
        edit.style.color = "white";
        cell3.appendChild(edit);
        cell1.style.width = "40%";
        cell2.style.width = "40%";

        let cell4 = row.insertCell();
        let del = document.createElement("button");
        del.className = "deleteButton";
        del.innerHTML = "Delete";
        del.style.backgroundColor = "red";
        del.style.color = "white";

        del.onclick = () => { deleteRow(row.rowIndex) };
        cell4.appendChild(del);

        fname.value = "";
        lname.value = "";
    }
    if (table.rows.length >= 1) {
        document.getElementById("selectAllSpan").style.display = "inline-block";
    }
    if (document.getElementById("table").rows.length == Number(Object.keys(checked).length)) {
        document.getElementById("selectAll").checked = true;
    }
    else {
        document.getElementById("selectAll").checked = false;

    }


}

function selectAll() {
    let rows = document.getElementById("table").rows;
    if (document.getElementById("selectAll").checked == true) {


        for (let i = 0; i < rows.length; i++) {
            rows[i].cells[0].children[0].checked=true;
            checked[i] = 1
            


        }
        document.getElementById("totalSelected").innerHTML = rows.length;
    } else {
        for (let i = 0; i < rows.length; i++) {     
           rows[i].cells[0].children[0].checked=false;





        }
        checked = {};
        document.getElementById("totalSelected").innerHTML = 0;

    }
    console.log(checked);

    document.getElementById("totalSelected").innerHTML = Number(Object.keys(checked).length);
    if (document.getElementById("totalSelected").innerHTML >= 1) {
        console.log("true");
        document.getElementById("showSelected").style.display = "inline-block";
    }
    else {
        console.log("true");
        document.getElementById("showSelected").style.display = "none";

    }
    if (table.rows.length >= 1) {
        document.getElementById("selectAllSpan").style.display = "inline-block";
    }
    else {
        document.getElementById("selectAllSpan").style.display = "none";
    }
    if (document.getElementById("table").rows.length == Number(Object.keys(checked).length)) {
        document.getElementById("selectAll").checked = true;
    }
    else {
        document.getElementById("selectAll").checked = false;

    }
}

function checkedItems(index) {
    let rows=document.getElementById("table").rows;
    if (rows[index].cells[0].children[0].checked) {
        checked[index] = 1;
    }
    else{
        
        delete checked[index];

    }
    console.log(checked);
    document.getElementById("totalSelected").innerHTML = Number(Object.keys(checked).length);
    if (document.getElementById("totalSelected").innerHTML >= 1) {
        console.log("true");
        document.getElementById("showSelected").style.display = "inline-block";
      
    }
    else {
        console.log("true");
        document.getElementById("showSelected").style.display = "none";
       
    }
    if (table.rows.length >= 1) {
        document.getElementById("selectAllSpan").style.display = "inline-block";
    }
    else {
        document.getElementById("selectAllSpan").style.display = "none";
    }
    if (document.getElementById("table").rows.length == Number(Object.keys(checked).length)) {
        document.getElementById("selectAll").checked = true;
    }
    else {
        document.getElementById("selectAll").checked = false;

    }
}
function deleteSelected() {
    let storeChecked = []
    for (let key of Object.keys(checked)) {
        if (checked[key] == 1) {
            storeChecked.push(key);
            delete checked[key];
        }
    }

    if (storeChecked.length >= 1) {
        let table = document.getElementById("table");
        storeChecked.sort((a, b) => b - a);
        console.log(storeChecked);
        storeChecked.forEach((item) => {
            table.deleteRow(item);
            names.splice(item, 1);
        })
    }
    document.getElementById("selectAll").checked = false;

    document.getElementById("totalSelected").innerHTML = Number(Object.keys(checked).length);
    if (document.getElementById("totalSelected").innerHTML >= 1) {
        console.log("true");
        document.getElementById("showSelected").style.display = "inline-block";
    }
    else {
        console.log("true");
        document.getElementById("showSelected").style.display = "none";

    }
    if (table.rows.length >= 1) {
        document.getElementById("selectAllSpan").style.display = "inline-block";
    }
    else {
        document.getElementById("selectAllSpan").style.display = "none";
    }
    if (document.getElementById("table").rows.length == Number(Object.keys(checked).length)) {
        document.getElementById("selectAll").checked = true;
    }
    else {
        document.getElementById("selectAll").checked = false;

    }
}
