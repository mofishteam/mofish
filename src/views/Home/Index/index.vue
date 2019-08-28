<template>
  <div class="home-index">
    <el-card class="home-index-card">
      <section class="home-index-logo-row">
        <logo :canvas-width="400" :canvas-height="240" :has-shadow="true"></logo>
        <div class="home-index-logo-row_text">
          <p class="title">Mofish</p>
          <p class="description">A friendly and open source Development Tool.</p>
        </div>
      </section>
    </el-card>
  </div>
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
  @import "~@/assets/style/base.scss";
  .home-index {
    .home-index-card {
      position: relative;
      max-width: 720px;
      min-width: 720px;
      margin: 0 auto;
      .home-index-logo-row {
        display: flex;
        justify-content: center;
        .logo {
          width: 300px;
          min-width: 300px;
          height: 180px;
          position: relative;
          margin-left: -20px;
          &:after {
            content: '';
            width: 2px;
            height: 100%;
            background-color: $forth-level-border-color;
            display: block;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        .home-index-logo-row_text {
          width: 400px;
        }
      }
    }
  }
</style>
