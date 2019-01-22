// 设置全局 rem
window.onresize = function () {
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + "px";
}
onresize();

// 禁用 touchmove
document.body.addEventListener('touchmove', function (e) {
	e.preventDefault();
}, { passive: false });

// 自动播放音乐
(function () {
	let audio = document.getElementById('music');
	audio.play();
	document.addEventListener('WeixinJSBridgeReady', function () {
		audio.play();
	}, false);
	document.addEventListener('YixinJSBridgeReady', function () {
		audio.play();
	}, false);
})();

// Vue
Vue.component('pImg', {
	template: `<img v-if="obj" :src="obj.src" :style="setStyle"></img>`,
	props: {
		obj: Object,
		origin: {
			type: Boolean,
			default: false
		},
		center: {
			type: Boolean,
			default: false
		},
		middle: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		setStyle: function () {
			let style = {};
			if (!this.origin) {
				style.width = this.obj.width / 100 + 'rem';
			}
			if (this.center) {
				style.position = 'absolute';
				style.left = '50%';
				style.width = this.obj.width / 100 + 'rem';
				style.marginLeft = -this.obj.width / 200 + 'rem';
			}
			if (this.middle) {
				style.position = 'absolute';
				style.top = '50%';
				style.height = this.obj.height / 100 + 'rem';
				style.marginTop = -this.obj.height / 200 + 'rem';
			}
			return style;
		}
	}
});
var h5 = new Vue({
	el: '#h5',
	data: {
		oImg: {},
		bLoadV: true,
		nLoadNum: 0,
		bIndexV: false,
		bShareV: false,
		bShareCtrl: true,
		oMusicStatus: 'i-music-on',
	},
	methods: {
		showShare: function (cancel) {
			if (typeof cancel === 'boolean' && cancel === false) {
				this.bShareCtrl = false;
			}
			this.bShareV = true;
		},
		toggleMusic: function () {
			let audio = document.getElementById('music');
			if (audio.paused) {
				audio.play();
				this.oMusicStatus = 'i-music-on';
			} else {
				audio.pause();
				this.oMusicStatus = 'i-music-off';
			}
		},
		inputRepair: function () {
			let timer, pos, distance = 1;
			timer = setInterval(function () {
				pos = document.documentElement.scrollTop || document.body.scrollTop;
				pos -= distance;
				window.scrollTo(0, pos);
				pos += distance;
				window.scrollTo(0, pos);
				clearInterval(timer);
			}, 1);
			console.log('repair done');
		},
	},
	mounted() {
		let that = this;
		let queue = new createjs.LoadQueue();
		queue.on('progress', function (e) {
			that.nLoadNum = parseInt(e.progress * 100);
		});
		queue.on('fileload', function (target) {
			if (target.item.type === 'image') {
				that.oImg[target.item.id] = {
					src: target.item.src,
					width: target.result.width,
					height: target.result.height
				};
			}
		});
		queue.on('complete', function () {
			// 显示首页
			that.bLoadV = false;
			that.bIndexV = true;
		});
		let manifest = [
			// 所有需要预加载的资源
			{ 'id': 'BGM', 'src': 'media/music.mp3' },
		];
		queue.loadManifest(manifest);
	},
});