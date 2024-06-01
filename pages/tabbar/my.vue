<template>
	<view class="relative">
		<view class=" w100 h-350"
			style="top: 0; border-bottom-left-radius:60rpx;border-bottom-right-radius:60rpx;background-color: #2c90f4;">
			<view class="rowsm" style="float: right;margin-top: 20rpx;margin-right:20rpx;">
				<!-- <image src="/static/my/icon_sz.png" class="w-40 h-40 ml-20 mr-10" @click="tosystemSet" v-if="isLogin">
				</image>
				<image src="/static/home/home_kf.png" @click="call()" style="width: 46rpx;height:40rpx;" class="kefu">
				</image> -->
			</view>
		</view>

		<!-- 登录状态 -->
		<view v-if="isLogin" class="w100 rows rowa rowsm" style="margin-bottom: 40rpx;margin-top: -400rpx;"
			@click="editInfo()">
			<!-- 头像 -->
			<image :src="user.avatar_full_url" class="w-150 h-150 br-100 bgff ml-20" mode="aspectFill">
			</image>

			<!-- 微信昵称 -->
			<view class="rows rowscl ml-30">
				<view class=" colfff fw-b fs-32 ">{{user.nickname}}</view>
				<!-- 手机号 -->
				<view class=" colfff fs-26 mt-15 mb-15">{{user.mobile?user.mobile:'尚未设置手机号'}}</view>
			</view>
		</view>
		<!-- 未登录状态 -->
		<view v-if="!isLogin" class="w100 h-200 rowscl rowsm " style="margin-top: -320rpx;margin-bottom: 20rpx;">
			<!-- <image src="/static/my/tou_xiang.png" class="w-150 h-150 br-100 bgff" mode="aspectFill" @click="auth()"> -->
			</image>

			<!-- <button class="tct colfff fw-b fs-32 pt-20" open-type="getPhoneNumber" @getphonenumber="getphonenumber">点击授权登录</button> -->
			<button class="tct colfff fw-b fs-32 pt-20" @click="getAuth">点击授权登录</button>
		</view>
		<!-- 卡片 -->
		<view class="br-20 bgff ml-20 mr-20" v-if="oilDetail.refueling_amount"
			style="overflow:hidden;padding: 20rpx;box-sizing: border-box;">
			<view class="rowsa rowsm  h-80">
				<view class=" rowsl rowsm">
					<view class="fs-24 col333 fw-b">{{oilDetail.refueling_amount.week}}</view>
					<view class="fs-24 col666 mt-6">本周成交金额</view>
				</view>
				<view class=" w-1 h-30" style="background: #FAE2E2;"></view>
				<view class="rowsl rowsm">
					<view class="fs-24 col333 fw-b">{{oilDetail.refueling_amount.month}}</view>
					<view class="fs-24 col666 mt-6">本月成交金额</view>
				</view>
				<view class=" w-1 h-30" style="background: #FAE2E2;"></view>
				<view class="rowsl rowsm">
					<view class="fs-24 col333 fw-b">{{oilDetail.refueling_amount.total}}</view>
					<view class="fs-24 col666 mt-6">总成交金额</view>
				</view>
			</view>
		</view>

		<!-- 主体功能 -->
		<view class="bgff mt-20 ml-20 mr-20" style="border-radius: 10rpx; background: white;">
			<view class="w-175 h-50  pt-10 rowscl rowsm fs-26 fw-550">用户服务</view>
			<view class="w100 rows rowsw mt-10" style="border-top: 1rpx solid #ccc;">
				<view class="w-165 h-150 ml-10 mt-10 rowscl rowsm" @click="pageToolJump('/pageCopyB/Order/myOrder')">
					<image src="../../static/tabbar/mysel.png" class="w-36 h-42" mode="aspectFill"></image>
					<view class="fs-24 col666 mt-15">我的订单</view>
				</view>
			</view>
		</view>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	const APP = getApp().globalData;
	export default {
		data() {
			return {
				isLogin: false, // 是否登录
				user: {
					money: '0.00',
					card: '0.00',
					month: '0.00'
				},
				oilDetail: {},
				hotline: '',
				code: ''
			}
		},
		onLoad() {

		},
		onShow() {
			let token = uni.getStorageSync('token') ? uni.getStorageSync('token') : ''; //用户的token
			console.log(token, "myToken=====");
			if (!token) {
				this.isLogin = false;
			} else {
				this.isLogin = true;
				this.init();
			}
			// 获取客服电话
			this.getconsumershotline()
		},
		methods: {
			getphonenumber(e) {
				console.log(e);
			},
			getAuth() {
				let that = this
				uni.login({
					success(res) {
						that.code = res.code
						that.$tools.axios('POST', '/api/user/wx_mini_program_auth', {
							mobile: '13233333333',
							code: res.code
						}).then((loginState) => {
							console.log(loginState);
							if (loginState.code == 1) {
								uni.setStorageSync('token', loginState.data.token)
							}
						})
					}
				})

			},
			getconsumershotline() {
				var that = this
				that.$tools.axiosFromTokenNew('GET', '/api/common/consumershotline', {})
					.then(res => {
						that.hotline = res.data.hotline
					})
			},
			pageToolJump(url) { //工具栏
				this.$tools.goNext(url);
			},
			// 拨打客服
			call() {
				console.log('666')
				if (this.hotline != '') {
					uni.makePhoneCall({
						phoneNumber: this.hotline
					});
				}
			},
			tosystemSet() {
				this.$tools.goNext('/pageCopy/my/mydata/systemSet')
			},
			init() {

			},
			auth() {
				this.$tools.goNext('/pageCopy/login/enroll');
			},

			// 修改个人资料
			editInfo() {
				this.$tools.goNext('/pageCopy/my/mydata/mydata');
			},
		},
		onReady() {},
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.kefu {
		position: absolute;
		top: 20rpx;
		right: 90rpx;
	}
</style>