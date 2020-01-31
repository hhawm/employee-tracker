const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "dbpassword",
  database: "emp_trackerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer.prompt({
    message: "Welcome to employee tracker. What would you like to do?",
    name: "action",
    type: "list",
    choices: [
      "View All Employees",
      "View All Employees by Department",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Or Exit"
    ]
  }).then(function (answer) {
    switch (answer.action) {
      case "View All Employees":
        viewAllEmpl();
        break;
      case "View All Employees by Department":
        viewEmplByDept();
        break;
      case "Add Employee":
        addEmpl();
        break;
      // case "Remove Employee":
      //   removeEmpl();
      //   break;
      // case "Update Employee Role":
      //   updateEmplRole();
      //   break;
      // case "Update Employee Manager":
      //   updateEmplMan();
      //   break;
      case "Or Exit":
        connection.end();
        break;
    }
  });
}

// View All Employees
function viewAllEmpl() {
  var query = "SELECT first_name, last_name, title, dept_name, salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    runSearch();
  });
}

// View All Employees by Department
function viewEmplByDept() {
  inquirer.prompt({
    message: "View all employees by which department?",
    name: "action",
    type: "list",
    choices: [
      "Sales",
      "Information Technology",
      "Accounting",
      "Or Back to Main Menu"
    ]
  }).then(function (answer) {
    switch (answer.action) {
      case "Sales":
        viewSalesEmpl();
        break;
      case "Information Technology":
        viewITEmpl();
        break;
      case "Accounting":
        viewAcctEmpl();
        break;
      case "Or Back to Main Menu":
        runSearch();
        break;
    }
  })
}

// View All Employees in Sales
function viewSalesEmpl() {
  var query = 'SELECT first_name, last_name, title, dept_name, salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE departments.dept_name = "Sales";';
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    runSearch();
  });
}

// View All Employees in Information Technology
function viewITEmpl() {
  var query = 'SELECT first_name, last_name, title, dept_name, salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE departments.dept_name = "Information Technology";';
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    runSearch();
  });
}

// View All Employees in Accounting
function viewAcctEmpl() {
  var query = 'SELECT first_name, last_name, title, dept_name, salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE departments.dept_name = "Accounting";';
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    runSearch();
  });
}

function addEmpl() {
  inquirer.prompt([
    {
      message: "Enter first name of new employee: ",
      name: "first_name",
      type: "input"
    },
    {
      message: "Enter last name of new employee: ",
      name: "last_name",
      type: "input"
    },
    {
      message: "Enter role ID number of new employee: ",
      name: "role_id",
      type: "list",
      choices: [
        "Sales Associate",
        "Sales Asst Manager",
        "IT Help Desk",
        "IT Manager/Business Partner",
        "Accountant",
        "Accting Manager/Business Partner"
      ]
    }
  ]).then(function (res) {
    connection.query(`SELECT id FROM roles WHERE title = "${res.role_id}"`, function (err, res2) {
      connection.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES ("${res.first_name}", "${res.last_name}", ${res2[0].id})`, function (err, res) {
        if (err) throw err;
        console.log("");
        console.log("********************************");
        console.log("New Employee Successfully Saved!");
        console.log("********************************");
        console.log("");
        runSearch();
      });
    })
  })
}




// var query = "SELECT title, salary, name FROM roles LEFT JOIN departments ON roles.department_id = departments.id;";
//   connection.query(query, function (err, res) {
//     if (err) throw err;
//     console.log("");
//     console.table(res);
//     runSearch();
//   });
// }

// Update Role of an Employee
// function updateEmplRole() {
//   var query = "INSERT INTO roles SET ?";
//   inquirer
//     .prompt([
//       {
//         message: "Enter title of new role: ",
//         name: "title",
//         type: "input"
//       },
//       {
//         message: "Enter annual salary of this role: ",
//         name: "salary",
//         type: "input"

//       },
//       {
//         message: "Enter department ID number this role belongs in: ",
//         name: "department_id",
//         type: "input",
//       }
//     ]).then(function (res) {
//       connection.query(query, res, function (err, res) {
//         if (err) throw err;
//         console.log("");
//         console.log("****************************");
//         console.log("New Role Successfully Saved!");
//         console.log("****************************");
//         console.log("");
//         runSearch();
//       });
//     })
// }



// Add a New Role
// function addRole() {
//   

// Add a New Department
// function addDept() {
//   var query = "INSERT INTO departments (name) VALUES (?)";
//   inquirer
//     .prompt([
//       {
//         message: "Enter name of new department: ",
//         name: "name",
//         type: "input"
//       }
//     ]).then(function (res) {
//       connection.query(query, [res.name], function (err, res) {
//         if (err) throw err;
//         console.log("");
//         console.log("**********************************");
//         console.log("New Department Successfully Saved!");
//         console.log("**********************************");
//         console.log("");
//         runSearch();
//       });
//     })
// }

// View All Roles
// function viewRoles() {
//   var query = " SELECT title, salary, name FROM roles LEFT JOIN departments ON roles.department_id = departments.id;";
//   connection.query(query, function (err, res) {
//     if (err) throw err;
//     console.log("");
//     console.table(res);
//     runSearch();
//   });
// }