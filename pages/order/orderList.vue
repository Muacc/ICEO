<template>
	<view>
		<!-- 搜索栏 -->
		<view style="background-color: #fff;">
			<uni-search-bar :radius="18" @confirm="search" :focus="true" v-model="searchValue" placeholder="搜索我的订单"  @input="input"
				@cancel="cancel">
			</uni-search-bar>
		</view>
		<!-- 状态栏 -->
		<view class="my_tabs">
			<u-tabs :list="list" :is-scroll="false" :current="current" active-color="orange" @change="change">
			</u-tabs>
		</view>
		<!-- 订单列表 -->
		<view>
			<view class="order_item">
				<!-- 店铺 -->
				<view class="shop_item">
					<view class="shop_name">
						<img src="https://img.bosszhipin.com/beijin/upload/tmp/20190423/8e5ef64873aba24c0d4ce1babf7385ba3045b314cfe88056097367e02d70eee0.png?x-oss-process=image/resize,w_100,limit_0">
						<view>格物装饰旗舰店</view>
					</view>
					<view class="status">待付款</view>
				</view>
				<!-- 订单数据 -->
				<view class="order_dtl">
					<img src="https://img11.360buyimg.com/n1/jfs/t1/201880/40/27242/109678/63313cf9E96864d5b/34b9fa7b3fcaef5b.jpg">
					<viwe class="order_dtl_right">
						<view class="odr_itm_name">
							<view style="font-size:26rpx;font-weight: bold;">美国红橡实木地板</view>
							<view style="font-size: 22rpx;">￥299.00</view>
						</view>
						<view class="odr_itm_name">
							<view style="font-size: 22rpx;">热销款实木地板平面拉丝工艺</view>
							<view style="font-size: 22rpx;color: #606266;">数量：1</view>
						</view>
					</viwe>
				</view>
				<!-- 付款信息 -->
				<view class='pay_view'>
					<view class="pay_item">
						<span>应付款：</span>
						<span style="color:#FF7C33">￥299.00</span>
					</view>
					<view class="btn_view">
						<view>取消订单</view>
						<view style="background:#FF7C33;color:white;border:1rpx solid #FF7C33;margin-left:24rpx;">付款</view>
					</view>
				</view>
			</view>
			<view class="order_item">
				<!-- 店铺 -->
				<view class="shop_item">
					<view class="shop_name">
						<img src="https://img.bosszhipin.com/beijin/upload/tmp/20190423/8e5ef64873aba24c0d4ce1babf7385ba3045b314cfe88056097367e02d70eee0.png?x-oss-process=image/resize,w_100,limit_0">
						<view>格物装饰旗舰店</view>
					</view>
					<view class="status">待付款</view>
				</view>
				<!-- 订单数据 -->
				<view class="order_dtl">
					<img src="https://img11.360buyimg.com/n1/jfs/t1/201880/40/27242/109678/63313cf9E96864d5b/34b9fa7b3fcaef5b.jpg">
					<viwe class="order_dtl_right">
						<view class="odr_itm_name">
							<view style="font-size:26rpx;font-weight: bold;">美国红橡实木地板</view>
							<view style="font-size: 22rpx;">￥299.00</view>
						</view>
						<view class="odr_itm_name">
							<view style="font-size: 22rpx;">热销款实木地板平面拉丝工艺</view>
							<view style="font-size: 22rpx;color: #606266;">数量：1</view>
						</view>
					</viwe>
				</view>
				<!-- 付款信息 -->
				<view class='pay_view'>
					<view class="pay_item">
						<span>应付款：</span>
						<span style="color:#FF7C33">￥299.00</span>
					</view>
					<view class="btn_view">
						<view>取消订单</view>
						<view style="background:#FF7C33;color:white;border:1rpx solid #FF7C33;margin-left:24rpx;">付款</view>
					</view>
				</view>
			</view>
			<view class="order_item">
				<!-- 店铺 -->
				<view class="shop_item">
					<view class="shop_name">
						<img src="https://img.bosszhipin.com/beijin/upload/tmp/20190423/8e5ef64873aba24c0d4ce1babf7385ba3045b314cfe88056097367e02d70eee0.png?x-oss-process=image/resize,w_100,limit_0">
						<view>格物装饰旗舰店</view>
					</view>
					<view class="status">待付款</view>
				</view>
				<!-- 订单数据 -->
				<view class="order_dtl">
					<img src="https://img11.360buyimg.com/n1/jfs/t1/201880/40/27242/109678/63313cf9E96864d5b/34b9fa7b3fcaef5b.jpg">
					<viwe class="order_dtl_right">
						<view class="odr_itm_name">
							<view style="font-size:26rpx;font-weight: bold;">美国红橡实木地板</view>
							<view style="font-size: 22rpx;">￥299.00</view>
						</view>
						<view class="odr_itm_name">
							<view style="font-size: 22rpx;">热销款实木地板平面拉丝工艺</view>
							<view style="font-size: 22rpx;color: #606266;">数量：1</view>
						</view>
					</viwe>
				</view>
				<!-- 付款信息 -->
				<view class='pay_view'>
					<view class="pay_item">
						<span>应付款：</span>
						<span style="color:#FF7C33">￥299.00</span>
					</view>
					<view class="btn_view">
						<view>取消订单</view>
						<view style="background:#FF7C33;color:white;border:1rpx solid #FF7C33;margin-left:24rpx;">付款</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default ({
		data() {
			return {
				searchValue:'',
				pageNo:1,
				list: [{
						name: "全部",
					},{
						name: "待付款",
					},
					{
						name: "待发货",
					},
					{
						name: "待收货",
					},
					{
						name: "待评价",
					},
				],
				//默认展开第几项
				current: 0,
			}
		},
		methods: {
			async change(index) {
				var that = this
			},
			cancel() {
				this.searchValue = ""
			},
			search() {
			
			},
			// 输入搜索
			input(e) {
				var that = this
				that.indexKey = e //关键词
				if (e == '') {
					that.pageNo = 1
					that.init()
				} else {
					that.search()
				}
			},
			init() {
				console.log('初始化事件')
			},
			
		},
		onLoad() {

		},
		onShow() {
			
		}

	})
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
	.my_tabs {
		background-color: #fff;
		overflow-x: auto;
	}
	
	::v-deep .my_tabs .u-tabs {
		width: 100%;
	}
	
	::v-deep .my_tabs .u-tabs .u-tabs__wrapper__nav__item {
		flex: 1;
		white-space: nowrap;
	}
	::v-deep .u-tabs__wrapper__nav__item__text{
		font-size:28rpx !important;
	}
	::v-deep .uni-searchbar__box-search-input{
		font-size:24rpx !important;
	}
	::v-deep .uni-searchbar__cancel{
		font-size:28rpx !important;
	}
	
	.order_item{
		width: 686rpx;
		height: 362rpx;
		background: #FFFFFF;
		border-radius: 12rpx;	
		margin-top:20rpx;
		display:flex;
		flex-direction: column;
		padding:28rpx;
		justify-content: space-around;
		margin-left:32rpx;
	}
	.shop_item{
		display:flex;
		width:100%;
		justify-content: space-between;
		align-items: center;
	}
	.shop_name{
		display:flex;
		align-items: center;
	}
	.shop_name img{
		width:58rpx;
		height: 58rpx;
		margin-right:26rpx;
	}
	.shop_name view{
		font-size: 26rpx;
		color: #000000;
	}
	.status{
		font-size: 26rpx;
		color: #FF7C33;
	}
	.order_dtl{
		height:142rpx;
		width:630rpx;
		display: flex;
	}
	.order_dtl img{
		height:142rpx;
		width:142rpx;
		border-radius:8rpx;
	}
	.order_dtl_right{
		width:448rpx;
		background: #F8F8FE;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		padding:20rpx 24rpx;
		border-bottom-right-radius: 8rpx;
		border-top-right-radius:8rpx;
	}
	.odr_itm_name, .pay_view,.btn_view{
		display:flex;
		justify-content: space-between;
		align-items: center;
	}
	.pay_item{
		font-size: 24rpx;
		color: #606266;
	}
	.btn_view view{
		width: 156rpx;
		height: 54rpx;
		background: #FFFFFF;
		border-radius: 27rpx;
		border: 1rpx solid #DBDBDB;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#606266;
		font-size: 24rpx;
	}
</style>