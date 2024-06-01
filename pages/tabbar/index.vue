<template>
	<view>
		<!-- 顶部导航 -->
		<!-- <u-sticky> -->
		<view class="my_tabs">
			<u-tabs :list="list" :is-scroll="false" :current="current" lineColor="#ff7c33" active-color="orange"
				@change="change">
			</u-tabs>
			<view class="right-icon" @click="sort">
				<u-icon name="list" size="18"></u-icon>
			</view>
		</view>
		<!-- </u-sticky> -->
		<!-- 内容区 -->
		<view class="bigView">
			<div class="columnW" @click="onGoDetails()">
				<img src="../../static/img/widthI.jpg" class="widthI">
				<view class="tipView">
					<view class="introduce">
						<span>烟台 天悦湾 1100㎡</span>
						<span>这个家没什么特别...</span>
					</view>
					<view class="userView">
						<view class="displayView">
							<img src="../../static/img/user.jpg" class="userImg">
							<span style="font-size:22rpx">新哥装修设...</span>
						</view>
						<view class="displayView">
							<img src="../../static/img/store.png" class="store">
							<span style="font-size:22rpx">4336</span>
						</view>
					</view>
				</view>
			</div>
			<div class="columnH" @click="onGoDetails()">
				<img src="../../static/img/widthI.jpg" class="widthH">
				<view class="tipView">
					<view class="introduce">
						<span>烟台 天悦湾 1100㎡</span>
						<span>这个家没什么特别...</span>
					</view>
					<view class="userView">
						<view class="displayView">
							<img src="../../static/img/userH.jpg" class="userImg">
							<span style="font-size:22rpx">HZ Design...</span>
						</view>
						<view class="displayView">
							<img src="../../static/img/store.png" class="store">
							<span style="font-size:22rpx">1.1万</span>
						</view>
					</view>
				</view>
			</div>
		</view>
		<!-- the-end -->
		<view style="color:#606266;font-size: 24rpx;text-align: center;margin-top:26rpx;">
			- THE END -
		</view>
		<!-- 选择身份遮罩层 -->
		<u-overlay :show="identity_model" @click="identity_model = false">
			<view class="change_identity">
				<view class="identity_view">
					<view class="img_view" @click="onChangeIdentity(item.id)" v-for="item,index in identityList"
						:key="index">
						<img :src="item.img" class="identity_img">
						<uni-icons v-if="item.select == 1" size="41rpx" class="change_img" color="#28D165"
							type="checkbox-filled"></uni-icons>
						<span>{{item.name}}</span>
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- 选择身份为甲方遮罩层 -->
		<u-overlay :show="maskIndex0" @click="maskIndex0 = false">
			<view class="change_identity" @click.stop>
				<view class="option-box">
					<view class="title-box">
						<view class="title">
							家庭身份
						</view>
						<view class="icon" @click="maskIndex0 = false">
							<u-icon name="close" size="25"></u-icon>
						</view>
					</view>
					<view class="info-select-box">
						<view class="info-select-title">
							家庭
						</view>
						<view class="info-select-item">
							<view class="item" v-for="A,B in family" :key="B">
								{{A.name}}
							</view>
							<view class="item outher">
								<u-icon name="plus" color="#FF7C33" size="13"></u-icon>
								其他
							</view>
							<view style="width: 170rpx;">
							</view>
						</view>
					</view>
					<view class="info-select-box">
						<view class="info-select-title">
							宠物
						</view>
						<view class="info-select-item">
							<view class="item" v-for="A,B in pets" :key="B">
								{{A.name}}
							</view>
							<view class="item outher">
								<u-icon name="plus" color="#FF7C33" size="13"></u-icon>
								其他
							</view>
							<view style="width: 170rpx;">
							</view>
						</view>
					</view>
					<view class="info-select-box">
						<view class="info-select-title">
							监理
						</view>
						<view class="info-select-item">
							<view class="item" v-for="A,B in supervision" :key="B">
								{{A.name}}
							</view>
							<view class="item outher">
								<u-icon name="plus" color="#FF7C33" size="13"></u-icon>
								其他
							</view>
							<view style="width: 170rpx;">
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- 选择身份为乙方遮罩层 -->
		<u-overlay :show="maskIndex1" @click="maskIndex1 = false">
			<view class="change_identity" @click.stop>
				<view class="option-box" v-if="mask1PageIndex==1">
					<view class="title-box">
						<view class="title">
							服务单位
						</view>
						<view class="icon" @click="maskIndex1 = false">
							<u-icon name="close" size="25"></u-icon>
						</view>
					</view>
					<view class="info-select-box">
						<view class="info-select-item">
							<view class="item outher">
								<u-icon name="plus" color="#FF7C33" size="13"></u-icon>
								其他
							</view>
							<view class="item" v-for="A,B in serviceUnit" :key="B" @click="Mask1Next(A)">
								{{A.name}}
							</view>
							<view style="width: 170rpx;">
							</view>
						</view>
					</view>
				</view>
				<view class="option-box" v-if="mask1PageIndex == 2 ">
					<view class="title-box">
						<view class="title">
							{{mask2Title}}
						</view>
						<view class="icon" @click="mask1PageIndex = 1">
							<u-icon name="close" size="25"></u-icon>
						</view>
					</view>
					<view class="info-select-box">
						<view class="info-select-item">
							<view class="item outher">
								<u-icon name="plus" color="#FF7C33" size="13"></u-icon>
								其他
							</view>
							<view class="item" v-for="A,B in serviceUnit2" :key="B" @click="mask1PageIndex=3">
								{{A.name}}
							</view>
							<view style="width: 170rpx;">
							</view>
						</view>
					</view>
				</view>
				<view class="option-box" v-if="mask1PageIndex == 3 ">
					<view class="title-box">
						<view class="title">
							品牌
						</view>
						<view class="icon" @click="mask1PageIndex = 2">
							<u-icon name="close" size="25"></u-icon>
						</view>
					</view>
					<view class="info-select-box">
						<view class="info-select-item">
							<view class="item outher" @click="registerBrand">
								<u-icon name="plus" color="#FF7C33" size="13"></u-icon>
								注册品牌
							</view>
							<view class="item" v-for="A,B in brand" :key="B" @click="mask1PageIndex=3">
								{{A.name}}
							</view>
							<view class="item lw">
								劳务市场人员注册
							</view>
							<view style="width: 170rpx;">
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- tabs点击列表icon内容 -->
		<u-popup :show="tabsListShow" :round="30" mode="bottom" closeable>
			<view class="sort-list">
				<view class="sort-title">
					拖动调整频道顺序
				</view>
				<view class="sort-list-box">
					<view class="my-channel">
						我的频道
					</view>
					<view class="sort-list-item" v-for="item, index in list" :key="index">
						<view class="item-left">
							{{item.name}}
						</view>
						<view class="item-right">
							<uni-icons v-if="homeOneTabsIndex == index" type="checkbox-filled"
								color="#ff7c33"></uni-icons>
							<uni-icons v-else type="circle" @click="homeOneTabsIndex = index"
								color="#cccccc"></uni-icons>
							<view class="home-text">
								主页
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 添加按钮 -->
		<view class="push_view">
			<span>＋</span>
		</view>
	</view>
</template>

<script>
	export default ({
		data() {
			return {
				list: [{
						name: "阿波罗",
					},
					{
						name: "家装",
					},
					{
						name: "办公楼",
					},
					{
						name: "酒店",
					},
					{
						name: "办公楼",
					},
					{
						name: "酒店",
					},
					{
						name: "办公室",
					},
					{
						name: "公园",
					},
					{
						name: "家装",
					},
				],
				sortList: [{

				}],
				homeOneTabsIndex: 0,
				//默认展开第几项
				current: 0,
				identityList: [{
					id: 0,
					name: '我是甲方',
					img: '/static/img/jf.png',
					select: 1
				}, {
					id: 1,
					name: '我是乙方',
					img: '/static/img/yf.png',
					select: 0
				}, {
					id: 2,
					name: '我是游客',
					img: '/static/img/yk.png',
					select: 0
				}, ],
				// 选择身份弹出窗
				identity_model: true,
				maskIndex0: false,
				maskIndex1: false,
				mask1PageIndex: 1,
				// 家庭
				family: [{
					id: 0,
					name: '男主',
				}, {
					id: 1,
					name: '女主',
				}],
				// 宠物
				pets: [{
					name: '狗'
				}, {
					name: '猫'
				}, {
					name: '乌龟我i感觉撒告诉gksangklnasklg '
				}],
				// 监理
				supervision: [{
						name: '监理一'
					},
					{
						name: '监理二'
					}
				],
				// 服务单位
				serviceUnit: [{
					name: '基装企业'
				}, {
					name: '建材企业'
				}, {
					name: '设备企业'
				}, {
					name: '软装'
				}, {
					name: '家具'
				}, {
					name: '五金'
				}, {
					name: '电器'
				}, {
					name: '家纺'
				}, {
					name: '设计'
				}],
				serviceUnit2: [{
					name: '卫浴'
				}, {
					name: '厨房'
				}, {
					name: '木作'
				}, {
					name: '瓷砖'
				}, {
					name: '灯具'
				}, {
					name: '地板'
				}, {
					name: '美缝'
				}, {
					name: '集成吊顶'
				}, {
					name: '防盗门'
				}, {
					name: '窗户'
				}],
				// 品牌
				brand: [{
					name: '汉斯格雅'
				}, {
					name: 'ToTo'
				}, {
					name: '科勤'
				}],
				mask2Title: '',
				tabsListShow: false
			}
		},
		methods: {
			registerBrand() {
				uni.navigateTo({
					url: '/pages/form/brand'
				})
			},
			Mask1Next(item) {
				let that = this
				that.mask2Title = item.name
				that.mask1PageIndex = 2
			},
			async change(index) {
				var that = this
			},
			onChangeIdentity(id) {
				let that = this
				console.log('选择了' + id)
				this.identity_model = false
				if (id == 0) {
					that.maskIndex0 = true
				} else if (id == 1) {
					that.maskIndex1 = true
				}
			},
			// 去详情
			onGoDetails() {
				uni.navigateTo({
					url: '/pages/projectDetails/projectDetails'
				})
			}
		},
		onLoad() {

		},
		onShow() {

		}

	})
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	::v-deep .u-tabs {
		width: 95% !important;
	}

	.my_tabs {
		background-color: #fff;
		display: flex;
		align-items: center;
	}

	::v-deep .u-tabs__wrapper__nav__item__text {
		font-size: 28rpx !important;
	}

	::v-deep .my_tabs .u-tabs {
		width: 100%;
	}

	.widthI {
		width: 357rpx;
		height: 260rpx;
		border-top-right-radius: 10rpx;
		border-top-left-radius: 10rpx;
	}

	.widthH {
		width: 357rpx;
		height: 440rpx;
		border-top-right-radius: 10rpx;
		border-top-left-radius: 10rpx;
	}

	.bigView {
		padding: 10rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.columnH {
		width: 357rpx;
		/* height:594rpx; */
		border-radius: 10rpx;
		background: white;
	}

	.columnW {
		width: 357rpx;
		height: 454rpx;
		border-radius: 10rpx;
		background: white;
	}

	.introduce {
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
	}

	.userImg {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
	}

	.store {
		width: 26rpx;
		height: 22rpx;
	}

	.userView {
		display: flex;
		justify-content: space-between;
	}

	.displayView {
		display: flex;
		align-items: center;
	}

	.displayView img {
		margin-right: 4px;
	}

	.tipView {
		height: 194rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 10rpx 20rpx 20rpx 20rpx;
	}

	.push_view {
		height: 110rpx;
		width: 110rpx;
		background: #FF7C33;
		border-radius: 50%;
		text-align: center;
		line-height: 100rpx;
		color: white;
		font-size: 82rpx;
		position: absolute;
		bottom: 40rpx;
		right: 20rpx;
		z-index: 9;
	}

	.change_identity {
		position: fixed;
		top: 0rpx;
		bottom: 0rpx;
		right: 0rpx;
		left: 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.option-box {
			background-color: #fff;
			border-radius: 20rpx;
			position: relative;
			padding: 40rpx 50rpx 100rpx;
			margin: 0 50rpx;
			min-height: 814rpx;

			.title-box {
				text-align: center;
				margin-bottom: 40rpx;

				.title {
					font-size: 32rpx;
					font-weight: 400;
				}

				.icon {
					position: absolute;
					right: 40rpx;
					top: 40rpx;
				}
			}


			.info-select-box {
				.info-select-title {
					color: #808080;
					font-size: 28rpx;
					margin-bottom: 20rpx;
				}

				.info-select-item {
					display: flex;
					font-size: 28rpx;
					flex-wrap: wrap;
					justify-content: space-between;

					.item {
						background-color: #f2f3f5;
						width: 170rpx;
						height: 70rpx;
						display: flex;
						margin-bottom: 20rpx;
						justify-content: center;
						align-items: center;
						color: #000000;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.lw {
						width: 354rpx;
					}

					.outher {
						color: #FF7C33;
					}
				}
			}

		}

	}

	.identity_view {
		width: 420rpx;
		height: 950rpx;
		background: white;
		border-radius: 210rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 80rpx 0rpx;
	}

	.identity_img {
		height: 150rpx;
		width: 150rpx;
		border-radius: 50%;
	}

	.img_view {
		height: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.img_view span {
		font-size: 30rpx;
	}

	.change_img {
		text-align: center;
		line-height: 46rpx;
		color: white;
		border-radius: 50%;
		font-size: 30rpx;
		z-index: 999;
		position: absolute;
		right: 0rpx;
		bottom: 48rpx;
		font-weight: 600
	}

	.sort-list {
		height: 1388rpx;
		background-color: #f9f9f9;

		.sort-title {
			font-weight: bold;
			font-style: 32rpx;
			padding: 40rpx 0;
			text-align: center;
		}

		.sort-list-box {
			padding: 0 30rpx;

			.my-channel {
				color: #808080;
				font-size: 28rpx;
				margin-bottom: 30rpx;
			}

			.sort-list-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 33rpx 40rpx 34rpx 36rpx;
				background-color: #fff;
				border-radius: 15rpx;
				margin-bottom: 16rpx;

				.item-left {
					font-size: 28rpx;
				}

				.item-right {
					display: flex;
					align-items: center;

					.home-text {
						margin-left: 11rpx;
						font-size: 24rpx;
						color: #909399
					}
				}
			}

		}

	}
</style>