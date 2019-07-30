// 设置全局 rem
window.onresize = () => {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
};
onresize();

// 禁用 touchmove
document.body.addEventListener(
  'touchmove',
  el => {
    let doNotMove = true,
      target = el.target,
      res = [];
    while (target.tagName != 'BODY') {
      res.push(target);
      target = target.parentNode;
    }
    for (let i = 0; i < res.length; i++) {
      if (res[i].className.indexOf('scrollItem') > -1) doNotMove = false;
    }
    if (doNotMove) el.preventDefault();
  },
  { passive: false }
);

// 自动播放音乐
{
  const audio = document.getElementById('music');
  audio.play();
  document.addEventListener(
    'WeixinJSBridgeReady',
    () => {
      audio.play();
    },
    false
  );
  document.addEventListener(
    'YixinJSBridgeReady',
    () => {
      audio.play();
    },
    false
  );
}

// 音乐控制按钮
function toggleMusic(el) {
  const audio = document.getElementById('music'),
    list = el.classList;
  if (audio.paused) {
    audio.play();
    if (list) list.add('i-music-on');
    else el.className += ' i-music-on';
    list.remove('i-music-off');
  } else {
    audio.pause();
    if (list) list.add('i-music-off');
    else el.className += ' i-music-off';
    list.remove('i-music-on');
  }
}

// Vue
var h5 = new Vue({
  el: '#h5',
  data: {
    oImg: {},
    bLoadV: true,
    nLoadPercent: 0,
    bIndexV: false
  },
  mounted() {
    let queue = new createjs.LoadQueue();
    let manifest = [
      // 所有需要预加载的资源
      { src: 'media/music.mp3' }
    ];
    queue.loadManifest(manifest);
    queue.on('progress', el => {
      this.nLoadPercent = parseInt(el.progress * 100);
    });
    queue.on('fileload', el => {
      let id = el.item.id,
        src = el.item.src + '?t=' + globalTimestamp;
      if (el.item.type === 'image') {
        if (id.indexOf('/') != -1) {
          id = src
            .split('/')
            .pop()
            .split('.')[0];
        }
        this.oImg[id] = { id, src, width: el.result.width, height: el.result.height };
      }
    });
    queue.on('complete', () => {
      this.bLoadV = false;
      this.bIndexV = true;
    });
  },
  methods: {
    inputRepair: function() {
      let timer,
        position,
        distance = 1;
      timer = setInterval(function() {
        position = document.documentElement.scrollTop || document.body.scrollTop;
        position -= distance;
        window.scrollTo(0, position);
        position += distance;
        window.scrollTo(0, position);
        clearInterval(timer);
      }, 1);
      console.log('repair done');
    }
  }
});
