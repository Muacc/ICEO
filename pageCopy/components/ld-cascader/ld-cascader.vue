<template>
	<view class="main">
		<input @click="showModal" v-model="_showValue" :style="disabled?'color:#c0c4cc':''" :placeholder="placeholder" disabled style="font-size: 28rpx;text-align: right;flex: 1;"/>
		<!-- <view class="input" :style="disabled?'background-color:#f5f7fa':''">
			<input @click="showModal" v-model="_showValue" :style="disabled?'color:#c0c4cc':''" :placeholder="placeholder" disabled style="font-size: 24rpx;"/>
			<text v-if="clearable&&!disabled" @click="empty" class="selectIcon iconcross"></text>
		</view> -->
		<view class="select-modal" :class="isShowModal?'show':''" @tap="hideModal">
			<view class="select-dialog" @tap.stop="" :style="{backgroundColor:bgColor}">
				<view class="select-bar bg-white">
					<view class="title">请选择</view>
					<text class="selectIcon iconcross" @tap="hideModal"></text>
				</view>
				<view v-if="_value" class="select-val bg-white">
					<view @tap="selectSwitch(index)" class="item" 
					:class="index === selectIndex?'select':''" v-for="(item,index) in _value" 
					:style="index === selectIndex?'border-color: '+selectColor+';':''"
					:key="index">
						<view :style="index === selectIndex?'color:'+selectColor+';':''">{{item}}</view>
					</view>
				</view>
				<view class="select-content">
					<view class="select-item" v-for="(item,index) in _list" :key="index"
					:style="valueIndexOf(item)?'color:'+selectColor+';background-color:'+selectBgColor+';':'color:'+color+';'"
					 @click="select(item,index)">
						<view class="title">{{getLabelKeyValue(item)}}</view>
						<text class="selectIcon icongou" v-if="valueIndexOf(item)"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowModal:false,
				isLast: false,
				selectIndex: 0,
				isSwitch: false,
				getChildren:null,
				getChildrenT:null,
				selTit:0,
				dataDetail:[]
			}
		},
		props: {
			value:{
				default: () => [],
				type: Array
			},
			placeholder:{ // 占位符
				default:"",
				type: String
			},
			list: {
				default: () => [],
				type: Array
			},
			valueKey:{ // 指定list中valueKey的值作为下拉框绑定内容
				default: 'value',
				type: String
			},
			labelKey:{ // 指定list中labelKey的值作为下拉框显示内容
				default: 'name',
				type: String
			},
			disabled: {
				default: false,
				type: Boolean
			},
			clearable:{
				default: false,
				type: Boolean
			},
			color:{
				default: "#000000",
				type: String
			},
			selectColor:{
				default: "#0081ff",
				type: String
			},
			bgColor:{
				default: "#F1F1F1",
				type: String
			},
			selectBgColor:{
				default: "#FFFFFF",
				type: String
			}
		},
		watch: {
		    selectIndex(newVal) {
				if(newVal < this.value.length -1) {
					this.isSwitch = true
				} else {
					this.isSwitch = false
				}
		    }
		},
		computed: {
			_value: {
				get() {
					return this.get_value()
				},
				set(val) {
					
				}
			},
			_showValue: {
				get() {
					return this.get_showValue()
				},
				set(val) {
					
				}
			},
			_list: {
				get() {
					let list = this.list
					for (let i = 0; i < this.value.length; i++) {
						if(this.isSwitch && i === this.selectIndex){
							return list
						}
						let item = this.value[i]
						let choose = list.find(temp => {
							return this.getValueKeyValue(temp) === item
						})
						if(choose.children && choose.children.length > 0) {
							list = choose.children
						}
					}
						
						
					return list
				},
				set(val) {
					
				}
				
			}
		},
		created() {
		},
		methods: {
			get_value() { 
				let val = this.value
				let chooseAttr = []
				let list = this.list
				val.forEach(item=>{
					let choose = list.find(temp => {
						return this.getValueKeyValue(temp) === item
					})
					chooseAttr.push(choose)
					if(choose.children && choose.children.length > 0) {
						list = choose.children
					}
				})
				return chooseAttr.map(temp => this.getLabelKeyValue(temp))
			},
			get_showValue() { // 将数组值转换为以 / 隔开的字符串
				var that=this
				console.log(this.get_value().join('/'),"---------")
				let detail=this.get_value().join('/')
				that.$emit("addressDetail",detail)
				// setTimeout(()=>{
					return this.get_value().join('/')
				// },1000)
			},
			select(item,index){ // 点击选项
				let val = this.getValueKeyValue(item)
				if(this.selTit==0&&this.getChildrenT!=null){
					this.getChildrenT=null
					this.getChildren=null
				}else if(this.selTit==0&&this.getChildrenT==null){
					this.getChildrenT=null
				}
				else if(this.selTit==1){
					this.getChildrenT=null
				}
				this.selTit++
				if(this.getChildren==null){
					this.getChildren=item.value
				}else{
					this.getChildrenT=item.value
				}
				if(this.getChildrenT!=null){
					var urls='/api/area/index?province='+this.getChildren+'&city='+this.getChildrenT
				}else{
					var urls='/api/area/index?province='+this.getChildren
				}
				this.$tools.axiosFromTokenNew('GET', urls,{
				})
				.then(res => {
					// this._list[0]=res.data
					console.log("res=====",res)
					console.log("index=====",index)
					this._list[index].children=res.data
					console.log("res=====",this._list[index].name)
					if(res.data.length!=0){
						this.dataDetail=res.data
					}else{
						console.log("22",this.dataDetail[index])
						this.$emit("latitudeGet",this.dataDetail[index].latitude)
						this.$emit("longitudeGet",this.dataDetail[index].longitude)
					}
				
					// list=res.data
				})
				setTimeout(()=>{
					let choose = this._list.find(temp => {
						return this.getValueKeyValue(temp) === val
					})
					let _val = this.value
					if(this.selectIndex < _val.length - 1) {
						_val = _val.splice(0,this.selectIndex)
						this.isSwitch = false
					}
					if(choose.children && choose.children.length > 0) {
						this.isLast = false
						_val.push(val)
						this.setInput(_val)
					} else {
						if(this.isLast) {
							_val.pop()
						} else {
							this.isLast = true
						}
						_val.push(val)
						this.setInput(_val)
						this.hideModal()
					}
				},500)
				
			},
			valueIndexOf(item) {
				let val = this.getValueKeyValue(item)
				return this.value.indexOf(val) != -1
			},
			getLabelKeyValue(item){ // 获取label
				return item[this.labelKey]
				
			},
			getValueKeyValue(item){ // 获取value
				return item[this.valueKey]
			},
			selectSwitch(index) {
				this.selTit=index
				let val = this.value[index]
				this.selectIndex = index
			},
			empty(){ // 清空
				this.setInput([])
			},
			setInput(val){
				this.$emit('change', val)
				this.$emit('input', val)
				this.selectIndex = this.value.length - 1
			},
			showModal(){ // 显示model
				if(!this.disabled){
					this.isShowModal = true
					this.$emit('visible-change', true)
				}
			},
			hideModal(){ // 隐藏model
				this.isShowModal = false
				this.$emit('visible-change', false)
			}
		}
	}
</script>
<style>	
	@font-face {font-family: "selectIcon";
	  src: url('//at.alicdn.com/t/font_1833441_ycfzdhg2u3.eot?t=1590375117208'); /* IE9 */
	  src: url('//at.alicdn.com/t/font_1833441_ycfzdhg2u3.eot?t=1590375117208#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMEAAsAAAAABvQAAAK4AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBRIFCATYCJAMMCwgABCAFhQUHNRsfBsg+QCa3uoO0oAJTMwhxVu965keqWBy1hkbwtfzWb2Z279/shRhJisKF6FApKLI7oyBbpAaHo3w24k+ca9EUJbDmjaeznUdZ/FOUlkWdJ33rizZY/Pw6J5Xw0qKYxHTMesePHVT6EFpaC4zV70sKi2bYgNPc1w0WHnDVC/e/UnNTgyP+4Jq6BBpIHoisgypLaIAFEtU0wgeaIG8Yu4nAIZwnUK1QgFfOT6nUUoBpgXjj2lqplTMpiuXtCW3N2iK+aPTS2/Qdnzny8d+5IEiaDMy99exklra//FrKnX48pChmgrq5QcYRQCEe17ruqgqLAKv8WntwqwhpLms/nB5yW/iHRxJEC0QOgT3NnfgF01NBKvOuIzNoZdh5gJuAeGrsozE8vOJ7u5D832oz55039W5G+S52K0H+zNf1TJz07k26kqoQybRfwVFV4rjDS/K8EXUyuF1cXnT3weKS9Rvdm/xe7h8oA1hLwOR18R+Y4n4zwpr4z5SU089Vc+cpfWL+mn5APmT3Z39jeOs/GbWjK+DnmsuL/u6ehMX4j4yedSVkAUUuPh3TY022MtKZUEOtPqCb8Bkvnr5XT6imU0gGrEJW7aAL/gw0OhegVV2F6pC7uTOppirKIA4MFQhTrpCM+AbZlDu64L/QmAkQWlMhQXU75D07O9Gtl0PUYjTBLyAzOLNQYtypIEEjvsXtBLQTooV2nrQrGEau2gKmZlR4L8gwnGtBJbUn1diCOOQUnEkTkRAOeci9KHOQxvFro+tx3ZcGAaeljstCSBNDJuArgIyBYyy6OdZxAhHIELu1IC9AtgShCVtLltEKrSff1XoHJo3RC33hM63o3j6pSNkmqmIWEAtxFHB2OwoRBAfyeqE3r2ogHeF42dBhs7gvf7CukH5MmlUGOCpHihxFfs6TehDyKCqVAA==') format('woff2'),
	  url('//at.alicdn.com/t/font_1833441_ycfzdhg2u3.woff?t=1590375117208') format('woff'),
	  url('//at.alicdn.com/t/font_1833441_ycfzdhg2u3.ttf?t=1590375117208') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('//at.alicdn.com/t/font_1833441_ycfzdhg2u3.svg?t=1590375117208#selectIcon') format('svg'); /* iOS 4.1- */
	}
	page{
		font-size: 24rpx;
	}
	.selectIcon {
	  position: absolute;
	  right: 16rpx;
	  font-family: "selectIcon" !important;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icongou:before {
	  content: "\e61c";
	}
	
	.iconcross:before {
	  content: "\e61a";
	}

</style>
<style lang="scss" scoped>
	.main{
	}
	.bg-white{
		background-color: #FFFFFF;
	}
	.input {
		display: flex;
		align-items:center;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
	}
	.select-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: -8rpx;
		left: 0;
		z-index: 9999;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000rpx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
		margin-bottom: -1000rpx;
		&::before {
			content: "\200B";
			display: inline-block;
			height: 100%;
			vertical-align: bottom;
		}
		.select-dialog {
			position: relative;
			display: inline-block;
			margin-left: auto;
			margin-right: auto;
			background-color: #f8f8f8;
			overflow: hidden;
			width: 100%;
			border-top-left-radius: 32rpx;
			border-top-right-radius: 32rpx;
			.select-content{
				text-align: left;
				padding: 20rpx;
				background-color: #FFFFFF;
				min-height: 520rpx;
				max-height: 520rpx;
				overflow:auto;
				.select-item{
					position: relative;
					padding: 20rpx;
					display: flex;
					.title{
						flex: 1;
					}
				}
			}
		}
	}
	.select-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
		margin-bottom: 0;
	}
	.select-bar {
		padding: 0 20rpx;
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100rpx;
		justify-content: center;
		.title {
			font-weight: bold;
			display: flex;
			align-items: center;
			height: 100%;
			justify-content: center;
			max-width: 100%;
		}
	}
	.select-val {
		display: flex;
		width: 750rpx;
		white-space:nowrap;
		overflow-x: scroll;
		width: 100%;
		padding: 20rpx 20rpx 0 20rpx;
		border-bottom-style: solid;
		border-bottom-width: 1rpx;
		border-color: #e8eaed;
		.item {
			padding-left: 10rpx;
			padding-right: 10rpx;
			padding-bottom: 10rpx;
		}
		.select {
			border-bottom-style: solid;
			border-bottom-width: 3rpx;
		}
	}
</style>
