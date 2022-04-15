-- 事务：是连续执行一连串的sql语句，如果其中某条语句出现错误，则这连串的语句将不生效，会回滚到执行之前
-- 场景：插入一本书的完整信息，必须完整的将4个表的数据插入

-- BEGIN; 事务开始，如果最后不commit结束则sql语句不会操作数据库
-- COMMIT; 事务结束，begin开始commit结束，如果中间的sql语句不报错，则sql语句生效
-- ROLLBACK; 事务回滚，如果begin开始的sql语句，可以rollback回退结束


BEGIN;
INSERT INTO authorbook (bookname,authorid) VALUES ("鬼吹灯",4);

INSERT INTO author (id,author,age,sex) VALUES (4,"天下霸唱",23,"男");
-- ROLLBACK;
COMMIT;