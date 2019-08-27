<template>
  <section class="home-backups">
    <el-card shadow="hover">
      <div slot="header">
        <span>Backups</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="showAddDialog = true">Add Backup</el-button>
      </div>
    </el-card>
    <el-dialog title="Add Backup" :visible.sync="showAddDialog" width="720px">
      <transition mode="out-in">
        <add-backups v-if="showAddDialog"></add-backups>
      </transition>
<!--      <el-form ref="addBackupForm" :model="addBackupForm" label-width="100px">-->
<!--        <el-form-item label="Name"></el-form-item>-->
<!--        <el-form-item label="Choose config file to backup"></el-form-item>-->
<!--      </el-form>-->
    </el-dialog>
  </section>
</template>

<script>
import AddBackups from './AddBackups'
export default {
  name: 'HomeBackups',
  components: { AddBackups },
  data () {
    return {
      showAddDialog: false,
      addBackupForm: {}
    }
  }
}
</script>
