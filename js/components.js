Vue.component('base-img', {
  props: {
    img: Object,
    fit: String,
    width: [String, Number],
    height: [String, Number],
    round: Boolean,
    setClass: { type: Boolean, default: true }
  },
  computed: {
    outerStyle: function() {
      let style = {
        width: this.img.width / 100 + 'rem',
        height: this.img.height / 100 + 'rem'
      };
      if (this.width) style.width = this.width;
      if (this.height) style.height = this.height;
      if (this.round) {
        style.borderRadius = '50%';
        style.overflow = 'hidden';
      }
      return style;
    },
    innerStyle: function() {
      let style = {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: this.fit
      };
      return style;
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  },
  template: `
    <div v-if='img' :class='setClass?img.id:null' :style='outerStyle' @click='onClick'>
      <img :src='img.src' :style='innerStyle' />
    </div>
  `
});
