<template>
	<view>
		<view class="swiper-box">
			<swiper class="unisw" indicator-active-color="#ff7c33" style="flex:1" :current="current"
				:indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000" @change="changeSwiperIndex">
				<swiper-item class="top" v-for="A,B in 5" :key="B">
					<view class="pos-box" v-if="imgList.length>B">
						<image class="tu" :src="imgList[B]"></image>
					</view>
					<view class="pos-box" @click="uploadImg" v-else>
						<view class="swiper-item">
							<u-icon name="plus" bold size="70"></u-icon>
							<view class="text">
								添加或上传
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="bottom">
				<view class="left">
					<view class="dots" v-for="A,B in 5" :key="B" :class="{active:B==current}">

					</view>
				</view>
				<view class="right">
					编辑
				</view>
			</view>
		</view>
		<view class="info-block">
			<view class="biao">
				<u-tabs :list="tabsList" :activeStyle="{ color: '#ff7c33' }" :lineHeight="0"></u-tabs>
				<view class="yuan">
					+
				</view>
			</view>
			<view class="biao" style="border-top:1rpx solid #F2F3F5 ;">
				<u-tabs :list="louceng" :activeStyle="{ color: '#ff7c33' }" :lineHeight="0"></u-tabs>
				<view class="yuan">

				</view>
			</view>
		</view>
		<view class="classfiy">
			<view class="item" v-for="A,B in classfiy" :key="B" :class="{active:classfiyIndex == B}"
				@click="changeClassfiyIndex(B)">
				{{A.name}}
				<view class="line" v-if="classfiyIndex == B">

				</view>
				<view class="line2" v-else>

				</view>
			</view>
		</view>
		<view class="product">
			<view class="top">
				<u-tabs :list="productList" :activeStyle="{ color: '#ff7c33' }" lineColor="#ff7c33"
					:lineHeight="2"></u-tabs>
			</view>
			<view class="Dadropdown">
				<DaDropdownVue2 :dropdownMenu="dropdownMenuList" @confirm="handleConfirm" @close="handleClose"
					@open="handleOpen">
					<template v-slot:slot4="{item,index}">
						<view style="padding: 40px">
							<u-icon name="grid"></u-icon>
						</view>
					</template>
				</DaDropdownVue2>
			</view>
			<!-- <view class="shopList" v-if="dropdownMenuList[3].value">
			
			</view> -->
			<view class="shopList">
				<view class="shopItem" v-for="A,B in shopList" :key="B">
					<view class="shop-img">
						<image :src="A.img" mode="aspectFill"></image>
					</view>
					<view class="shop-info">
						<view class="shop-title">
							{{A.title}}
						</view>
						<view class="shop-price">
							<view class="price-box-left">
								￥{{A.price}}
							</view>
							<view class="price-box-right">
								编辑
							</view>
						</view>
						<view class="shop-name">
							{{A.shopName}}
							<u-icon name="arrow-right" size="12"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import DaDropdownVue2 from '../../components/da-dropdown-vue2/index.vue'
	export default {
		components: {
			DaDropdownVue2
		},
		data() {
			return {
				imgList: [],
				current: 0,
				classfiyIndex: 0,
				tabsList: [{
					name: 'LOGO形象'
				}, {
					name: '企业文化'
				}, {
					name: '人员构架'
				}],
				louceng: [{
					name: '1F'
				}, {
					name: '2F'
				}],
				classfiy: [{
					name: '产品'
				}, {
					name: '代理商'
				}, {
					name: '案例'
				}],
				productList: [{
					name: '五金'
				}, {
					name: '洁具'
				}, {
					name: '结构'
				}, {
					name: '石材'
				}, {
					name: '地板'
				}, {
					name: '木门'
				}, ],
				dropdownMenuList: [{
					title: '综合排序',
					type: 'cell',
					prop: 'god1',
					showAll: true,
					showIcon: true,
					value: '2', // 默认内容2
					options: [{
							label: '排序1',
							value: '1',
						},
						{
							label: '排序2',
							value: '2'
						},
						{
							label: '排序3',
							value: '3'
						},

					],
				}, {
					title: '销量',
					type: 'click',
					prop: 'buyNum',
					value: false, // 默认选中
				}, {
					title: '筛选',
					type: 'filter',
					prop: 'shaixuan',
					// 默认选中单选2、多选2、3、滑动30
					value: {
						ft1: '',
					},
					options: [{
						title: '单选',
						type: 'radio',
						prop: 'ft1',
						options: [{
								label: '单选1',
								value: '1'
							},
							{
								label: '单选2',
								value: '2'
							},
							{
								label: '单选3',
								value: '3'
							},
							{
								label: '单选4',
								value: '4'
							},
						],
					}],
				}, {
					title: 666,
					type: 'click',
					prop: 'style',
					value: false, // 默认选中
				}],
				shopList: [{
					title: '慕弗森SPC地板慕弗森SPC地板慕弗森SPC地板慕弗森SPC地板',
					img: '/static/img/demo.png',
					shopName: 'Daisy瓷砖旗舰店',
					price: '89.9'
				}, {
					title: '慕弗森SPC地板',
					img: '/static/img/demo.png',
					shopName: 'Daisy瓷砖旗舰店',
					price: '89.9'
				}, {
					title: '慕弗森SPC地板',
					img: '/static/img/demo.png',
					shopName: 'Daisy瓷砖旗舰店',
					price: '89.9'
				}, {
					title: '慕弗森SPC地板',
					img: '/static/img/demo.png',
					shopName: 'Daisy瓷砖旗舰店',
					price: '89.9'
				}, ]
			}
		},
		methods: {
			handleConfirm(v, selectedValue) {
				console.log('handleConfirm ==>', v, selectedValue)
			},
			handleClose(v, callbackMenuList) {
				console.log('handleClose ==>', v, callbackMenuList)
			},
			handleOpen(v) {
				console.log('handleOpen ==>', v)
			},
			changeSwiperIndex(e) {
				this.current = e.detail.current
			},
			changeClassfiyIndex(index) {
				if (this.classfiyIndex != index) {
					this.classfiyIndex = index
				}
			},
			uploadImg() {
				let that = this
				uni.chooseImage({
					success(res) {
						let Dimg = res.tempFilePaths[0]
						let token = uni.getStorageSync('token')
						uni.uploadFile({
							url: that.$tools.httpUrl + '/api/common/upload',
							filePath: Dimg,
							name: 'file',
							header: {
								'Authorization': `Bearer ${token}`,
							},
							success(uploadImgRes) {
								console.log(JSON.parse(uploadImgRes.data));
								let info = JSON.parse(uploadImgRes.data)
								if (info.code == 1) {
									that.imgList.push(info.data.fullurl)
								} else {
									uni.showToast({
										title: info.msg,
										icon: 'none'
									})
								}
								console.log(that.imgList);
							}
						})
						console.log();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	::v-deep .u-tabs__wrapper__nav__item__text {
		font-size: 26rpx !important;
	}

	page {
		background-color: #f9f9f9;
	}

	.swiper-box {
		margin: 15rpx 32rpx 40rpx;
		padding: 15rpx;
		height: 784rpx;
		position: relative;

		.unisw {
			width: 100%;
			height: 100%;
		}

		.top {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
			position: relative;

			.pos-box {
				width: 100%;
				height: 100%;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				.tu {
					width: 100%;
					height: 100%;
				}
			}

			.swiper-item {
				display: flex;
				flex-direction: column;
			}




			.text {
				margin-top: 64rpx;
			}
		}

		.bottom {
			height: 62rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			position: absolute;
			bottom: 10rpx;
			left: 0;

			.left {
				display: flex;
				align-items: center;

				.dots {
					width: 14rpx;
					height: 14rpx;
					border-radius: 50%;
					background-color: #D9D9D9;
					margin-right: 10rpx;
				}

				.active {
					background-color: #FF7C33;
				}
			}

			.right {
				background-color: #fefefe;
				padding: 13rpx 38rpx;
				border-radius: 31rpx;
				border: 1rpx solid #ebebeb;
			}
		}
	}

	.info-block {
		margin: 32rpx;
		border-radius: 28rpx;
		background-color: #fff;

		.biao {
			position: relative;
			margin: 0 28rpx;
			font-size: 28rpx !important;

			.yuan {
				width: 43rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 0;
				top: 15rpx;
				border-radius: 0 31rpx 31rpx 0;
				background-color: #fff;
				box-shadow: -8rpx 0 10rpx #7D7D7D;
			}
		}
	}

	.classfiy {
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #fff;
		margin: 20rpx 32rpx;
		padding: 28rpx 0 14rpx;
		border-radius: 12rpx;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #606266;
			font-size: 30rpx;

			.line {
				width: 38rpx;
				height: 8rpx;
				border-radius: 6rpx;
				background-color: #FF7C33;
				margin-top: 6rpx;
			}

			.line2 {
				width: 38rpx;
				height: 8rpx;
				border-radius: 6rpx;
				margin-top: 6rpx;
			}

		}

		.active {
			color: #FF7C33;
		}
	}

	.product {
		background-color: #fff;
		padding: 0 20rpx 20rpx;
		margin: 20rpx 32rpx;
		border-radius: 12rpx;

		.top {
			border-bottom: 1rpx solid #F2F3F5;
		}
	}

	.shopList {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		.shopItem {
			border-radius: 20rpx;
			width: 313rpx;
			border: 1rpx solid #EBEBEB;
			margin-bottom: 20rpx;

			.shop-img {
				image {
					border-radius: 20rpx 20rpx 0 0;
					height: 313rpx;
					width: 313rpx;
				}
			}

			.shop-info {
				padding: 20rpx 20rpx;

				.shop-title {
					font-size: 26rpx;
					font-weight: bold;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.shop-price {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 13rpx;
					margin-bottom: 20rpx;

					.price-box-left {
						color: #FE2D60;
						font-size: 26rpx;
						font-weight: bold;
					}

					.price-box-right {
						font-size: 24rpx;
						color: #FF7C33;
						border: 1rpx solid #FF7C33;
						padding: 8rpx 20rpx;
						border-radius: 40rpx;
					}
				}

				.shop-name {
					display: flex;
					font-size: 20rpx;
					align-items: center;
				}
			}
		}


	}
</style>