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
          <ul>
            <li
              v-for="food in item.foods"
              @click="selectFood(food)"
              :key="food.name"
              class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @add="addControlEvent"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart
        ref="shopCart"
        :selectFoods="selectFoods"
        :minPrice="seller.minPrice"
        :deliveryPrice="seller.deliveryPrice">
      </shop-cart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import { getGoods } from 'api/index';
  import ShopCart from 'components/shop-cart/shop-cart';
  import CartControl from 'components/cart-control/cart-control';

  export default {
    components: {
      ShopCart, CartControl
    },
    props: {
      seller: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      selectFoods() {
        let ret = [];
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              ret.push(food);
            }
          });
        });
        return ret;
      }
    },
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
      },
      selectFood(food) {

      },
      // 添加商品,小球掉落动画
      addControlEvent(target) {
        this.$refs.shopCart.drop(target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .goods
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper
      position: absolute
      width: 100%
      top: 0
      left: 0
      bottom: 48px
      /deep/ .cube-scroll-nav-bar
        width: 80px
        white-space: normal
        overflow: hidden
      /deep/ .cube-scroll-nav-bar-item
        padding: 0 10px
        display: flex
        align-items: center
        height: 56px
        line-height: 14px
        font-size: $fontsize-small
        background: $color-background-ssss
        .text
          flex: 1
          position: relative
        .num
          position: absolute
          right: -8px
          top: -10px
        .support-ico
          display: inline-block
          vertical-align: top
          margin-right: 4px
      /deep/ .cube-scroll-nav-bar-item_active
        background: $color-white
        color: $color-dark-grey
      /deep/ .cube-scroll-nav-panel-title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid $color-col-line
        font-size: $fontsize-small
        color: $color-grey
        background: $color-background-ssss
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        position: relative
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
          img
            height: auto
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: $fontsize-medium
            color: $color-dark-grey
          .desc, .extra
            line-height: 10px
            font-size: $fontsize-small-s
            color: $color-light-grey
          .desc
            white-space: normal
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: $fontsize-medium
              color: $color-red
            .old
              text-decoration: line-through
              font-size: $fontsize-small-s
              color: $color-light-grey
          .cart-control-wrapper
            position: absolute
            right: 0
            bottom: 12px
    .shop-cart-wrapper
      position: absolute
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
</style>
