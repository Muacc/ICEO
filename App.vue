<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
<script>
	export default {
		globalData:{
			upperOpenid:'',//用户id
			userInfo:{},//用户信息
			addressInfo:{},//地址信息
		},
		onLaunch: function() {
			/* uni.getStorageSync('userInfo')
			if(!uni.getStorageSync('userInfo') || !uni.getStorageSync('userInfo').id){
				uni.showModal({
					title: '温馨提示',
					content: '尚未登录或登录已过期，是否前往登录？',
					success: (res) => {
						if (res.confirm) {
							this.$tools.goNext('/pages/login/login')
						} else if (res.cancel) {
							// this.$tools.goSwitchTab('/pages/tabbar/home');
						}
					}
				});
				return false
			} */
			// uni.setStorageSync('openid','asfds67gfds6gfds7gds67ds');
			// #ifdef  MP-WEIXIN
			// this.getUserOpenid();//获取用户的openid
			// #endif
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		},
		methods:{
			getUserOpenid() { //获取用户的openid
				let self = this;
				if(uni.getStorageSync('openid') && uni.getStorageSync('openid').length>0) {
					this.getOpenidInfo(uni.getStorageSync('openid'));
					return false;
				}
				wx.cloud.init({ traceUser: true })
				wx.cloud.callFunction({
					name: 'login', // 需调用的云函数名
					data: {}, // 传给云函数的参数
					success: (res) => { // 成功回调
						uni.setStorageSync('openid',res.result.openid);
						self.getOpenidInfo(res.result.openid);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			getOpenidInfo(event) {
				this.$tools.axiosFrom('POST','user/wechatLogin',{wechat:event}).then(res => {
					if(res.code==1 && res.data) {
						uni.setStorageSync('fairyToken',res.data.userinfo.token)
						this.globalData.userInfo = res.data.userinfo;
					} else {
						this.globalData.userInfo = {};
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/style/style_scss.scss";
</style>
