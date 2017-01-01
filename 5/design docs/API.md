## 前后端交互设计

### 概述

前后端API是在`RESTful`风格的,发送和返回内容均为`json`数据。
若请求的操作成功：

- `GET` 直接返回获取的内容
- `POST`和`PUT` 返回修改或创建的条目的ID，以及成功消息
- `DELETE` 返回成功消息

```
正常返回数据：
{
    code : 0,		        // 0 代表成功
    /* 按实际要求封装的data */
}
```

```
异常返回：
{
	code :	-1
  	msg	 :  String		   // 具体的错误信息
}
```

### 接口设计

#### 用户相关

```
1001 登录
PUT	/user
Params {
	userName :	String,
	userPass :	String	// Hash过的密码
}
Response {
	code  		: 	0
	_id			:	ObjectId
	token 		: 	String
	userMoney	:	Number
	isManager	:	Boolean
}
```

```
1002 注册
POST /user
Params {
	userName :	String,
	userPass :	String	// Hash过的密码
}
Response {
	code	 :	0
}
```

#### 产品相关

```
2001 获取产品列表
GET /product
Params {
}
Response {
	code	 :	0
	products :	[Product]
}
```

```
2002 更新某产品信息
PUT /product
Params {
  token 	:	String
  product	:	Product
}
Response {
	code	 :	0
}
```

```
2003 删除某产品
DELETE /product
Params {
  token 	:	String
  productId	:	ObjectId
}
Response {
	code	 :	0
}
```

```
2004 增加某产品
POST /product
Params {
  token 	:	String
  product	:	Product
}
Response {
	code	 	:	0
	productId	:	ObjectId
}
```

#### 订单相关

```
3001 下订单
POST /order
Params {
  token 		:	String
  orderCreator	:	ObjectId
  orderDetails	: 	[{
    product     :   ObjectId,
    number      :   Number
  }]
  orderPrice	:	Number
}
Response {
	code	 	:	0
	orderId		:	ObjectId
	orderTime	:	Date
}
```

```
3002 查看某人所有历史订单
GET /order
Params {
  token 		:	String
  orderCreater	:	ObjectId
}
Response {
	code	 	:	0
	orders		:	[Order]
}
```

