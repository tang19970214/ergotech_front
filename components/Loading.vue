<template>
  <div class="loadingWrap" v-if="$store.state.loading">
    <div class="loadingWrap__Icon">
      <div class="loadingWrap__Icon--dots" v-for="i in 5" :key="i"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loadingWrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  opacity: 0.8;
  z-index: 999;

  &__Icon {
    z-index: 1000;
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    &--dots {
      width: 24px;
      height: 24px;
      background: #3ac;
      border-radius: 100%;
      display: inline-block;
      animation: slide 1s infinite;

      $bgColor: #008fb2, #009b9e, #00a77d, #00b247, #5ab027;

      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          animation-delay: (0.1s * $i);
          background: nth($bgColor, $i);
        }
      }
    }

    @keyframes slide {
      0% {
        transform: scale(1);
      }
      50% {
        opacity: 0.3;
        transform: scale(2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
}
</style>