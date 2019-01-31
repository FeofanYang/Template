// 图片组件
Vue.component('f-img', {
	template: `<img v-if="image" :src="image.src" :style="setStyle"></img>`,
	props: {
		image: Object,
		origin: { type: Boolean, default: false },
		center: { type: Boolean, default: false },
		middle: { type: Boolean, default: false }
	},
	computed: {
		setStyle: function () {
			let style = {};
			if (!this.origin) {
				style.width = this.image.width / 100 + 'rem';
			}
			if (this.center) {
				style.position = 'absolute';
				style.left = '50%';
				style.width = this.image.width / 100 + 'rem';
				style.marginLeft = -this.image.width / 200 + 'rem';
			}
			if (this.middle) {
				style.position = 'absolute';
				style.top = '50%';
				style.height = this.image.height / 100 + 'rem';
				style.marginTop = -this.image.height / 200 + 'rem';
			}
			return style;
		}
	}
});
// 弹出层组件
Vue.component('popup', {
	template: `
		<transition name="fade">
			<div v-if="curVisible" @click="setVisible=false" class="mask--popup">
				<div :style="wrapStyle">
					<img v-if="image" :src="ImageSrc" style="width:100%;">
					<div v-if="text" v-text="text" style="margin-top:.1rem;color:#fff;text-align:center;"></div>
				</div>
			</div>
		</transition>
	`,
	props: {
		visible: { type: Boolean, default: true },
		closable: { type: Boolean, default: true },
		position: {
			default: 5,
			validator: function (value) {
				return [1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(value) !== -1;
			}
		},
		offset: { type: [String, Number], default: 0 },
		width: { type: [String, Number], default: '4rem' },
		image: { type: [Object, String] },
		text: { type: String }
	},
	data() {
		return {
			setVisible: null,
		}
	},
	computed: {
		curVisible: function () {
			if (typeof this.setVisible === 'boolean' && this.closable) {
				return this.setVisible;
			} else {
				return this.visible;
			}
		},
		wrapStyle: function () {
			let style = {
				position: 'absolute',
				width: this.width
			}
			if (typeof this.image === 'boolean') {
				style.width = this.image.width / 100 + 'rem';
			}
			let offset = this.offset;
			switch (this.position) {
				case 1:
					style.top = offset;
					style.left = offset;
					break;
				case 2:
					style.top = offset;
					style.left = '50%';
					style.transform = 'translate(-50%,0)';
					break;
				case 3:
					style.top = offset;
					style.right = offset;
					break;
				case 4:
					style.top = '50%';
					style.left = offset;
					style.transform = 'translate(0,-50%)';
					break;
				case 5:
					style.top = '50%';
					style.left = '50%';
					style.transform = 'translate(-50%,-50%)';
					break;
				case 6:
					style.top = '50%';
					style.right = offset;
					style.transform = 'translate(0,-50%)';
					break;
				case 7:
					style.bottom = offset;
					style.left = offset;
					break;
				case 8:
					style.bottom = offset;
					style.left = '50%';
					style.transform = 'translate(-50%,0)';
					break;
				case 9:
					style.right = offset;
					style.bottom = offset;
					break;
			}
			return style;
		},
		ImageSrc: function () {
			if (typeof this.image === 'boolean') {
				return this.image.src;
			}
			if (typeof this.image === 'string') {
				return this.image;
			}
		}
	}
});