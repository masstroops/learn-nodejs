-- 查询所有学生的语文成绩，连3张表查询
SELECT score.id,student.studentname,score.score,project.project FROM score 
INNER JOIN student on student.id = score.stuid 
INNER JOIN project on project.id = score.projectid 
WHERE project.project = '语文';

-- 自关联查询
-- 省市县，树形
-- id, area, parentAreaId
-- 1, 广东省, null
-- 2, 广州市, 1
-- 3, 梅州市, 1
-- 4, 白云区, 2
-- 5, 天河区, 2
-- 广东省，广州市，天河区

-- 找出广东省里的所有市
SELECT * FROM area where name = '广东省';

-- 1、将两张表关联（同一张表）,将同一张表可以重命名成不同的名称然后进行连接
SELECT a1.id as pid,a1.name as pname,a2.id,a2.name 
FROM area as a1 INNER JOIN area as a2 
on a1.id = a2.pid 
WHERE a1.name = '广东省';

-- 注意：上下级关系包含，公司的层级关系，游戏帮派层级关系，省市县层级关系...




-- 找出年龄小于20岁的学生成绩
SELECT studentname FROM student WHERE studentage < 20;

-- 子查询，查询里面又有查询，()内写子查询
SELECT * FROM score 
INNER JOIN student 
on score.stuid = student.id 
WHERE student.studentname in (SELECT studentname FROM student WHERE studentage < 20);



-- 条件查询
-- 存在某个条件下，才做某个查询
-- 如果有学生大于50岁才将老师查找出来
-- EXISTS 条件查找，存在exists后面的查询内容，才执行前面的查找
SELECT * FROM teacher WHERE EXISTS (SELECT studentname FROM student WHERE studentage > 50);
