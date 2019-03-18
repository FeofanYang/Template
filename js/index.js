// 设置全局 rem
window.onresize = function() {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
};
onresize();

// 禁用 touchmove
document.body.addEventListener(
  'touchmove',
  function(e) {
    e.preventDefault();
  },
  { passive: false }
);

// 自动播放音乐
(function() {
  let audio = document.getElementById('music');
  audio.play();
  document.addEventListener(
    'WeixinJSBridgeReady',
    function() {
      audio.play();
    },
    false
  );
  document.addEventListener(
    'YixinJSBridgeReady',
    function() {
      audio.play();
    },
    false
  );
})();

// 音乐控制按钮
function toggleMusic(el) {
  let audio = document.getElementById('music');
  if (audio.paused) {
    audio.play();
    if (el.classList) el.classList.add('i-music-on');
    else el.className += ' i-music-on';
    el.classList.remove('i-music-off');
  } else {
    audio.pause();
    if (el.classList) el.classList.add('i-music-off');
    else el.className += ' i-music-off';
    el.classList.remove('i-music-on');
  }
}

// Vue
var h5 = new Vue({
  el: '#h5',
  data: {
    oImg: {},
    bLoadV: true,
    nLoadNum: 0,
    bIndexV: false
  },
  mounted() {
    let queue = new createjs.LoadQueue();
    let manifest = [
      // 所有需要预加载的资源
      { src: 'media/music.mp3' }
    ];
    queue.loadManifest(manifest);
    queue.on('progress', e => {
      this.nLoadNum = parseInt(e.progress * 100);
    });
    queue.on('fileload', target => {
      if (target.item.type === 'image') {
        this.oImg[target.item.id] = {
          id: target.item.id,
          src: target.item.src,
          width: target.result.width,
          height: target.result.height
        };
      }
    });
    queue.on('complete', () => {
      // 显示首页
      this.bLoadV = false;
      this.bIndexV = true;
    });
  },
  methods: {
    inputRepair: function() {
      let timer,
        pos,
        distance = 1;
      timer = setInterval(function() {
        pos = document.documentElement.scrollTop || document.body.scrollTop;
        pos -= distance;
        window.scrollTo(0, pos);
        pos += distance;
        window.scrollTo(0, pos);
        clearInterval(timer);
      }, 1);
      console.log('repair done');
    }
  }
});
