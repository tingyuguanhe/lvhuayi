<template>
  <div class="container">
    <div class="title">旅华易管理后台</div>
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

.container {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  background-color: #304156;
}

.title {
  color: #bfcbd9;
  font-size: 18px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>
