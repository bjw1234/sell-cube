<template>
  <div class="seller">I am seller</div>
</template>

<script type="text/ecmascript-6">

  import { getSeller } from 'api/index';

  export default {
    data() {
      return {
        seller: {}
      };
    },
    methods: {
      fetch() {
        // 当这个对象为空时，再通过网络获取
        console.log(this.isEmptyObject(this.seller));
        this.isEmptyObject(this.seller) && getSeller().then(seller => {
          this.seller = seller;
        });
      },
      isEmptyObject(val) {
        return Object.keys(val).length === 0;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
