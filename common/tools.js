var tools = {
	// httpUrl:'https://jcb.jiechibang.com',//域名 线上
	httpUrl: 'https://iceotest.yunlanit.cn', //域名 测试
	showtt: function(add1, add2) {
		uni.showToast({
			title: add1,
			duration: 2000,
			icon: add2 ? add2 : 'none'
		})
	},
	getImg(url) {
		return this.httpUrl + url;
	},
	// 跳转下一页
	goNext(url) {
		uni.navigateTo({
			url: url
		})
	},
	// 返回上一页
	goBack(num) {
		uni.navigateBack({
			delta: num
		})
	},
	// 跳转tabar页面
	goSwitchTab(url) {
		uni.switchTab({
			url: url
		})
	},
	// 关闭所有页面，跳转到指定页面
	goReLaunch(url) {
		uni.reLaunch({
			url: url
		})
	},
	// 关闭当前页，跳转下一页
	goRedirectTo(url) {
		uni.redirectTo({
			url: url
		})
	},
	//正常请求 
	//请求格式 method POST GET
	//请求地址 url
	//请求参数 data
	//加载中的框  showLoads
	axios: function(method, url, data, showLoads) {
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框  showLoads
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.httpUrl + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	axiosNew: function(method, url, data, showLoads) {
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框  showLoads
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.httpUrl + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	//FROM的请求
	//请求格式 method POST GET
	//请求地址 url
	//请求参数 data
	//加载中的框  showLoads
	axiosFrom: function(method, url, data, showLoads) {
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.httpUrl + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	axiosFromNew: function(method, url, data, showLoads) {
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.httpUrl + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	//FROM的请求 token
	//请求格式 method POST GET
	//请求地址 url
	//请求参数 data
	//加载中的框  showLoads
	axiosFromToken: function(method, url, data, showLoads) {
		let that = this;
		// var timestamp = Date.parse(new Date());
		// var data_expiration = uni.getStorageSync("data_expiration");
		// if (data_expiration) {
		//   if (timestamp > data_expiration) {
		//     uni.clearStorageSync()
		// 	uni.showModal({
		// 		title: '登录过期',
		// 		content: '请登录!',
		// 		showCancel:false,
		// 		success: function (res) {
		// 			if (res.confirm) {
		// 				that.goNext('/pages/login');
		// 			}
		// 		}
		// 	});
		// 	return false
		//   }
		// }
		let token = uni.getStorageSync('token') ? uni.getStorageSync('token') : ''; //用户的token
		// token='c658a2d3-cca8-4e38-a33e-5ba260ad68eb';
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.httpUrl + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'content-Type': 'application/x-www-form-urlencoded',
					'Authorization':`Bearer ${token}`,
					'token': token
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					if (res.data.code == 401) {
						// uni.showModal({
						// 	title: '尚未登录',
						// 	content: '请登录!',
						// 	showCancel:false,
						// 	success: function (res) {
						// 		if (res.confirm) {
						// 			that.goNext('/pages/login');
						// 		}
						// 	}
						// });
						return false
					}
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	axiosFromTokenNew: function(method, url, data, showLoads, is_true) {
		var httpURL = this.httpUrl
		let token = uni.getStorageSync('token') ? uni.getStorageSync('token') : ''; //用户的token
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框
		return new Promise((resolve, reject) => {
			uni.request({
				url: httpURL + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'content-Type': 'application/json',
					'token': token
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					// if (res.data.code == 401) {
					// 	uni.showModal({
					// 		title: '温馨提示',
					// 		content: '尚未登录或登录已过期，是否前往登录？',
					// 		success: (res) => {
					// 			uni.removeStorageSync('token');
					// 			// uni.clearStorageSync()
					// 			if (res.confirm) {
					// 				uni.redirectTo({
					// 						url:'/pageCopy/login/login'
					// 				})
					// 			} else if (res.cancel) {

					// 			}
					// 		}
					// 	});
					// 	return false
					// }
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	axiosFromTelephoneNew: function(method, url, data, showLoads, is_true) {
		var httpURL = this.httpUrl
		let token = uni.getStorageSync('token') ? uni.getStorageSync('token') : ''; //用户的token
		// token="token:1d728e3a-ddff-4731-a59b-d1be23b64794"
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框
		return new Promise((resolve, reject) => {
			uni.request({
				url: httpURL + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'content-Type': 'application/json',
					'token': token
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					if (res.data.code == 401) {
						// uni.showModal({
						// 	title: '温馨提示',
						// 	content: '尚未登录或登录已过期，是否前往登录？',
						// 	success: (res) => {
						// 		uni.clearStorageSync()
						// 		if (res.confirm) {
						// 			this.goNext('/pageCopy/login/enroll')
						// 		} else if (res.cancel) {
						// 			this.goSwitchTab('/pages/tabbar/home');
						// 		}
						// 	}
						// });
						return false
					}
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	axiosFromTokenLogoutNew: function(method, url, data, showLoads, is_true) {
		var httpURL = this.httpUrl
		let token = uni.getStorageSync('token') ? uni.getStorageSync('token') : ''; //用户的token
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框
		return new Promise((resolve, reject) => {
			uni.request({
				url: httpURL + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'content-Type': 'application/json',
					'token': token
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					if (res.data.code == 401) {
						// uni.showModal({
						// 	title: '温馨提示',
						// 	content: '尚未登录或登录已过期，是否前往登录？',
						// 	success: (res) => {
						// 		uni.clearStorageSync()
						// 		if (res.confirm) {
						// 			this.goNext('/pageCopy/login/enroll')
						// 		} else if (res.cancel) {
						// 			this.goSwitchTab('/pages/tabbar/home');
						// 		}
						// 	}
						// });
						return false
					}

					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	// from表单的输入
	formInfo(data) {
		let show = true
		for (let key in data) {
			const value = data[key]
			if (!value) {
				uni.showToast({
					title: '未填写完整',
					icon: 'none'
				})
				console.log('未填写完整', value, 'jhkgkjgkj拉萨看得见韩国')
				show = false;
				break;
			}
		}
		return show;
	},
	// 判断身份证号    
	isSfz(idcard) {
		var id =
			/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
		if (idcard === '') {
			uni.showToast({
				title: '请输入身份证号',
				icon: 'none'
			})
		} else if (!id.test(idcard)) {
			uni.showToast({
				title: '身份证号格式不正确!',
				icon: 'none'
			})
			return false
		} else {
			return false
		}
	},
	// 判断是否是手机号   
	isPhone(val) {
		var patrn = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
		if (!patrn.test(val) || val === '') {
			uni.showToast({
				title: '手机号格式不正确',
				icon: 'none'
			})
			return false
		} else {
			return true
		}
	},
	// 判断邮箱
	isEmail(email) {
		if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
			return true;
		else
			return false;
	},
	// 时间戳转时间
	timestampToTime(timestamp) {
		var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		return Y + M + D + h + m + s;
	},
	// 时间戳转时间
	timestampToDate(timestamp) {
		var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		return Y + M + D;
	},
	/**
	 * 判断是否是中文
	 * @param str
	 * @returns {Boolean}
	 */
	isChine: function(str) {
		var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
		if (reg.test(str)) {
			return false;
		}
		return true;
	},
	/*验证是否为图片*/
	tmCheckImage: function(fileName) {
		return /(gif|jpg|jpeg|png|GIF|JPG|PNG)$/ig.test(fileName);
	},
	/*验证是否为视频*/
	tmCheckVideo: function(fileName) {
		return /(mp4|mp3|flv|wav)$/ig.test(fileName);
	},
	// 判断密码是否符合 至少6位,包括大小写字母、数字、特殊字符
	isPassword(val) {
		var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/;
		if (val === '') {
			uni.showToast({
				title: '请输入密码',
				icon: 'none'
			})
		} else if (!reg.test(val)) {
			uni.showToast({
				title: '至少6位,包括大小写字母、数字、特殊字符',
				icon: 'none'
			})
			return false
		} else {
			return true
		}
	},
	imageLook(httpImgUrl) {
		uni.previewImage({
			urls: httpImgUrl
		})
	},
	copyTextH5App(info) {
		if (!info) return false;
		info = info + '';
		// #ifndef H5
		uni.setClipboardData({ //准备复制的数据
			data: info + '',
			success: function(res) {
				uni.showToast({
					title: '复制成功',
					icon: 'none'
				});
			}
		})
		// #endif
		// #ifdef H5
		let result
		let textarea = document.createElement("textarea")
		textarea.value = info
		textarea.readOnly = "readOnly"
		document.body.appendChild(textarea)
		textarea.select() // 选中文本内容
		textarea.setSelectionRange(0, info.length) // 设置选定区的开始和结束点

		result = document.execCommand("copy") //将当前选中区复制到剪贴板
		// console.log('[result]', result);
		if (result) {
			uni.showToast({ //提示
				title: '复制成功',
				icon: 'none'
			})
		} else {
			uni.showToast({ //提示
				title: '复制失败，请重新尝试',
				icon: 'none'
			})
		}
		textarea.remove()
		// #endif
	},
}


export default tools;