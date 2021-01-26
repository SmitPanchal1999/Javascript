let names = [];
let getIndex;
function editRow(index) {
    document.getElementById("firstName").value = names[index].firstName;
    document.getElementById("lastName").value = names[index].lastName;
    document.getElementById("addButton").style.display = "none";
    document.getElementById("updateButton").style.display = "inline-block";
    getIndex = index;
    let table = document.getElementById("table");
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[2].innerHTML = `<button style="background-color:#66ff66;color:white" disabled>Edit</button>`;
        table.rows[i].cells[3].innerHTML = `<button class='deleteButton' disabled=true style="background-color:#ff8080;color:white">Delete</button>`;
    }
    document.getElementById("cancelButton").style.display = "inline-block";
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
        cells[0].innerHTML = fname.value;
        cells[1].innerHTML = lname.value;
        document.getElementById("addButton").style.display = "inline-block";
        document.getElementById("updateButton").style.display = "none";
        document.getElementById("cancelButton").style.display = "none";
        fname.value = "";
        lname.value = "";
        console.log(names);
        console.log(cells[3].innerHTML);
        let table = document.getElementById("table");
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[2].innerHTML = `<button onclick="editRow(this.parentNode.parentNode.rowIndex)" style="background-color:green;color:white">Edit</button>`;
            table.rows[i].cells[3].innerHTML = `<button style="background-color:red;color:white" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
        }
        console.log(cells[3].innerHTML);
    }
}
function cancelUpdate() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("addButton").style.display = "inline-block";
    document.getElementById("updateButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";
    let table = document.getElementById("table");
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[2].innerHTML = `<button onclick="editRow(this.parentNode.parentNode.rowIndex)" style="background-color:green;color:white">Edit</button>`;
        table.rows[i].cells[3].innerHTML = `<button style="background-color:red;color:white" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
    }
    console.log(cells[3].innerHTML);
}
function deleteRow(index) {
    console.log(index);
    document.getElementById("table").deleteRow(index);
    names.splice(index, 1);
    console.log(names);
}
function add() {
    const table = document.getElementById("table");
    const fname = document.getElementById("firstName");
    const lname = document.getElementById("lastName");
    fname.value=fname.value.replace(/\s+/g, ' ').trim();
    lname.value=lname.value.replace(/\s+/g, ' ').trim();
    if (fname.value == "" || lname.value == "") {
        alert("Please enter first name and last name")
    }
    else {
        names.push({ firstName: fname.value, lastName: lname.value });

        let row = table.insertRow();
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


}
