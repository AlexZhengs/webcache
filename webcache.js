/*
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
 * ----- example --  _webcache.cookie.set("name","value",_webcache.expires(1,"Y"),"","") ----- *
 **.get: 用于获取单个 param 必须：name
 **.remove: 用于删除单个 param 必须：name  可选：path, domain
 **.removeAll: 用于删除所有 param 可选：path, domain
 */
;(function(window){
	var _webcache,          // 全局对象 -- 缓存对象
		_localDataDay = 30, // 默认本地存储时效
		_cookieDay = 1;		// 默认cookie时效

	_webcache = {
		expires: function(num,type){
			// 类型  type:  Y:年 M:月 D:日 h:小时 m:分钟
			// 时间  num: 3 || "3" (example)
			var num = (typeof num === "number")?num:parseInt(num),
				expires;  // cookie时效
			switch(type){
				case "Y":
					expires=new Date(new Date().getTime()+(num?num:1)*365*30*24*3600*1000);
					break;
				case "M":
					expires=new Date(new Date().getTime()+(num?num:1)*30*24*3600*1000);
					break;
				case "D":
					expires=new Date(new Date().getTime()+(num?num:1)*24*3600*1000);
					break;
				case "h":
					expires=new Date(new Date().getTime()+(num?num:1)*3600*1000);
					break;
				case "m":
					expires=new Date(new Date().getTime()+(num?num:1)*60*1000);
					break;
				default:;
					new Date(new Date().getTime() + _cookieDay*24 * 3600 * 1000);
					break;
			}
			return expires;
		},
		sessionData: {
			hname: location.hostname ? location.hostname : 'sessionStatus',
			isSessionStorage: window.sessionStorage ? true : false,
			dataDom: null,
			sessionObj: {},
			initDom: function () { //初始化userData IE7以下 only
				if (!this.dataDom) {
					try {
						this.dataDom = document.createElement('input');//这里使用hidden的input元素
						this.dataDom.type = 'hidden';
						this.dataDom.style.display = "none";
						this.dataDom.addBehavior('#default#userData');//这是userData的语法
						document.body.appendChild(this.dataDom);
						//this.userData.expires = current.toUTCString();//设定过期时间
					} catch (ex) {
						return false;
					}
				}
				return true;
			},
			set: function (key, value) {
				if (this.isSessionStorage) {
					window.sessionStorage.setItem(key, value);
				} else {
					if (this.initDom()) {
						this.dataDom.load(this.hname);
						this.dataDom.setAttribute(key, value);
						this.dataDom.save(this.hname);
						this.sessionObj[key] = value;
					}
				}
			},
			get: function (key) {
				if (this.isSessionStorage) {
					return window.sessionStorage.getItem(key);
				} else {
					if (this.initDom()) {
						this.dataDom.load(this.hname);
						return this.dataDom.getAttribute(key);
					}
				}
			},
			remove: function (key) {
				if (this.isSessionStorage) {
					window.sessionStorage.removeItem(key);
				} else {
					if (this.initDom()) {
						this.dataDom.load(this.hname);
						this.dataDom.removeAttribute(key);
						this.dataDom.save(this.hname);
						delete this.sessionObj[key];
					}
				}
			},
			removeAll: function () {//删除所有session
				if (this.isSessionStorage) {
					window.sessionStorage.clear();
				} else {
					if (this.initDom()) {
						this.dataDom.load(this.hname);
						for (var key in this.sessionObj) {
							this.dataDom.removeAttribute(key);
						}
						this.dataDom.save(this.hname)
					}
				}
			}
		},
		localData: {
			hname: location.hostname ? location.hostname : 'localStatus',
			isLocalStorage: window.localStorage ? true : false,
			dataDom: null,
			localObj: {},
			initDom: function () { //初始化userData
				if (!this.dataDom) {
					try {
						this.dataDom = document.createElement('input');//这里使用hidden的input元素
						this.dataDom.type = 'hidden';
						this.dataDom.style.display = "none";
						this.dataDom.addBehavior('#default#userData');//这是userData的语法
						document.body.appendChild(this.dataDom);
						var expires = new Date();
						expires.setDate(expires.getDate() + _localDataDay);
						this.userData.expires = expires.toUTCString();//设定过期时间
					} catch (ex) {
						return false;
					}
				}
				return true;
			},
			set: function (key, value) {
				if (this.isLocalStorage) {
					window.localStorage.setItem(key, value);
				} else {
					if (this.initDom()) {
						this.dataDom.load(this.hname);
						this.dataDom.setAttribute(key, value);
						this.dataDom.save(this.hname);
						this.localObj[key] = value;
					}
				}
			},
			get: function (key) {
				if (this.isLocalStorage) {
					return window.localStorage.getItem(key);
				} else {
					if (this.initDom()) {
						this.dataDom.load(this.hname);
						return this.dataDom.getAttribute(key);
					}
				}
			},
			remove: function (key) {
				if (this.isLocalStorage) {
					window.localStorage.removeItem(key);
				} else {
					if (this.initDom()) {
						this.dataDom.load(this.hname);
						this.dataDom.removeAttribute(key);
						this.dataDom.save(this.hname);
						delete this.localObj[key];
					}
				}
			},
			removeAll: function () {
				if (this.isLocalStorage) {
					window.localStorage.clear();
				} else {
					if (this.initDom()) {
						this.dataDom.load(this.hname);
						for (var key in this.localObj) {
							this.dataDom.removeAttribute(key);
						}
						this.dataDom.save(this.hname)
					}
				} //删除所有
			}
		},
		cookie: {
			set: function (name, value, expires, path, domain) {// 设置cookie
				if (typeof expires == "undefined") {
					expires = new Date(new Date().getTime() + _cookieDay*24 * 3600 * 1000);
				}
				document.cookie = name + "=" + encodeURIComponent(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? ";domain=" + domain : "");
			},
			get: function (name) {// 获取cookie
				var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
				if (arr != null) {
					return decodeURIComponent(arr[2]);
				}
				return null;
			},
			remove: function (name, path, domain) {// 删除某个cookie
				if (this.get(name)) {
					document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
				}
			},
			removeAll: function (path, domain) {// 删除所有cookie
				var name = document.cookie.match(/[^ =;]+(?=\=)/g);
				if (name) {
					for (var i = name.length; i--;) {
						document.cookie = name[i] + "=0;" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
					}
				}
			}
		}
	};
	return window._webcache=_webcache;
})(window)
