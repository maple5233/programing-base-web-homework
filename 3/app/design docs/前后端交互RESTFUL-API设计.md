>## 概述

<strong>后端API是在RESTful风格的,发送和返回内容均为`json`数据。<strong>

>## API
>### 留言相关

```

001 获取所有留言
GET /comment
Params
{
    null
}
Response
{
    code : '0',
    msgs : [{
        _id:            String, (mongodb默认自动生成的主键)
        userId:         String, (用户ID)
        comment:        String, (用户留言)
        headImgSrc:     String, (用户头像)
        date:           String, (留言创建时间)
        updateDate:     String, (留言更新时间)
        __v:            Number  (mongodb默认自动生成的版本锁标志，前端用不到)
    }]
}


Response Excetion ： { code : '', msg : ''}
code    msg
-1     未知错误

```

```

002 上传留言
POST /comment
Params
{
    commentNew: 
    {
        userId:     String, (用户ID)
        comment:    String  (用户留言)
    }
}
Response
{
    code : '0'
}


Response Excetion ： { code : '', msg : ''}
code    msg
-1     未知错误

```
```

003 更新留言
PUT /comment
Params
{
    commentNew: 
    {
        _id:        String, (从后端收到的留言ID)
        comment:    String  (新的用户留言)
    }
}
Response
{
    code : '0',
    updateDate :    String  (更新时间) 
}


Response Excetion ： { code : '', msg : ''}
code    msg
-1     未知错误

```
