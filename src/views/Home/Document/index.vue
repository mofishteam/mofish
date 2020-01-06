<template>
  <el-card class="home-document">
    <div v-html="markdownContent">
    </div>
  </el-card>
</template>

<script>
import { getDocument } from '@/api/service/documents'
import { markdown } from 'markdown'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'
hljs.registerLanguage('javascript', javascript)
export default {
  name: 'HomeDocument',
  data () {
    return {
      markdownContent: ''
    }
  },
  created () {
    getDocument({ name: this.$route.query.doc }).then(res => {
      if (!res.result) {
        this.markdownContent = markdown.toHTML(res.content)
        this.$nextTick(() => {
          document.querySelectorAll('.home-document code').forEach((block) => {
            hljs.highlightBlock(block)
          })
        })
      }
    })
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/base.scss";
  .home-document {
    margin: 0 auto;
    max-width: 1280px;
    min-width: 800px;
    .el-card__body {
      padding-top: 0;
      h1 {
        border-bottom: 1px solid $third-level-border-color;
        padding-bottom: 15px;
        font-size: 28px;
      }
      h2 {
        font-size: 24px;
        color: $main-text-color;
      }
      h3 {
        font-size: 20px;
      }
      h4 {
        font-size: 18px;
      }
      h5 {
        font-size: 16px;
      }
      blockquote {
        margin: 15px 0;
        padding: 10px 20px;
        background-color: lighten($third-level-border-color, 4%);
        border-left: 3px solid $third-level-border-color;
      }
    }
  }
</style>
