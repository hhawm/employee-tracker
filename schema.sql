DROP DATABASE IF EXISTS emp_trackerDB;
CREATE database emp_trackerDB;
USE emp_trackerDB;

CREATE TABLE departments
(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    dept_name VARCHAR(40) NOT NULL
);

CREATE TABLE roles
(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees
(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    manager_id INT UNSIGNED NULL,
    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(manager_id) REFERENCES roles(id)
);
