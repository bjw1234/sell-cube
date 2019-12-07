<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs" :initialIndex="0" :seller="seller"></tab>
    </div>
  </div>
</template>

<script>
  import { getSeller } from './api/index';
  import VHeader from './components/v-header/v-header';
  import Tab from './components/tab/tab';
  import Goods from 'components/goods/goods';
  import Ratings from 'components/ratings/ratings';
  import Seller from 'components/seller/seller';

  export default {
    name: 'app',
    components: {
      VHeader, Tab
    },
    data() {
      return {
        seller: {},
        tabs: [{
          label: '商品',
          component: Goods
        }, {
          label: '评价',
          component: Ratings
        }, {
          label: '商家',
          component: Seller
        }]
      };
    },
    created() {
      this._getSeller();
    },
    methods: {
      _getSeller() {
        getSeller().then(seller => {
          this.seller = seller;
        });
      }
    }
  };
</script>
<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
