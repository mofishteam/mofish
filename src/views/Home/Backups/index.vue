<template>
  <section class="home-backups">
    <el-card shadow="hover">
      <div slot="header">
        <span>Backups</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="showAddDialog = true">Add Backup</el-button>
      </div>
    </el-card>
    <add-backups :show.sync="showAddDialog"></add-backups>
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
