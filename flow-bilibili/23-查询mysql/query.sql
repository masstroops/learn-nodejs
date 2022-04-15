-- 查询 3000 - 20000 的阅读量
SELECT * FROM book WHERE viewcount > 3000 and viewcount < 20000;
-- 查询 300 - 3000 的阅读量
SELECT * FROM book WHERE viewcount BETWEEN 300 AND 3000;

-- 查询分类为经济管理的
SELECT * FROM book WHERE category = '经济管理';
-- 查询评分不为空字符串的
SELECT * FROM book WHERE score != '';

-- 查询罗斯柴尔德1和罗斯柴尔德2的
SELECT * FROM book WHERE author = '艾玛・罗斯柴尔德1' OR author = '艾玛・罗斯柴尔德2';
SELECT * FROM book WHERE author in ('艾玛・罗斯柴尔德1','艾玛・罗斯柴尔德2');

-- 查询书名跟经济相关的，%经济% 表示前后任意字符只要匹配的内容里有经济
SELECT * FROM book WHERE bookname like '%经济%';

-- 查询书名是经济开头的后面已3个字结束，_ 表示一个任意字符，% 表示任意多个字符
SELECT * FROM book WHERE bookname like '经济___';

-- 查询评分为空的
SELECT * FROM book WHERE score is NULL;
-- 查询评分非空的
SELECT * FROM book WHERE score is not null;

-- count(*)表示计算总行数，括号中写星与列名，结果是相同的
SELECT count(*) FROM book;

-- max(列)表示求此列的最大值
SELECT max(id) from book;

-- sum(列)表示求此列的和
SELECT sum(id) from book;

-- 统计书籍分类，按照字段分组，表示此字段相同的数据会被放到一个组中
SELECT tag as 分类, count(*) from book GROUP BY tag;

-- 统计书籍分类和名称，按照字段分组，表示此字段相同的数据会被放到一个组中
SELECT tag,bookname, count(*) from book GROUP BY tag,bookname;

-- 分组后的数据筛选，having是对group by的结果进行筛选
SELECT tag, COUNT(*) from book GROUP BY tag HAVING tag = '政治';

-- 分页，select * from 表名 limit start,count
SELECT * FROM book limit 1,3;