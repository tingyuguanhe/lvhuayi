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
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in statusOptions"
              :key="index"
            ></el-option>
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
        <el-button class="search_btn" size="small" type="primary" @click="getListData">查询</el-button>
      </el-form>
    </div>
    <div>
      <el-button size="small" type="primary" @click="addItem()">新建公告</el-button>

      <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column fixed prop="id" label="公告id" width="70"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.createTime | formatFullDate}}</template>
        </el-table-column>
        <el-table-column label="公告状态" width="120">
          <template slot-scope="scope">{{scope.row.status | dataStatus}}</template>
        </el-table-column>
        <el-table-column prop="weight" label="权重" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight" @change="changeWeight(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="公告标题"></el-table-column>
        <el-table-column label="生效时间" width="120">
          <template slot-scope="scope">{{scope.row.updateTime | formatFullDate}}</template>
        </el-table-column>
        <el-table-column prop="configureUser.nickname" label="管理员" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleClickView(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="handleClickEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleClickUpdateStatus(scope.row)">
              <span v-if="scope.row.status == 'OFFLINE'">上线</span>
              <span v-else class="red">下线</span>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleClickDelete(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[20]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>

    <el-dialog title="查看公告" :visible.sync="dialogVisible" width="70%">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="pre_view_wrap">
              <h4>英文公告</h4>
              <div class="pre_view">
                <p>{{currentRow.contentEng}}</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="pre_view_wrap">
              <h4>中文公告</h4>
              <div class="pre_view">
                <p>{{currentRow.content}}</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>    


<script>
import {
  getNoticeList,
  updateStatus,
  updateWeight,
  delItem
} from "@/api/notice";
import { allStatus, sortKey } from "@/utils";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        title: "",
        status: null,
        date: [],
        configureUserId: "",
        startTime: "",
        endTime: ""
      },
      loading: false,
      statusOptions: allStatus(),
      tableData: [],
      usersOptions: [],
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      currentRow: {}
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addItem() {
      this.$router.push({ name: "createNotice" });
    },
    async getListData() {
      this.loading = true;
      this.tableData = [];
      if (this.ruleForm.date && this.ruleForm.date.length > 0) {
        this.ruleForm.startTime = this.ruleForm.date[0];
        this.ruleForm.endTime = this.ruleForm.date[1];
      }
      let reqData = this.ruleForm;
      let res = await getNoticeList(reqData);
      if (res.code == 200) {
        this.tableData = res.data.results;
        this.loading = false;
        sortKey(this.tableData, "weight");
      } else {
        this.loading = false;
      }
    },
    handleClickView(row) {
      this.dialogVisible = true;
      this.currentRow = row;
    },
    handleClickEdit(row) {
      this.$router.push({ name: "editNotice", params: { id: row.id } });
    },
    async handleClickUpdateStatus(row) {
      console.log(row);
      let reqData;
      let tip;
      if (row.status == "OFFLINE") {
        //下线
        reqData = '"IN_FORCE"';
        tip = "上线";
      } else {
        tip = "下线";
        reqData = '"OFFLINE"';
      }
      let res = await updateStatus(row.id, reqData);
      if (res.code == 200) {
        this.$message.success(tip + "成功");
        row.status = "IN_FORCE";
      }
    },
    async handleClickDelete(row, index) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        this.confirmDel(row, index);
      });
    },
    async confirmDel(row, index) {
      let res = await delItem(row.id);
      if (res.code == 200) {
        this.$message.success("删除成功");
        this.tableData.splice(index, 1);
      } else {
        this.$message.error("删除失败");
      }
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
    }
  }
};
</script>


<style lang="scss" scoped>
</style>