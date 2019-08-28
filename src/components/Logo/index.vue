<template>
  <div class="logo">
    <canvas ref="canvas"></canvas>
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
    }
  },
  data () {
    return {
      ctx: null,
      colors: ['#9fffeb', '#b4ffba', '#e6ffa8',
        '#ffcdac', '#ffa3af', '#9dc2ff'],
      // 三维数组，第一级：column，第二级：point，第三级：x,y
      points: [
        [[20, 30]],
        [[30, 20], [30, 40]],
        [[40, 15], [40, 45]],
        [[50, 15], [50, 45]],
        [[60, 20], [60, 40]],
        [[70, 30]],
        [[80, 20], [80, 40]]
      ]
    }
  },
  mounted () {
    const canvas = this.$refs.canvas
    canvas.width = this.canvasWidth
    canvas.height = this.canvasHeight
    this.ctx = canvas.getContext('2d')
    this.render()
  },
  methods: {
    render () {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.ctx.save()
      this.ctx.beginPath()
      // 第一节
      this.ctx.moveTo(...this.points[0][0])
      this.ctx.lineTo(...this.points[1][0])
      this.ctx.lineTo(...this.points[1][1])
      this.ctx.lineTo(...this.points[0][0])
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[0]
      this.ctx.fill()
      this.ctx.restore()
      // 第二节
      this.ctx.beginPath()
      this.ctx.moveTo(...this.points[1][1])
      this.ctx.lineTo(...this.points[2][1])
      this.ctx.lineTo(...this.points[2][0])
      this.ctx.lineTo(...this.points[1][0])
      this.ctx.lineTo(...this.points[1][1])
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[1]
      this.ctx.fill()
      this.ctx.restore()
      // 第三节
      this.ctx.beginPath()
      this.ctx.moveTo(...this.points[2][0])
      this.ctx.lineTo(...this.points[2][1])
      this.ctx.lineTo(...this.points[3][1])
      this.ctx.lineTo(...this.points[3][0])
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[2]
      this.ctx.fill()
      this.ctx.restore()
      // 第四节
      this.ctx.beginPath()
      this.ctx.moveTo(...this.points[3][0])
      this.ctx.lineTo(...this.points[3][1])
      this.ctx.lineTo(...this.points[4][1])
      this.ctx.lineTo(...this.points[4][0])
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[3]
      this.ctx.fill()
      this.ctx.restore()
      // 第五节
      this.ctx.beginPath()
      this.ctx.moveTo(...this.points[4][1])
      this.ctx.lineTo(...this.points[4][0])
      this.ctx.lineTo(...this.points[5][0])
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[4]
      this.ctx.fill()
      this.ctx.restore()
      // 第六节
      this.ctx.beginPath()
      this.ctx.moveTo(...this.points[5][0])
      this.ctx.lineTo(...this.points[6][0])
      this.ctx.lineTo(...this.points[6][1])
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[5]
      this.ctx.fill()
      this.ctx.restore()
      // this.ctx.moveTo()
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
    }
  }
</style>
