## 1、创建文件夹
## 2、npm包的初始化
```
npm init
```
## 3、npm包信息设置
```
{
  "name": "cbfs",
  "version": "0.1.0",
  "description": "将原生的fs模块进行promise封装,可以方便await开发",
  "main": "cbfs.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "fs",
    "promise封装"
  ],
  "author": "cb",
  "license": "ISC"
}

```
## 4、注册npm官网帐号
## 5、npm官网帐号要邮箱验证
## 6、本机登录npm
```
注意登录前需要先切换回npm源镜像
npm login
```
## 7、发布npm包
```
npm publish
```