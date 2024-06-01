<template>
	<view class="big_view">
		<!-- 详情图 -->
		<view class="uni-margin-wrap">
			<swiper 
				class="swiper" 
				circular 
				:indicator-dots="true" 
				:autoplay="true" 
				:interval="2000"
				:duration="500">
				<swiper-item>
					<img src="../../static/img/heightI.jpg" class="swiper-item_img">
				</swiper-item>
				<swiper-item>
					<img src="../../static/img/heightI.jpg" class="swiper-item_img">
				</swiper-item>
				<swiper-item>
					<img src="../../static/img/heightI.jpg" class="swiper-item_img">
				</swiper-item>
			</swiper>
		</view>
		<!-- 图片选择金刚区 -->
		<view class="chang_detail">
			<view class="regionView">
				<view>平面图片</view>
				<view>效果图片</view>
				<view>视频</view>
				<view>全景图片</view>
				<view>3D图片</view>
			</view>
			<view class="segment"></view>
			<view class="floorView">
				<view v-for="(item,key) in floorArr" :key="key">{{item.num}}</view>
			</view>
		</view>
		<!-- 说明 -->
		<view class="tips">
			这个家没什么特别的，就是特别舒服！
		</view>
		<!-- 项目金刚区 -->
		<view class="project_view">
			<view v-for="(item,key) in list" :key="key" class="project_dtl" @click="onChangeCurrent(key)">
				<span :style="current == key?'color:#FF7C33':'color:#606266'">{{item.name}}</span>
				<view v-if="current == key" class="current_btn"></view>
			</view>
		</view>
		
		<!-- 项目详情 -->
		<view v-if="current == 0">
			<!-- 选择户型 -->
			<view class="unitType_view">
				<!-- 户型、面积、层数、单元 -->
				<view class="flex_view" style="margin-bottom:16rpx;">
					<view style="width:25%;">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">
								<span>{{array[index]}}</span>
								<img src="../../static/img/down.png" class="down">
							</view>
						</picker>
					</view>
					<view style="width:25%;">
						<input class="uni-input" v-model="area" type="digit" placeholder="面积(m²)" />
					</view>
					<view style="width:25%;">
						<picker @change="bindPickerChangeFloor" :value="floorindex" :range="floorArray">
							<view class="uni-input">
								<span>{{floorArray[floorindex]}}</span>
								<img src="../../static/img/down.png" class="down">
							</view>
						</picker>
					</view>
					<view style="width:25%;">
						<input class="uni-input" v-model="unit" placeholder="楼号/单元号" />
					</view>
				</view>
				<!-- 省市区 -->
				<view class="flex_view" style="justify-content: space-between;">
					<citySeled class="fs-30 col333" @change1="change1" :defaultValue="address"></citySeled>
					<view style="width:25%;">
						<input class="uni-input" v-model="community" placeholder="输入小区" />
					</view>
				</view>
				<!-- 要求 -->
				<view class="flex_view" style="overflow-x: auto;padding-top:25rpx;">
					<view class="yq_view" v-for="(item,key) in yqArr" :key="key" @click="onYqClick(key)">
						<span>{{item.name}}</span>
						<view class="del_btn" v-if="key != yqArr.length-1">
							<span>×</span>
						</view>
					</view>
				</view>
			</view>
			<!-- 选择角色 -->
			<view class="role">
				<view v-for="(item,key) in roleArr" :key="key" :style="{ backgroundColor: item.bgColor }" @click="onChangeRole(key)">
					<span>{{item.name}}</span>
					<view v-if="roleCurrent == key" class="roleV">√</view>
				</view>
				<view style="color:#FF7C33;border:1rpx solid #FF7C33" @click="onPushRole()">+</view>
			</view>
			<!-- 个人信息 -->
			<view class="unitType_view" style="margin-top:20rpx;">
				<!-- 姓名 体重 身高 出生年月日 -->
				<view class="flex_view" style="margin-bottom:20rpx;">
					<view style="width:25%;">
						<input class="uni-input" v-model="name" placeholder="姓名" />
					</view>
					<view style="width:25%;display:flex;align-items: center;">
						<input class="uni-input" v-model="height" type="digit" placeholder="身高" style="width:50%;"/>
						<span style="white-space: nowrap;font-size:28rpx">cm</span>
					</view>
					<view style="width:25%;display:flex;align-items: center;">
						<input class="uni-input" v-model="weight" type="digit" placeholder="体重" style="width:50%;"/>
						<span style="white-space: nowrap;font-size:28rpx">kg</span>
					</view>
					<view style="width:25%;">
						<view @click="onDataChange()" style="font-size:28rpx;color:#909399">{{birthday}}</view>
						<tui-datetime :type="2" ref="dateTime" @confirm="change"></tui-datetime>
					</view>
				</view>
				<!-- 颜色、风格、其他 -->
				<view class="flex_view" style="margin-bottom:26rpx;">
					<view style="width:50%;">
						<picker @change="bindPickerChangeColor" :value="colorindex" :range="colorArray">
							<view class="uni-input">
								<span>{{colorArray[colorindex]}}</span>
								<img src="../../static/img/down.png" class="down">
							</view>
						</picker>
					</view>
					<view style="width:25%;display:flex;align-items: center;">
						<picker @change="bindPickerChangeStyle" :value="styleindex" :range="styleArray">
							<view class="uni-input">
								<span>{{styleArray[styleindex]}}</span>
								<img src="../../static/img/down.png" class="down">
							</view>
						</picker>
					</view>
				</view>
				<!-- 其他嘱托 -->
				<view class="flex_view" style="margin-bottom:16rpx;">
					<view style="height:100rpx;width:100%;">
						<textarea class="uni-input" auto-height style="width:auto" v-model="remarks" placeholder="其他嘱托..."/>
					</view>
				</view>
				<!-- 上传图片 -->
				<view class="flex_view">
					<view class="example-body" style="padding:20rpx 20rpx 20rpx 0rpx;">
						<tui-upload @complete="result" @remove="remove" :value="rkPhoto" limit='6'></tui-upload>
					</view>
				</view>
			</view>
			
			<!-- 调查问卷 -->
			<view class="unitType_view" style="margin-top:20rpx;">
				<!-- 单选 -->
				<view class="QA_item">
					<view style="color:#606266;font-weight:600">
						<span style="font-size:44rpx">1</span>
						<span style="font-size:32rpx">/10</span>
					</view>
					<view style="display:flex;margin:30rpx 0rpx;">
						<view class="singleChoice">单选</view>
						<span style="font-size: 28rpx;color: #000000;">在装修过程中,应该什么时候开始做防水?</span>
					</view>
					<view>
						<radio-group class="uni-list" @change="radioChange">
							<view style="display:flex;margin-bottom:30rpx;" v-for="(item,index) in radioItems" :key="index">
								<view>
									<radio :id="item.name" :value="item.name" :checked="item.checked" style="transform: scale(0.7);"></radio>
								</view>
								<view>
									<label class="label-2-text" :for="item.name">
										<text style="font-size: 28rpx;">{{item.value}}</text>
									</label>
								</view>
							</view>
						</radio-group>
					</view>
				</view>
				<!-- 问答 -->
				<view class="QA_item">
					<view style="color:#606266;font-weight:600">
						<span style="font-size:44rpx">2</span>
						<span style="font-size:32rpx">/10</span>
					</view>
					<view style="display:flex;margin:30rpx 0rpx;">
						<view class="singleChoice" style="background:#3E97FF !important">问答</view>
						<span style="font-size: 28rpx;color: #000000;">在装修过程中,应该什么时候开始做防水?</span>
					</view>
					<view>
						<view style="height:200rpx;width:100%">
							<textarea class="uni-input" auto-height style="width:auto" v-model="remarks" placeholder="请输入文字（最多500字）"/>
						</view>
					</view>
				</view>
				<!-- 上传 -->
				<view class="QA_item">
					<view style="color:#606266;font-weight:600">
						<span style="font-size:44rpx">3</span>
						<span style="font-size:32rpx">/10</span>
					</view>
					<view style="display:flex;margin:30rpx 0rpx;">
						<view class="singleChoice" style="background:#FF49AB !important">上传</view>
						<span style="font-size: 28rpx;color: #000000;">在装修过程中,应该什么时候开始做防水?</span>
					</view>
					<view>
						<view class="example-body" style="padding:20rpx 20rpx 20rpx 0rpx;">
							<tui-upload @complete="result" @remove="remove" :value="rkPhoto" limit='6'></tui-upload>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 总概括 -->
		<view v-if="current == 1">
			<!-- 方案选择 -->
			<view class="fa_view">
				<view class="fa_item">
					<span style="font-size:28rpx;color:#FF7C33">方案一</span>
					<span style="font-size:28rpx;color:#FF7C33">223098元</span>
				</view>
				<view class="fa_item">
					<span style="font-size:28rpx">方案二</span>
					<span style="font-size:24rpx">223098元</span>
				</view>
				<view class="fa_item">
					<span style="font-size:28rpx">方案三</span>
					<span style="font-size:24rpx">223098元</span>
				</view>
			</view>
			<!-- 方案详情 -->
			<view class="fa_details">
				<view class="fa_change">
					<view v-for="(item,key) in faList" :key="key" class="fa_dtl" @click="onChangeFaCurrent(key)">
						<span :style="faCurrent == key?'color:#FF7C33':'color:#606266'">{{item.name}}</span>
						<view v-if="faCurrent == key" class="fa_current_btn"></view>
					</view>
				</view>
				<view class="fa_item_dtl">
					<view class="fa_data">
						<img src="../../static/img/diban.jpg" class="fa_img">
						<view>
							<span>投标</span>
							<span style="color:#FF5391">12</span>
							<span>家</span>
						</view>
						<view>
							<span>价格</span>
							<span style="color:#FF5391">12098</span>
							<span>元</span>
						</view>
					</view>
					<view class="fa_data">
						<img src="../../static/img/diban.jpg" class="fa_img">
						<view>
							<span>投标</span>
							<span style="color:#FF5391">12</span>
							<span>家</span>
						</view>
						<view>
							<span>价格</span>
							<span style="color:#FF5391">12098</span>
							<span>元</span>
						</view>
					</view>
					<view class="fa_data">
						<img src="../../static/img/diban.jpg" class="fa_img">
						<view>
							<span>投标</span>
							<span style="color:#FF5391">12</span>
							<span>家</span>
						</view>
						<view>
							<span>价格</span>
							<span style="color:#FF5391">12098</span>
							<span>元</span>
						</view>
					</view>
					<view class="fa_data">
						<img src="../../static/img/diban.jpg" class="fa_img">
						<view>
							<span>投标</span>
							<span style="color:#FF5391">12</span>
							<span>家</span>
						</view>
						<view>
							<span>价格</span>
							<span style="color:#FF5391">12098</span>
							<span>元</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 设计过程 -->
		<view v-if="current == 2">
			<view class="sjgc">
				<view class="sjgc_del">
					<!-- 信息详情 -->
					<view class="xxxq">
						<view class="xxxq_name">男主</view>
						<view class="xxxq_xx">
							<span>舒心家居装修项目旨在为客户提供个性化、高品质的家居装修服务。</span>
							<view class="xxxq_img_view">
								<img src="../../static/img/heightI.jpg">
								<img src="../../static/img/heightI.jpg">
							</view>
							<span style="font-size:24rpx;">发布于 2024.03.14</span>
						</view>
					</view>
					
					<view class="xxxq" style="margin-top:30rpx;">
						<view class="xxxq_name" style="height:168rpx;">设计师</view>
						<view class="xxxq_xx">
							<span>好的，效果图改好了</span>
							<view class="xxxq_img_view">
								<img src="../../static/img/heightI.jpg">
							</view>
							<span style="font-size:24rpx;">发布于 2024.03.14</span>
						</view>
					</view>
				</view>
				<!-- 其他嘱托 -->
				<view class="sjgc_del" style="margin-top:20rpx;">
					<!-- 其他嘱托 -->
					<view class="flex_view" style="margin-bottom:16rpx;">
						<view style="height:100rpx;width:100%;">
							<textarea class="uni-input" auto-height style="width:auto" v-model="remarks" placeholder="其他嘱托..."/>
						</view>
					</view>
					<!-- 上传图片 -->
					<view class="flex_view">
						<view class="example-body" style="padding:20rpx 20rpx 20rpx 0rpx;">
							<tui-upload @complete="result" @remove="remove" :value="rkPhoto" limit='6'></tui-upload>
						</view>
					</view>
				</view>
					
			</view>
		</view>
	</view>
</template>

<script>
	import citySeled from '@/pageCopy/components/biaofun-region/biaofun-region.vue'
	import tuiDatetime from "@/pageCopy/components/thorui/tui-datetime/tui-datetime.vue"
	import tuiUpload from "@/pageCopy/components/thorui/tui-upload/tui-upload"
	export default ({
		components: {
			citySeled,
			tuiDatetime,
			tuiUpload
		},
		data() {
			return {
				// 楼层
				floorArr:[{num:'1F'},{num:'2F'},{num:'3F'},{num:'4F'},{num:'5F'},{num:'6F'},{num:'7F'},{num:'8F'},{num:'9F'},{num:'10F'}],
				// 项目金刚区
				list: [{
						name: "项目详情",
					},
					{
						name: "总概括",
					},
					{
						name: "设计过程",
					}
				],
				faList:[{name: "五金",},{name: "洁具",},{name: "结构",},{name: "石材",},{name: "地板",},{name: "木门",},{name: "其他",}],
				faCurrent:4,
				// 项目金刚区
				yqArr: [{
						name: "户型图",
					},
					{
						name: "消防规范",
					},
					{
						name: "物业要求",
					},
					{
						name: "+",
					},
				],
				// 角色Arr
				roleArr:[{
						name: "男主",
						bgColor:'purple'
					},
					{
						name: "女主",
						bgColor:'#E95870'
					},
					{
						name: "儿子",
						bgColor:'#63D6FB'
					},
					{
						name: "女儿",
						bgColor:'#F5C346'
					}
				],
				roleCurrent:0,
				current:0,    //当前选中项目
				array: ['别墅', '叠拼', '高层', '其他'],
				index: 0,
				floorArray:['1层', '2层', '3层', '其他'],
				floorindex:0,
				colorArray:['莫兰迪色系', '蒙德里安色系', '孟菲斯色系', '马卡龙色系','洛可可色系'],
				colorindex:0,
				styleArray:['日式', '中式', '欧美', '哥特'],
				styleindex:0,
				area:'',   //面积
				unit:'',  //单元号
				address:[],       //省市区
				community:'',     //小区
				name:'',            //姓名
				height:'',        //身高
				weight:'',        //体重
				birthday:'出生年月日',      //生日
				remarks:"",               //其他嘱托。
				picurls: [],
				rkPhoto: [],
				radioItems: [{
						name: 'A',
						value: 'A. 先防水,再进行水电改造'
					},
					{
						name: 'B',
						value: 'B. 先做水电改造,再做防水',
						checked: 'true'
					},
					{
						name: 'C',
						value: 'C. 在铺贴瓷砖之前'
					},
					{
						name: 'D',
						value: 'D. 以上都不对'
					},
				],
			}
		},
		methods: {
			// 总概括切换
			onChangeCurrent(key){
				this.current = key
			},
			// 方案详情切换
			onChangeFaCurrent(key){
				this.faCurrent = key
			},
			// 类型更改
			bindPickerChange: function(e) {
			    this.index = e.detail.value
			},
			// 楼层更改
			bindPickerChangeFloor: function(e) {
			    this.floorindex = e.detail.value
			},
			// 颜色更改
			bindPickerChangeColor: function(e) {
			    this.colorindex = e.detail.value
			},
			// 风格更改
			bindPickerChangeStyle: function(e) {
			    this.styleindex = e.detail.value
			},
			// 省市区修改
			change1(event) {//选择地址
				let arr=[];
				event.forEach(one => {
					arr.push(one.name)
				})
				this.address = arr;
			},
			// 具体要求点击事件
			onYqClick(key){
				if(key == this.yqArr.length -1){
					// 添加
					var that = this
					uni.showModal({
						title: '新增需求',
						content: '',
						editable: true,
						placeholderText: '请输入需求',
						showCancel: true,
						success: (res) => {
							if (res.confirm) {
								that.yqArr.splice(that.yqArr.length - 1, 0, {name:res.content});
							}
						}
					});
				}else{
					// 删除
					var that = this
					uni.showModal({
						content:'确定要删除该需求吗？',
						success: (res) => {
							if (res.confirm) {
								that.yqArr.splice(key,1)
							}
						}
					})
				}
			},
			// 添加角色
			onPushRole(){
				var that = this
				uni.showModal({
					title: '新增角色',
					content: '',
					editable: true,
					placeholderText: '请输入角色',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.roleArr.push({
								name:res.content,
								bgColor:'pink'
							});
						}
					}
				});
			},
			// 切换角色
			onChangeRole(key){
				this.roleCurrent = key
			},
			onDataChange(){
				var that = this
				that.$refs.dateTime.show();
			},
			change: function(e) {
				//选择的结果
				var that=this
				that.birthday = e.result
			},
			// 添加图片
			result(e) {
				let pics = []
				let token = uni.getStorageSync('token') ? uni.getStorageSync('token') : ''; //用户的token
				let httpUrl = this.$tools.httpUrl
				if (e.status == 2) {
					for (let i = 0; i < e.imgArr.length; i++) {
						let tempFilePaths = e.imgArr[i]
						uni.uploadFile({
							url: httpUrl + '/api/common/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths,
							name: 'file',
							header: {
								token: token
							},
							formData: {
								file: tempFilePaths,
								category: 'jcb_user'
							},
							success: (uploadFileRes) => {
								let result = JSON.parse(uploadFileRes.data)
								if (result.code == 1) {
									if (this.picurls.indexOf(result.data.url) == -1) {
										this.picurls.push(result.data.url)
										this.rkPhoto.push(result.data.fullurl)
									} else {
										return
									}
								}
							}
						});
					}
				}
			},
			// 删除图片
			remove(e) {
				this.picurls.splice(e.index, 1);
				this.rkPhoto.splice(e.index, 1);
			},
			// 问卷单选
			radioChange(e) {
			    var checked = e.target.value
			    var changed = {}
			    for (var i = 0; i < this.radioItems.length; i++) {
			        if (checked.indexOf(this.radioItems[i].name) !== -1) {
			            changed['radioItems[' + i + '].checked'] = true
			        } else {
			            changed['radioItems[' + i + '].checked'] = false
			        }
			    }
			}
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
	.big_view{
		padding:32rpx;
	}
	.swiper {
		height: 784rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.swiper-item_img {
		display: block;
		width:100%;
		height: 784rpx;
		overflow: show !important;
	}
	.chang_detail{
		width: 686rpx;
		height: 183rpx;
		background: #FFFFFF;
		border-radius: 28rpx 28rpx 28rpx 28rpx;
		margin-top:23rpx;
		padding:0rpx 28rpx;
	}
	.regionView,.floorView{
		height:92rpx;
		display:flex;
		align-items: center;
		overflow-x: auto;
	}
	.regionView view{
		margin-right:106rpx;
		font-size:26rpx;
		white-space: nowrap;
	}
	.floorView view{
		margin-right:40rpx;
		font-size:28rpx;
		white-space: nowrap;
	}
	.segment{
		width:100%;
		height:1rpx;
		background: #F2F3F5;
	}
	.tips{
		font-size:34rpx;
		margin:28rpx 0rpx;
		color: #000000;
	}
	.project_view{
		width: 686rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin:20rpx 0rpx;
		line-height:90rpx;
		display:flex;
		overflow-x: auto;
	}
	.project_view .project_dtl{
		white-space: nowrap;
		/* margin:0rpx 48rpx; */
		width:33%;
		text-align: center;
		position:relative;
	}
	.fa_dtl{
		white-space: nowrap;
		position:relative;
		height:100%;
		line-height: 83rpx;
	}
	.project_dtl span{
		font-size: 30rpx;
	}
	.current_btn,.fa_current_btn{
		position:absolute;
		bottom:16rpx;
		left:30%;
		width: 40%;
		height: 8rpx;
		background: #FF7C33;
		border-radius: 6rpx;
	}
	.fa_current_btn{
		width: 100%;
		left:0%;
		height: 4rpx;
		bottom:0rpx !important;
	}
	.unitType_view{
		width: 686rpx;
		background:white;
		padding:30rpx 32rpx;
		border-radius:20rpx;
		display:flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.uni-input{
		font-size: 28rpx;
		color:#000000;
	}
	.down{
		width: 24rpx;
		height: 15rpx;
		position:relative;
		bottom:2rpx;
		left:12rpx;
	}
	.flex_view{
		display:flex;
		align-items: center;
	}
	.yq_view{
		padding:0rpx 17rpx;
		height: 56rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		border: 1rpx solid #FF7C33;
		color:#FF7C33;
		font-size: 26rpx;
		line-height:56rpx;
		text-align: center;
		margin-right:20rpx;
		white-space: nowrap;
		position:relative;
	}
	.del_btn{
		height:30rpx;
		width:30rpx;
		position:absolute;
		top:-15rpx;
		right:-10rpx;
		background:red;
		display: flex;
		justify-content: center;
		align-items: center;
		color:white;
		font-size:22rpx;
		border-radius: 50%;;
	}
	.role{
		width: 686rpx;
		height: 132rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display:flex;
		align-items: center;
		overflow-x: auto;
		margin-top:20rpx;
		padding-left:36rpx;
	}
	.role view{
		height:82rpx;
		min-width:82rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		color:white;
		font-size:32rpx;
		font-weight:600;
		border-radius:50%;		
		white-space: nowrap;
		margin-right:54rpx;
		position:relative;
	}
	.roleV{
		position:absolute !important;
		background:rgba(0,0,0,0.6) !important;
		top:0rpx;
		left:0rpx;
		font-size:40rpx !important;
		color:white !important;
	}
	.singleChoice{
		width: 72rpx;
		height: 39rpx;
		background: #28D165;
		border-radius: 7rpx 7rpx 7rpx 7rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		font-size: 22rpx;
		color:white;
		margin-right:14rpx;
	}
	.QA_item{
		border-bottom:1rpx solid #F2F3F5;
		margin-bottom:20rpx;
	}
	.fa_view{
		width: 686rpx;
		height: 133rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		display: flex;
		overflow-x: auto;
		align-items: center;
	}
	.fa_item{
		display:flex;
		width:230rpx;
		height:100%;
		padding:14rpx 0rpx;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.fa_details{
		width: 686rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		margin-top: 20rpx;
	}
	.fa_change{
		height:83rpx;
		width:100%;
		padding-left:54rpx;
		overflow-x: auto;
		display: flex;
		align-items: center;
		border-bottom:1rpx solid #F2F3F5;
	}
	.fa_change view{
		font-size: 28rpx;
		color: #606266;
		margin-right:54rpx;
		white-space: nowrap;
	}
	.fa_item_dtl{
		display:flex;
		flex-wrap: wrap;
		width:100%;
	}
	.fa_data{
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		width:33%;
		height:252rpx;
		margin-top:20rpx;
		align-items: center;
	}
	.fa_img{
		height:108rpx;
		width:108rpx;
	}
	.fa_data view{
		font-size: 26rpx;
		color: #909399;
	}
	.sjgc{
		width: 686rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding:20rpx;
		margin-top:20rpx;
	}
	.sjgc_del{
		width: 646rpx;
		background: #F6F8FC;
		border-radius: 12rpx;
		padding:28rpx;
	}
	.xxxq{
		display:flex;
	}
	.xxxq_name{
		width:56rpx;
		height:120rpx;
		padding:20rpx 0rxp;
		display:flex;
		/* justify-content: center; */
		align-items: center;
		flex-wrap: wrap;
		font-weight: bold;
		font-size: 28rpx;
		color: #FFFFFF;
		background:#6554F5;
		border-radius: 40rpx;
		writing-mode: vertical-rl; /* 文字从上到下，从右到左 */
		margin-right:22rpx;
		letter-spacing: 20rpx;
		padding-top: 26rpx;
	}
	.xxxq_xx{
		width:520rpx;
		display:flex;
		color:#606266;
		flex-direction: column;
		font-size:26rpx;
	}
	.xxxq_img_view{
		display:flex;
		flex-wrap: wrap;
		margin:18rpx 0rpx;
	}
	.xxxq_img_view img{
		height: 172rpx;
		width: 172rpx;
		border-radius:8rpx;
		margin-right:6rpx;
	}
</style>