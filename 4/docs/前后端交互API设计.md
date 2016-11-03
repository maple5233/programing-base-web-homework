[TOC]

## 前后端交互设计

### 概述

后端API是在`RESTful`风格的,发送和返回内容均为`json`数据。

若操作成功：

- `GET` 直接返回获取的内容
- `POST`和`PUT` 返回修改或创建的条目的ID，以及成功消息
- `DELETE` 返回成功消息

```json
正常返回数据：
{
    code : '0',		        // '0' 代表成功
    data : {data}		    // 按实际要求封装
}
```

```json
无返回数据：
{
    code : '0',		        // '0' 代表成功
    data : null
}
```

```json
异常返回：
{
    code :  String         // 非 '0' 时表示异常代码
  	msg	 :  String		   // 具体的错误信息
}
```

### 数据

#### 学生用户登录注册相关

```json
1001 注册
POST /regist
Params {
  	registName	  :  String （用户名）
  	registPass    :  String  (加密后的密码)
}
Response {
	code : '0'
}

Response Excetion ： { code : '', msg : ''}
code 	msg
1001A	登录名已存在
```

```json
1002 登录并获取统计数据
POST /login
Params {
  	loginName	: String （用户名）
  	loginPass	: String （加密后的密码）
}
Response {
  	code : '0',
  	data : {
      statistics : { 				// 统计数据
        howMuch			: Number,	// 已经交了多少班费
        howMuchRemain	: Number, 	// 还差多少要交
        numOfDayNotSign	: Number, 	// 旷课总数
        dayNotSign		: [Date] 	// 旷课情况
      }
  	}
}

Response Excetion ： {code : '', msg : ''}
code 	msg
1002A	用户不存在
1002B   密码不正确
```

```json
1003 登出
GET /logout
Params
	null
Response {
	code : '0'
}

Response Excetion ： {code : '', msg : ''}
code	 msg
1003A	未知错误
```



#### 管理员相关

```json
2001 获取所有学生
GET /manager/students
Params
	null
Response {
	code : '0',
	data : {
      students : [{
        authorId : ObjectId, // 学生的流水号，也是学号Id
        roleId   : Number	 // 学生的roleId
      }]
	}
}

Response Excetion ： {code : '', msg : ''}
code	 msg
2001A	数据库查询错误
```

```json
2002 更新某个学生的权限
PUT /manager/update
Params {
  student : {
    authorId : ObjectId, // 学生的流水号，也是学号Id
    roleId   : Number	 // 学生的新roleId
  }
}
Response
{
	code : '0'
}

Response Excetion ： {code : '', msg : ''}
code	 msg
2002A	找不到这个学生
2002B   没有这种权限等级
```



#### 帖子相关

```json
3001 获取某个班级全部开班会帖
GET /meeting
Params {
  classId : String // 哪个班
}
Response {
  	code : '0',
  	data : {
      meetings : [{
        classId		: String,	// 班级ID
    	date		: Date, 	// 开会时间
        place		: String, 	// 开会地点
        title		: String, 	// 主题
        num			: Number, 	// 应到人数
        gotten		: Number, 	// 实到人数
        pAgree		: [Number], // 同意的人的ID
        pDisagree	: [Number], // 不同意的人的ID
        authorId	: Number 	// 发帖人ID
      }]
    }
}

Response Excetion ： {code : '', msg : ''}
code	 msg
3001A	数据库查询错误
```

```json
3002 发表开班会帖
POST /meeting
Params {
  meeting : {
    classId		: String,	// 班级ID
    date		: Date, 	// 开会时间
    place		: String, 	// 开会地点
    title		: String, 	// 主题
    num			: Number, 	// 应到人数
    gotten		: Number, 	// 实到人数
    pAgree		: [Number], // 同意的人的ID
    pDisagree	: [Number], // 不同意的人的ID
    authorId	: Number 	// 发帖人ID
  }
}
Response {
  code : '0'
}

Response Excetion ： {code : '', msg : ''}
code	 msg
3002A   数据库查询错误
```

```json
3003 获取全部收班费帖
GET /classMoney
Params {
  classId : String // 哪个班
}
Response
{
  	code : '0',
  	data : {
      classMoneys : [{
        classId			: String,	// 班级ID
    	date			: Date, 	// 截止时间
        payedMembers	: [Number], // 已经缴费的人的ID
        unpayedMembers	: [Number], // 尚未缴费的人的ID
        authorId		: Number 	// 发帖人ID
      }]
    }
}

Response Excetion ： {code : '', msg : ''}
code	 msg
3003A	数据库查询错误
```

```JSON
3004 发表收班费帖
POST /classMoney
Params {
  classMoneys : {
    classId			: String,	// 班级ID
    date			: Date, 	// 截止时间
    payedMembers	: [Number], // 已经缴费的人的ID
    unpayedMembers	: [Number], // 尚未缴费的人的ID
    authorId		: Number 	// 发帖人ID
  }
}
Response {
  code : '0'
}

Response Excetion ： {code : '', msg : ''}
code	 msg
3004A	数据库查询错误
```

```json
3005 获取评优等生帖
GET /goodStudent
Params {
  classId : String // 哪个班
}
Response
{
  	code : '0',
  	data : {
      goodStudents : [{
        classId 	: String,	// 班级ID
        title 		: String, 	// 奖项名称
        stuId 		: Number,	// 获奖人ID
        bond 		: Number, 	// 奖金
        authorId	: Number 	// 发帖人ID
      }]
    }
}

Response Excetion ： {code : '', msg : ''}
code	 msg
3005A	数据库查询错误
```
```json
3006 发表评优等生帖
POST /goodStudent
Params {
  goodStudents  : [{
    classId 	: String,	// 班级ID
    title 		: String, 	// 奖项名称
    stuId 		: Number,	// 获奖人ID
    bond 		: Number, 	// 奖金
    authorId	: Number 	// 发帖人ID
  }]
}
Response {
  code : '0'
}

Response Excetion ： {code : '', msg : ''}
code	 msg
3004A	数据库查询错误
```

#### 关于其他发布/获取全部帖子接口

发布考勤结果帖接口结构与其他帖子的类似，不再赘述