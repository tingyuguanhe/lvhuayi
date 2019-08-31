<template>
  <div>
    <div class="filter_wrap">
      <el-form
        :model="ruleForm"
        :inline="true"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="瓷片标题">
          <el-input size="small" clearable v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-input size="small" clearable v-model="ruleForm.title" autocomplete="off"></el-input>
        <el-form-item label="创建时间">
          <el-date-picker
            size="small"
            v-model="ruleForm.date"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-button class="search_btn" size="small" type="primary">查询</el-button>
      </el-form>
    </div>
    <div>
      <el-button size="small" type="primary" @click="addItem()">新建瓷片</el-button>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="date" label="瓷片id" width="150"></el-table-column>
        <el-table-column prop="name" label="创建时间" width="120"></el-table-column>
        <el-table-column prop="province" label="瓷片状态" width="120"></el-table-column>
        <el-table-column prop="city" label="权重" width="120"></el-table-column>
        <el-table-column prop="address" label="瓷片标题" width="300"></el-table-column>
        <el-table-column prop="zip" label="生效时间" width="120"></el-table-column>
        <el-table-column prop="zip" label="客户端展示" width="120"></el-table-column>
        <el-table-column prop="zip" label="管理员" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">上线</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>    


<script>

export default {
  data() {
    return {
      ruleForm: {
        title: "测试",
        status: "IN_FORCE",
        configureUserId: 1,
        date: "",
        startTime: 1564462008000,
        endTime: 1564462184000
      },
       tableData: []
    };
  },
  methods: {
    eidt() {
      this.$router.push({ name: "editNotice" });
    },
    addItem() {
      this.$router.push({ name: "editNotice" });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>