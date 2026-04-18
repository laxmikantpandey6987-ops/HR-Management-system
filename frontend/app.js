console.log("HR System Loaded");

// LOGIN
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "admin") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Invalid login";
    }
}

// CHECK LOGIN
function checkLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// DATA
let employees = JSON.parse(localStorage.getItem("employees") || "[]");

// ADD EMPLOYEE
function addEmployee() {
    const name = document.getElementById("empName").value;
    const role = document.getElementById("empRole").value;
    const dept = document.getElementById("empDept").value;

    if (!name || !role || !dept) {
        alert("Fill all fields");
        return;
    }

    employees.push({ name, role, dept });

    localStorage.setItem("employees", JSON.stringify(employees));

    renderTable();

    document.getElementById("empName").value = "";
    document.getElementById("empRole").value = "";
    document.getElementById("empDept").value = "";
}

// RENDER TABLE
function renderTable() {
    const table = document.getElementById("empTable");
    table.innerHTML = "";

    employees.forEach((e, i) => {
        table.innerHTML += `
            <tr>
                <td>${e.name}</td>
                <td>${e.role}</td>
                <td>${e.dept}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editEmp(${i})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmp(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// DELETE
function deleteEmp(i) {
    employees.splice(i, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    renderTable();
}

// EDIT
function editEmp(i) {
    const e = employees[i];

    const name = prompt("Edit Name", e.name);
    const role = prompt("Edit Role", e.role);
    const dept = prompt("Edit Dept", e.dept);

    if (name && role && dept) {
        employees[i] = { name, role, dept };
        localStorage.setItem("employees", JSON.stringify(employees));
        renderTable();
    }
}

// SEARCH
function searchEmployee() {
    const value = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#empTable tr");

    rows.forEach(row => {
        const name = row.children[0].innerText.toLowerCase();
        row.style.display = name.includes(value) ? "" : "none";
    });
}