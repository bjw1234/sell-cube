<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        v-if="goods&&goods.length"
        :side="true"
        :data="goods"
        :options="scrollOptions">
        <cube-scroll-nav-panel
          v-for="item in goods"
          :key="item.name"
          :label="item.name"
          :title="item.name">
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import { getGoods } from 'api/index';

  export default {
    data() {
      return {
        goods: [],
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      };
    },
    methods: {
      fetch() { // 给外部提供调用
        (!this.goods.length) && getGoods().then(goods => {
          this.goods = goods;
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
