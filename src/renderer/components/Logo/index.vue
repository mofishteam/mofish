<template>
  <div class="logo">
    <canvas ref="canvas" :class="{shadow: hasShadow}"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    canvasWidth: {
      default: 100
    },
    canvasHeight: {
      default: 60
    },
    hasShadow: {
      default: false
    }
  },
  data () {
    return {
      ctx: null,
      isPlaying: false,
      colors: ['#9fffeb', '#b4ffba', '#e6ffa8',
        '#ffcdac', '#ffa3af', '#9dc2ff'],
      // 三维数组，第一级：column，第二级：point，第三级：x,y
      points: []
    }
  },
  mounted () {
    const canvas = this.$refs.canvas
    canvas.width = this.canvasWidth
    canvas.height = this.canvasHeight
    this.ctx = canvas.getContext('2d')
    this.resetPoints()
    this.render()
  },
  methods: {
    resetPoints () {
      this.points = [
        [[this.canvasWidth * 0.2, this.canvasHeight * 0.5]],
        [[this.canvasWidth * 0.3, this.canvasHeight / 3], [this.canvasWidth * 0.3, this.canvasHeight * 2 / 3]],
        [[this.canvasWidth * 0.4, this.canvasHeight / 4], [this.canvasWidth * 0.4, this.canvasHeight * 3 / 4]],
        [[this.canvasWidth * 0.5, this.canvasHeight / 4], [this.canvasWidth * 0.5, this.canvasHeight * 3 / 4]],
        [[this.canvasWidth * 0.6, this.canvasHeight / 3], [this.canvasWidth * 0.6, this.canvasHeight * 2 / 3]],
        [[this.canvasWidth * 0.7, this.canvasHeight * 0.5]],
        [[this.canvasWidth * 0.8, this.canvasHeight / 3], [this.canvasWidth * 0.8, this.canvasHeight * 2 / 3]]
      ]
    },
    render () {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.ctx.save()
      if (this.points && this.points.length) {
        for (let colIndex = 0; colIndex < this.points.length - 1; colIndex++) {
          this.ctx.beginPath()
          this.ctx.moveTo(...this.points[colIndex][0])
          this.points[colIndex][1] && this.ctx.lineTo(...this.points[colIndex][1])
          this.points[colIndex + 1][1] && this.ctx.lineTo(...this.points[colIndex + 1][1])
          this.ctx.lineTo(...this.points[colIndex + 1][0])
          this.ctx.closePath()
          this.ctx.fillStyle = this.colors[colIndex]
          this.ctx.fill()
          this.ctx.restore()
        }
      }
    }
  },
  watch: {
    canvasWidth () {
      this.resetPoints()
    },
    canvasHeight () {
      this.resetPoints()
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    height: 60px;
    width: 100px;
    canvas {
      width: 100%;
      height: 100%;
      &.shadow {
        filter: drop-shadow(0 0 30px rgba(0, 0, 0, 0.1));
      }
    }
  }
</style>
