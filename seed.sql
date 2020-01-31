USE emp_trackerDB;

-- Departments Table
INSERT INTO departments
    (dept_name)
VALUES
    ("Sales"),
    ("Information Technology"),
    ("Accounting");

-- Roles Table
INSERT INTO roles
    (title, salary, department_id)
VALUES
    ("Sales Associate", 45000, 1),
    ("Sales Asst Manager", 70000, 1),
    ("IT Help Desk", 50000, 2),
    ("IT Manager/Business Partner", 80000, 2),
    ("Accountant", 55000, 3),
    ("Accting Manager/Business Partner", 90000, 3);

-- Employees Table
INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Rosamond", "Leanna", 1, 2),
    ("Merry", "Serenity", 1, 2),
    ("Malinda", "Renee", 1, 2),
    ("Jaci", "Wilbur", 1, 2),
    ("Terrence", "Fleur", 1, 2),
    ("Hannah", "Chalice", 1, 2),
    ("Talbot", "Benjy", 2, 4),

    ("Jameson", "Trudie", 3, 4),
    ("Letha", "Alma", 3, 4),
    ("Rolph", "Erin", 4, null),

    ("Ashleigh", "Roy", 5, 6),
    ("Colin", "Clancy", 5, 6),
    ("Kyrie", "Nicholas", 6, null);

SELECT first_name, last_name, title, dept_name, salary, manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id AND employees.manager_id = roles.id INNER JOIN departments ON roles.department_id = departments.id;

SELECT * FROM employees;