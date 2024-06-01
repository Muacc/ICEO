<template>
	<view v-if="show" class="model">
		<view class="cov">
			<view style="font-size:32rpx;">请详细阅读并同意<br />
				<span style="color:#108EEF"
					@click="pageToolJump('/pageCopy/my/contract?type=yonghuxieyi')">《用户协议》</span>
				和
				<span style="color:#108EEF"
					@click="pageToolJump('/pageCopy/my/contract?type=yinsizhengce')">《隐私政策》</span>
			</view>
			<view class="cov_btn">
				<view class="btn" @click="close()"
					style="background:white;color:#333333;border:1rpx solid #ccc">不同意</view>
				<button class="btn" @click="onNext()">同意并继续</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'to-agree',
		props: {
			showModel:{
				type:Boolean,
				default:false,
			},
		},
		data() {
			return {
				show:false,
			};
		},
		watch:{
			showModel(value){
				console.log(value)
				if(value){
					this.show = true;
				}else{
					this.close();
				}
			}	
		},
		methods: {
			// 关闭弹窗
			close(){
				this.show = false
				this.$parent.showModel = false
			},
			pageToolJump(url) { //工具栏
				this.$tools.goNext(url);
			},
			onNext(){
				this.$parent.onNext()
			}
		}
	}
</script>

<style>
	.model {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		position: absolute;
		box-shadow: 0rpx 0rpx 5rpx black;
		top: 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.cov {
		padding: 30rpx 0rpx;
		z-index: 1100;
		width: 600rpx;
		height: 300rpx;
		background-color: white;
		position: fixed;
		box-shadow: 0rpx 0rpx 15rpx black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		border-radius: 20rpx;
	}
	
	.cov_btn {
		height: 70rpx;
		display: flex;
		width: 100%;
		padding: 0rpx 24rpx;
		justify-content: space-around;
	}
	
	.btn {
		height: 86rpx;
		width: 250rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #108eef;
		font-size: 34rpx;
		color: white;
		padding: 30rpx 0;
	}
</style>