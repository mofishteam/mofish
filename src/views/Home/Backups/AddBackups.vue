<template>
  <el-dialog class="home-backups-add" title="Add Backup" :visible.sync="currentShow" width="720px">
    <el-steps :space="100" :active="activeIndex" finish-status="success" simple style="margin-top: -20px; margin-bottom: 20px;">
      <el-step title="Complete Info">123</el-step>
      <el-step title="Choose config">345</el-step>
      <el-step title="Finish">456</el-step>
    </el-steps>
    <div class="home-backups-steps">
      <div class="step" v-show="activeIndex === 0">
        <el-form ref="addBackupForm" :model="formData" label-width="100px">
          <el-form-item label="Name" required>
            <el-input v-model="formData.name" placeholder="Please input a name for backups."></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="step" v-show="activeIndex === 1">2</div>
      <div class="step" v-show="activeIndex === 2">3</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" v-show="activeIndex !== 0" @click="prevStep">
        <i class="el-icon-arrow-left"></i>
        <span>Prev</span>
      </el-button>
      <el-button type="primary" v-show="activeIndex !== maxStep" @click="nextStep">
        <span>Next</span>
        <i class="el-icon-arrow-right"></i>
      </el-button>
      <el-button type="primary" v-show="activeIndex === maxStep" @click="confirm">
        <span>Confirm</span>
        <i class="el-icon-check"></i>
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
const getFormData = () => ({
  name: '',
  files: []
})
export default {
  name: 'HomeBackupsAdd',
  props: {
    show: {
      default: false
    }
  },
  data () {
    return {
      activeIndex: 0,
      currentShow: false,
      maxStep: 2,
      formData: getFormData()
    }
  },
  methods: {
    nextStep () {
      this.activeIndex = Math.min(this.maxStep, ++this.activeIndex)
    },
    prevStep () {
      this.activeIndex = Math.max(0, --this.activeIndex)
    },
    confirm () {},
    clear () {
      this.formData = getFormData()
    },
    cancel () {
      this.currentShow = false
      this.clear()
    }
  },
  watch: {
    show (val) {
      this.currentShow = val
    },
    currentShow (val) {
      this.$emit('update:show', val)
    }
  }
}
</script>
