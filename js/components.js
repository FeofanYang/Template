// 图片组件
Vue.component('base-img', {
  props: {
    image: Object,
    origin: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    middle: { type: Boolean, default: false },
    setClass: { type: Boolean, default: true }
  },
  computed: {
    setStyle: function() {
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
  },
  template: `<img v-if="image" :src="image.src" :style="setStyle" :class="setClass?image.id:null" />`
});
