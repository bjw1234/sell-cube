<template>
  <div class="ratings">I am ratings</div>
</template>

<script type="text/ecmascript-6">
  import { getRatings } from 'api/index';

  export default {
    data() {
      return {
        ratings: []
      };
    },
    methods: {
      fetch() {
        (!this.ratings.length) && getRatings().then(ratings => {
          this.ratings = ratings;
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
