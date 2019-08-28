<template>
  <section class="home-index">
    <logo :canvas-width="600" :canvas-height="360"></logo>
  </section>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  name: 'HomeIndex',
  components: {
    Logo
  }
}
</script>

<style lang="scss">
  .home-index {
    position: relative;
    .logo {
      margin-left: 50%;
      width: 600px;
      height: 360px;
      transform: translateX(-50%);
    }
  }
</style>
