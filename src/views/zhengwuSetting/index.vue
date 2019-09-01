<template>
  <div>
    <div class="filter_wrap">
      <el-form
        :model="searchForm"
        :inline="true"
        ref="searchForm"
        label-width="80px"
        class="searchForm"
      >
        <el-form-item label="功能名称">
          <el-input size="small" clearable v-model="searchForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-input size="small" clearable v-model="searchForm.configureUserId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            size="small"
            v-model="searchForm.date"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-button class="search_btn" size="small" type="primary" @click="getListData">查询</el-button>
      </el-form>
    </div>
    <div>
      <el-button size="small" type="primary" @click="addItem()">新建功能配置</el-button>

      <el-table :data="tableData" v-loading="loading" border style="width: 100%">
        <el-table-column fixed prop="date" label="排序" width="150"></el-table-column>
        <el-table-column prop="name" label="功能名称" width="120"></el-table-column>
        <el-table-column prop="city" label="权重" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight" @change="changeWeight(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="功能地址" width="300"></el-table-column>
        <el-table-column prop="zip" label="管理员" width="120"></el-table-column>
        <el-table-column prop="zip" label="创建时间" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 'OFFLINE'"
              @click="handleClickEdit(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" size="small">
              <span
                v-if="scope.row.status == 'OFFLINE'"
                @click="handleClickUpdateStatus(scope.row, 'IN_FORCE')"
              >上线</span>
              <span v-else class="red" @click="handleClickUpdateStatus(scope.row, 'OFFLINE')">下线</span>
            </el-button>
            <el-button type="text" size="small" @click="handleClickDelete(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="政务功能配置"
        :visible.sync="dialogVisible"
        width="35%">
        <div>
          <el-form
            :model="ruleForm"
            :inline="true"
            ref="ruleForm"
            :rules="rules"
            label-width="80px"
            >  
                 <el-form-item label="中文名称">
                    <el-input  style="width:300px;"size="small" clearable v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="英文名称">
                    <el-input style="width:300px;" size="small" clearable v-model="ruleForm.titleEng"></el-input>
                </el-form-item>
                <el-form-item label="入口图">
                  <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span><i class="el-icon-delete"></i></span>
                </el-form-item>
                <el-form-item label="入口链接">
                    <el-input style="width:300px;"size="small" type="textarea" v-model="ruleForm.entryLink"></el-input>
                </el-form-item>
        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button class="search_btn" size="small" @click="dialogVisible = false">关闭</el-button>
        </span>
    </el-dialog>
    </div>
  </div>
</template>    


<script>
import { getGovermentAffairssList, createGovermentAffairss, updateGovermentAffairss, delGovermentAffairss, updateWeight, updateStatus } from '@/api/zhengwu'
import { allStatus, sortKey } from "@/utils";
export default {
  data() {
    return {
      ruleForm: {
        title: '',
        titleEng: '',
        img: '',
        entryLink: ''
      },
       tableData: [],
       dialogVisible: false,
       searchForm: {
         title: '',
         configureUserId: '',
         startTime: "",
         endTime: "",
         date: []
       },
       loading: false
    };
  },
  methods: {
    addItem() {
      this.dialogVisible = true;
    },
    async changeWeight(row) {
      let originWeight = JSON.stringify(row.weight);
      let reqData = `"${row.weight}"`;
      let res = await updateWeight(row.id, reqData);
      if (res.code == 200) {
        this.$message.success("权重修改成功");
        sortKey(this.tableData, "weight");
      } else {
        row.weight = originWeight;
      }
    },
    async handleClickDelete(row, index) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.confirmDel(row, index);
        })
        .catch(() => {});
    },
    async confirmDel(row, index) {
      let res = await delGovermentAffairss(row.id);
      if (res.code == 200) {
        this.$message.success("删除成功");
        this.tableData.splice(index, 1);
      } else {
        this.$message.error("删除失败");
      }
    },
    async handleClickUpdateStatus(row, type) {
      console.log(row);
      let reqData;
      let tip;
      if (type == "OFFLINE") {
        tip = "下线";
      } else {
        tip = "上线";
      }
      let res = await updateStatus(row.id, `"${type}"`);
      if (res.code == 200) {
        this.$message.success(tip + "成功");
        row.status = type;
      }
    },
    async getListData() {
      this.loading = true;
      this.tableData = [];
      if (this.ruleForm.date && this.ruleForm.date.length > 0) {
        this.ruleForm.startTime = this.ruleForm.date[0];
        this.ruleForm.endTime = this.ruleForm.date[1];
      }
      let reqData = this.ruleForm;
      let res = await getGovermentAffairssList(reqData);
      if (res.code == 200) {
        this.tableData = res.data.results;
        this.loading = false;
        sortKey(this.tableData, "weight");
      } else {
        this.loading = false;
      }
    }
  },
  async mounted () {
    this.getListData();
  }
};
</script>


<style lang="scss" scoped>
</style>