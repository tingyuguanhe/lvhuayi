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
        <el-form-item label="创建时间">
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
          <template
            slot-scope="scope"
          >{{scope.row.startTime | formatFullDate}} 至 {{scope.row.endTime | formatFullDate}}</template>
        </el-table-column>
        <el-table-column label="客户端展示" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.showInClient">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="configureUser.nickname" label="管理员" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleClickView(scope.row)" type="text" size="small">查看</el-button>
            <el-button
              type="text"
              size="small"
              v-if="scope.row.status == 'OFFLINE'"
              @click="handleClickEdit(scope.row)"
            >编辑</el-button>
            <el-button type="text" size="small">
              <span
                v-if="scope.row.status == 'OFFLINE'"
                @click="handleClickUpdateStatus(scope.row, 'IN_FORCE')"
              >上线</span>
              <span v-else class="red" @click="handleClickUpdateStatus(scope.row, 'OFFLINE')">下线</span>
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
    <!-- 查看组件 -->
    <pre-view :dialogShow.sync="dialogShow" :title="'公告'" :currentRow="currentRow"></pre-view>
  </div>
</template>    


<script>
import PreView from "@/components/preView";
import {
  getNoticeList,
  updateStatus,
  updateWeight,
  delItem
} from "@/api/notice";
import { allStatus, sortKey } from "@/utils";
export default {
  components: { PreView },
  data() {
    return {
      dialogShow: false,
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
  watch: {
    "ruleForm.date": function(newVal, oldVal) {
        if(!newVal || newVal.length == 0){
            this.ruleForm.startTime = "";
            this.ruleForm.endTime = "";
        }
    }
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
      this.dialogShow = true;
      this.currentRow = row;
    },
    handleClickEdit(row) {
      this.$router.push({ name: "editNotice", params: { id: row.id } });
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

