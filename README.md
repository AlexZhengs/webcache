# webcache
支持IE7以下的localstorage，sessionstorage，cookie。

示例：_webcache.sessionData.set("testsession1","testsession1")

使用说明：用于前端 写入cookie及session storage的方法

 expires: 设置cookie的时效，默认为1天存储
 
 * ------------------------------------------------------------------------------------------- *
 
 sessionData：用户整个页面的本地存储，默认30天
 
 localData：用户当前页面的会话存储
 
 @param：必须
 
 **.set: 用于设置添加单个 param key:键名 value：键值
 
 **.get: 用于获取单个 param key:键名
 
 **.remove: 用于删除单个 param key:键名
 
 **.removeAll: 用于删除所有
 
 * ------------------------------------------------------------------------------------------- *
 
 cookie：用户整个页面的定期存储，默认为1天存储
 
 @param：
 
 **.set: 用于设置添加单个 param  必须：name, value  可选：expires, path, domain
 
 ----- example --  _webcache.cookie.set("name","value",_webcache.expires(1,"Y"),"","") -----
 
 **.get: 用于获取单个 param 必须：name
 
 **.remove: 用于删除单个 param 必须：name  可选：path, domain
 
 **.removeAll: 用于删除所有 param 可选：path, domain
