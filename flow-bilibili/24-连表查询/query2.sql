-- 连表查询，INNER JOIN全连接，表之间有相同的值才会将相同的两条数据组合成一条
SELECT * FROM author INNER JOIN authorbook on author.id = authorbook.authorid WHERE author.author = '郭敬明';

-- 连表查询，LEFT JOIN左连接，左边的表数据全部显示跟右边的表出现相同数据会组合成一条
SELECT * FROM author LEFT JOIN authorbook on author.id = authorbook.authorid;

-- 连表查询，RIGHT JOIN右连接，右边的表数据全部显示跟左边的表出现相同数据会组合成一条
SELECT * FROM author RIGHT JOIN authorbook on author.id = authorbook.authorid;