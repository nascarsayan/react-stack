-- SELECT DISTINCT dept_name from instructor

-- SELECT dept_name, name, salary from instructor WHERE salary > 70000

-- Find the names of all instructors whose salary is greater than at least one instructor in the Biology department.

-- select distinct T.name
-- from instructor as T, instructor as S where T.salary > S.salary and S.dept_name = 'Biology'

-- select dept_name
-- from department
-- where building like '%Watson%'

-- SELECT * FROM (select course_id
-- from section as T1
-- where semester = 'Fall' and year= 2017)
-- UNION
-- SELECT * FROM (select course_id
-- from section as T2
-- where semester = 'Spring' and year= 2018)

-- kusto Query Language

-- instructor
-- | where salary > 70000
-- | project dept_name, name, salary

-- Find the average salary in each department. Filter out departments whose average salary is less than $42,000.

-- SELECT dept_name, avg(salary) as avg_salary
-- FROM instructor
-- GROUP BY dept_name
-- having avg (salary) > 42000

-- Find all the courses taught in the both the Fall 2017 and Spring 2018 semesters

-- select distinct course_id
-- from section
-- where semester = 'Fall' and year= 2017 and
-- course_id in (select course_id from section
-- where semester = 'Spring' and year= 2018)

-- Tomorrow

-- ACID Props
-- Transactions
-- Normalization

-- DB <-> Prisma <-> Backend <-> Frontend

-- 2 pages : 1. High scores 2. Your scores
-- - fn (time, total number of cells) : Score

