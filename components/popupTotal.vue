<template>
	<view>
		<view :class="showPopup?'popup_container':''" @click="pageDetail(1)" @touchmove.stop.prevent="pageDetail(2)">
			<view v-if="popupType=='top'"
				:style="[
					{top:topDistance},
					{width:widthPage},
					{height:heightPage}
				]"
				@click.stop="pageDetail(2)"
				:class="[
					showPopup?'popup_window_top_yes':'popup_window_top_none'
				]"
				class="popup_window">
				<view class="relative">
					<slot/>
				</view>
			</view>
			<view v-else-if="popupType=='right'"
				:style="[
					{right:rightDistance},
					{width:widthPage},
					{height:heightPage}
				]"
				@click.stop="pageDetail(2)"
				:class="[
					showPopup?'popup_window_right_yes':'popup_window_right_none'
				]"
				class="popup_window">
				<view class="relative">
					<slot/>
				</view>
			</view>
			<view v-else-if="popupType=='bottom'"
				:style="[
					{bottom:bottomDistance},
					{width:widthPage},
					{height:heightPage}
				]"
				@click.stop="pageDetail(2)"
				:class="[
					showPopup?'popup_window_bottom_yes':'popup_window_bottom_none'
				]"
				class="popup_window">
				<view class="relative">
					<slot/>
				</view>
			</view>
			<view v-else-if="popupType=='left'"
				:style="[
					{left:leftDistance},
					{width:widthPage},
					{height:heightPage}
				]"
				@click.stop="pageDetail(2)"
				:class="[
					showPopup?'popup_window_left_yes':'popup_window_left_none'
				]"
				class="popup_window">
				<view class="relative">
					<slot/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// const APP = getApp().globalData;
	const rmationInfo = uni.getSystemInfoSync();//设备信息
	export default {
		data() {
			return {
				
			}
		},
		props:{
			popupType:{//弹出方向
				type:[String,String],
				default: 'bottom'
			},
			showPopup:{//是否显示弹窗
				type:[Boolean,String],
				default: false
			},
			topDistance:{//距离上的距离
				type:[String,String],
				// #ifndef H5
				default: '0rpx'
				// #endif
				// #ifdef H5
				default: '88rpx'
				// #endif
			},
			rightDistance:{//距离右的距离
				type:[String,String],
				default: '0rpx'
			},
			bottomDistance:{//距离下的距离
				type:[String,String],
				// #ifndef H5
				default: '0rpx'
				// #endif
				// #ifdef H5
				default: '100rpx'
				// #endif
			},
			leftDistance:{//距离左的距离
				type:[String,String],
				default: '0rpx'
			},
			widthPage:{//弹窗宽度
				type:[String,String],
				default: '750rpx'
			},
			heightPage:{//弹窗高度
				type:[String,String],
				default: 'auto'
			},
		},
		methods:{
			pageDetail(type) {
				if(type==1) {//管理弹窗
					this.$emit('showSelectPopup',1);
				} else if(type==2) {//防止事件冒泡
					
				}
			}
		}
	}
</script>

<style>
	.popup_container {
		position: fixed;
		top: 0rpx;left: 0rpx;right: 0rpx;bottom: 0rpx;
		width: 100%;height: 100%;
		background-color: rgba(0,0,0,0.5);
		z-index: 990;
	}
	.popup_window {
		position: fixed;
		background-color: #FFFFFF;
		transition: all 1s;
		z-index: 990;
	}
	.popup_window_bottom_yes{
		transform: translateY(0%);
	}
	.popup_window_bottom_none{
		transform: translateY(150%);
	}
	.popup_window_top_yes {
		transform: translateY(0%);
	}
	.popup_window_top_none {
		transform: translateY(-100%);
	}
</style>
