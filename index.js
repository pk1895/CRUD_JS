const arrOfObject = [];
let selectedRow;

const readData = () => {
    const formElement = document.getElementById("crudForm").elements;
    const formobject = {
        name: formElement[0].value,
        email: formElement[1].value,
        age: formElement[2].value,
        gender: formElement[3].value
    };

    return (formobject);
};

const createTableRow = (name, email, age, gender) => {

    const table = document.getElementById("crudTable");
    const tr = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("button");
    let td6 = document.createElement("button");

    let text1 = document.createTextNode(name);
    let text2 = document.createTextNode(email);
    let text3 = document.createTextNode(age);
    let text4 = document.createTextNode(gender);
    let editBtn = document.createTextNode("Edit");
    let deleteBtn = document.createTextNode("Delete");

    td5.onclick = (event) => {
        onEditElement(event);
    }
    td6.onclick = (event) => {
        onDeleteElement(event);
    }

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    td4.appendChild(text4);
    td5.appendChild(editBtn);
    td6.appendChild(deleteBtn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    table.appendChild(tr);
};

const onSubmitForm = () => {
    const formObject = readData();
    const { name, email, age, gender } = formObject; //destructuring

    // All validations for form
    if (!name || !email || !age || !gender) {
        alert("Fill all the form");
        return;
    }

    arrOfObject.push(formObject);
    createTableRow(name, email, age, gender);

};

const onEditElement = (event) => {
    selectedRow = event.target.parentNode.rowIndex - 1;
    document.getElementById('crudTable').rows;
    const [{ name, email, age, gender }] = arrOfObject.filter((item, index) => {
        return index === selectedRow;
    });

    const elements = document.getElementById("popupForm").elements;
    elements[0].value = name;
    elements[1].value = email;
    elements[2].value = age;
    elements[3].value = gender;

    onOpenForm(selectedRow);
}

const onSubmitPopupForm = (event) => {
    event.preventDefault();
    const elements = document.getElementById("popupForm").elements;
    const row = document.getElementById("crudTable").rows[selectedRow+1].cells;
    row[0].innerText = elements[0].value;
    row[1].innerText = elements[1].value;
    row[2].innerText = elements[2].value;
    row[3].innerText = elements[3].value;

    onCloseForm()
}

const onDeleteElement = (event) => {
    selectedRow = event.target.parentNode.rowIndex;
    document.getElementById('crudTable').deleteRow(selectedRow);
    arrOfObject = arrOfObject.filter((item, index) => {
        return index !== selectedRow;
    });
}

const onOpenForm = () => {
    document.getElementById("myForm").style.display = "block";
};

const onCloseForm = () => {
    document.getElementById("myForm").style.display = "none";
}