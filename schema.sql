DROP DATABASE IF EXISTS emp_trackerDB;
CREATE database emp_trackerDB;
USE emp_trackerDB;

CREATE TABLE department
(
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role
(
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee
(
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL
);



-- SELECT * FROM top5000 where artist = "Mariah Carey";
-- SELECT * FROM top5000 where artist LIKE "%Mariah Carey%";

-- SELECT artist, COUNT(*) as times FROM top5000 GROUP BY artist HAVING times > 1 ORDER BY times DESC;
-- SELECT artist, COUNT(*) as times FROM top5000 GROUP BY artist HAVING COUNT(artist) > 1 ORDER BY COUNT(artist) DESC;

-- SELECT * FROM top5000 WHERE year BETWEEN 1980 AND 1989;
-- SELECT * FROM top5000 WHERE song = "paradise";

-- SELECT * FROM top5000;