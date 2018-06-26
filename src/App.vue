<template>
	<div id="app">
		<div class="menu-wrapper">
			<ul>
				<li v-for="(item,index) in levelArray" :class="{'active': activeIndex === index}" @click="tabClick(item,index)">{{item}}</li>
			</ul>
		</div>

		<ul class="list bot">
			<li v-for="(item,index) in botArray" @click="show(index)" :class="{'active': oIndex == index}">
				<span>Q{{index+1}}</span>{{item.nickName}}
				<div class="bot-content" v-show="oIndex == index">
					<ul>
						<li>
							<div>头像</div>
							<div class="icon"><img :src="item.headimgurl" alt="" /></div>
						</li>
						<li>
							<div>姓名</div>
							<div>{{item.nickName}}</div>
						</li>
						<li>
							<div>电话</div>
							<div>{{item.phone}}</div>
						</li>
					</ul>
				</div>
			</li>
		</ul>
		<p v-show="botArray.length === 0" style="text-align: center;color: #e1e1e1;height: 40px;line-height: 40px;">暂无数据...</p>
	</div>
</template>

<script>
	import { UserInfo, Top, Bot } from './components/api/user'
	import { getQueryString, ShowToast, Loading } from './components/api/common'

	export default {
		name: 'App',

		data() {
			return {
				parentId: '',

				openId: '',
				//openId: 'oKDYO1Ut6llB3R9qd4MHyy9F5Ous',
				isBot: false,
				botArray: [],
				oIndex: -1,

				levelArray: ['创始投资人', '一级合伙人', '二级合伙人', '金钻VIP'],
				activeIndex: 0,
				proportion: 5,

			}
		},
		methods: {
			show(index) {
				this.oIndex = index;
			},
			tabClick(item, index) {
				this.activeIndex = index;
				if(index === 0) {
					this.proportion = 5;
					this.getBot();
				}
				if(index === 1) {
					this.proportion = 1;
					this.getBot();
				}
				if(index === 2) {
					this.proportion = 2;
					this.getBot();
				}
				if(index === 3) {
					this.proportion = 3;
					this.getBot();
				}
			},
			getBot() {
				Bot(this.parentId, this.proportion).then(res => {
					console.log(res);
					Loading(true);
					if(res.data.code === 0) {
						this.isBot = true;
						this.botArray = res.data.data;
					}
				}).catch(res => {
					Loading(true);
				})
			}
		},
		created() {
			this.openId = getQueryString('openId');
			if(this.openId == null) {
				window.location.href = 'http://www.argesz.com/yazhe/common/author?type=4';
			}
		},
		mounted() {
			Loading();
			UserInfo(this.openId).then(res => {
				if(res.data.code === 0) {
					let data = res.data.data;
					this.parentId = data.id;
					this.getBot();
				}
			}).catch(res => {
				Loading(true);

			})
		}
	}
</script>

<style scoped>
	html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video {
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	
	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	menu,
	nav,
	section {
		display: block;
	}
	
	body {
		line-height: 1;
	}
	
	ol,
	ul {
		list-style: none;
	}
	
	blockquote,
	q {
		quotes: none;
	}
	
	blockquote:before,
	blockquote:after,
	q:before,
	q:after {
		content: '';
		content: none;
	}
	
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	
	html,
	body {
		height: 100%;
		background: #eee;
	}
	
	.city-popup {
		width: 100%;
	}
	
	.cancle-confrim {
		display: flex;
		text-align: right;
		padding: 10px;
	}
	
	.cancle-confrim>div {
		flex: 1;
	}
	
	.cancle-confrim>div:nth-of-type(1) {
		text-align: left;
	}
	
	.icon {
		display: block;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		overflow: hidden;
	}
	
	img {
		width: 30px;
		height: 30px;
	}
	
	.list>li {
		height: auto;
		line-height: 34px;
		border-bottom: 1px solid #e1e1e1;
		padding: 0 15px;
		color: #333;
		font-size: 16px;
		position: relative;
	}
	
	.list.bot>li {
		height: 34px;
	}
	
	.list.bot>li.active {
		height: auto;
	}
	
	.list>li::after {
		position: absolute;
		content: "";
		width: 15px;
		height: 8px;
		background: url('./assets/throw-bot.png') no-repeat center center;
		background-size: 15px 8px;
		right: 15px;
		top: 12px;
	}
	
	.list.top>li::after {
		background: url('./assets/top.png') no-repeat center center;
		background-size: 15px 8px;
		right: 15px;
		top: 12px;
	}
	
	.list.bot>li.active::after {
		background: url('./assets/top.png') no-repeat center center;
		background-size: 15px 8px;
	}
	
	.list>li>span {
		color: #ff9702;
	}
	
	.bot-content>ul li {
		height: 40px;
		line-height: 40px;
		display: flex;
		color: #666;
		font-size: 13px;
		margin: 0 15px 0 22px;
		border-bottom: 1px solid #E1E1E1;
	}
	
	.bot-content>ul li:nth-of-type(1) {
		border-top: 1px solid #e1e1e1;
	}
	
	.bot-content>ul li:nth-of-type(3) {
		border-bottom: none;
	}
	
	.bot-content>ul li>div:nth-of-type(1) {
		flex: 1;
	}
	
	.icon {
		flex: 0 0 30px;
		width: 30px;
		height: 30px;
		border-radius: 100%;
		overflow: hidden;
		text-align: right;
		margin-top: 4px;
	}
	
	.icon img {
		display: inline-block;
	}
	
	.goods {
		position: absolute;
		top: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.menu-wrapper {
		border-bottom: 1px solid #e1e1e1;
	}
	
	.menu-wrapper ul {
		display: flex;
		width: 100%;
	}
	
	.menu-wrapper ul li {
		flex: 0 0 25%;
		width: 25%;
		text-align: center;
		box-sizing: border-box;
		height: 40px;
		line-height: 40px;
		color: #666;
		font-size: 13px;
		position: relative;
	}
	
	.menu-wrapper ul li.active {
		color: #ff9702;
	}
	
	.menu-wrapper ul li.active:before {
		content: "";
		width: 35px;
		height: 2px;
		position: absolute;
		left: 50%;
		margin-left: -17px;
		bottom: 0;
		background: #ff9702;
	}
</style>