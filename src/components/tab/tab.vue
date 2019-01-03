<template>
  <div class="tab">
    <cube-tab-bar
      ref="tabBar"
      :data="tabs"
      :showSlider="true"
      :useTransition="false"
      v-model="selectedLabel">
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        ref="slide"
        :loop="false"
        :showDots="false"
        :autoPlay="false"
        :initialIndex="index"
        :options="slideOptions"
        @scroll="onSlideScroll"
        @change="onSlideChange">
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component ref="component" :is="tab.component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      tabs: {
        type: Array,
        default() {
          return [];
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        index: this.initialIndex,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        }
      };
    },
    computed: {
      selectedLabel: {
        get() {
          return this.tabs[this.index].label;
        },
        set(newVal) {
          this.index = this.tabs.findIndex((item) => {
            return item.label === newVal;
          });
        }
      }
    },
    mounted() {
      this.onSlideChange(this.index);
    },
    methods: {
      onSlideChange(index) {
        this.index = index;
        // 拿到当前对应的组件
        this.component = this.$refs.component[index];
        this.component.fetch && this.component.fetch();
      },
      onSlideScroll(pos) {
        let tabBarWidth = this.$refs.tabBar.$el.clientWidth;
        // this.$refs.slide.slide === BScroll
        let slideWidth = this.$refs.slide.slide.scrollerWidth;
        let transform = -pos.x / slideWidth * tabBarWidth;
        this.$refs.tabBar.setSliderTransform(transform);
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .tab
    display: flex
    flex-direction: column
    height: 100%
    /deep/ .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
</style>
