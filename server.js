const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// const out = require("./out");
// const helper = require("./helper");
// const query = require("./query");

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
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcome to employee tracker. What would you like to do?",
      choices: [
        "View All Departments",
        "Add Department",
        "View All Roles",
        "Add Role",
        "View All Employees by Department",
        "Add an Employee",
        // "View Department Budgets",
        "Or Exit"
      ]
    }).then(function (answer) {
      switch (answer.action) {
        case "View All Departments":
          viewDepts();
          break;

        case "Add Department":
          addDept();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Employees by Department":
          viewEmplByDept();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        // case "View Department Budgets":
        //   viewDeptBudget();
        //   break;

        case "Or Exit":
          connection.end();
          break;
      }
    });
}

// View All Departments
function viewDepts() {
  var query = "SELECT * FROM departments;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].name);
    // }
    runSearch();
  });
}

// Add Department
function addDept() {
  var query = "INSERT INTO departments (name) VALUES (?)";
  inquirer
    .prompt([
      {
        message: "Enter name of new department: ",
        name: "name",
        type: "input"
      }
    ]).then(function (res) {
      connection.query(query, [res.name], function (err, res) {
        if (err) throw err;
        console.log("New Department Successfully Saved!");
        runSearch();
      });
    })
}

// View All Roles
function viewRoles() {
  var query = " SELECT title, salary, name FROM roles LEFT JOIN departments ON roles.department_id = departments.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function addRole() {
  var query = "INSERT INTO roles (title, salary, ) VALUES (?)";
  inquirer
    .prompt([
      {
        message: "Enter title of new role: ",
        name: "title",
        type: "input"
      },
      {
        message: "Enter annual salary of this role: ",
        name: "salary",
        type: "input"

      },
      {
        message: "Enter department ID this role belongs in: ",
        name: "department_id",
        type: "input",
      }
    ]).then(function (res) {
      connection.query(query, [res.title, res.salary, res.department_id], function (err, res) {
        if (err) throw err;
        console.log("New Role Successfully Saved!");
        runSearch();
      });
    })
}
