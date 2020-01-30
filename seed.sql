USE emp_trackerDB;

-- Departments Table
INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("Information Technology"),
    ("Accounting");

-- Roles Table
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Associate", 45000, 1),
    ("Sales Asst Manager", 70000, 1),
    ("IT Help Desk", 50000, 2),
    ("IT Manager", 80000, 2),
    ("Accountant", 55000, 3),
    ("Accounting Manager", 90000, 3);

-- Employees Table
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Rosamond", "Leanna", 1, 7),
    ("Merry", "Serenity", 1, 7),
    ("Malinda", "Renee", 1, 7),
    ("Jaci", "Wilbur", 1, 7),
    ("Terrence", "Fleur", 1, 7),
    ("Hannah", "Chalice", 1, 7),
    ("Talbot", "Benjy", 2, 10),

    ("Jameson", "Trudie", 3, 10),
    ("Letha", "Alma", 3, 10),
    ("Rolph", "Erin", 4, null),

    ("Ashleigh", "Roy", 5, 13),
    ("Colin", "Clancy", 5, 13),
    ("Kyrie", "Nicholas", 6, null);

-- SELECT * FROM department;

-- SELECT * FROM role;

-- SELECT * FROM employee;
