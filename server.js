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
          addRoles();
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
  var query = "SELECT * FROM department";
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
  var query = "INSERT INTO department (name) VALUES (?)";
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
function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
            res[i].position +
            " || Song: " +
            res[i].song +
            " || Artist: " +
            res[i].artist +
            " || Year: " +
            res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function (answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function (err, res) {
        if (err) throw err;
        console.log(
          "Position: " +
          res[0].position +
          " || Song: " +
          res[0].song +
          " || Artist: " +
          res[0].artist +
          " || Year: " +
          res[0].year
        );
        runSearch();
      });
    });
}
