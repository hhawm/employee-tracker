DROP DATABASE IF EXISTS emp_trackerDB;
CREATE database emp_trackerDB;
USE emp_trackerDB;

CREATE TABLE departments
(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles
(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX departments_index (department_id),
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees
(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    manager_id INT UNSIGNED NULL 
);
