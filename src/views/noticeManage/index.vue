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
        <el-form-item label="公告标题">
          <el-input size="small" clearable v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公告状态">
          <el-select size="small" clearable v-model="ruleForm.status" placeholder="请选择公告状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员">
          <el-select size="small" clearable v-model="ruleForm.configureUserId" placeholder="请选择管理员">
            <el-option
              :label="item.nickname"
              :value="item.id"
              v-for="(item,index) in usersOptions"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            size="small"
            v-model="ruleForm.date"
            type="datetimerange"
            align="right"
            value-format="timestamp"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-button class="search_btn" size="small" type="primary">查询</el-button>
      </el-form>
    </div>
    <div>
      <el-button size="small" type="primary" @click="addItem()">新建公告</el-button>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="公告id" width="70"></el-table-column>
        <el-table-column prop="name" label="创建时间">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column prop="province" label="公告状态" width="120">
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column>
        <el-table-column prop="city" label="权重" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="公告标题"></el-table-column>
        <el-table-column label="生效时间" width="120">
          <template slot-scope="scope">{{scope.row.updateTime}}</template>
        </el-table-column>
        <el-table-column prop="configureUser.nickname" label="管理员" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleClickView(scope.row)" type="text" size="small">查看</el-button>
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
import { getNoticeList } from "@/api/notice";
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        status: "IN_FORCE",
        configureUserId: "",
        startTime: "",
        endTime: ""
      },
      tableData: [],
      usersOptions: []
    };
  },
  async mounted() {
    this.getListData();
    let res = await this.$store.dispatch("user/getAllUesrsData");

    if (res.code == 200) {
      this.usersOptions = res.data;
    }
  },
  methods: {
    eidt() {
      this.$router.push({ name: "editNotice" });
    },
    addItem() {
      this.$router.push({ name: "editNotice" });
    },
    async getListData() {
      let reqData = this.ruleForm;
      let res = await getNoticeList(reqData);
      if (res.code == 200) {
        this.tableData = res.data.results;
      }
    },
    handleClickView(row) {}
  }
};
</script>


<style lang="scss" scoped>
</style>