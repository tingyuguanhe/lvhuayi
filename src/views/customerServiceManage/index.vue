<template>
  <div>
    <div class="filter_wrap">
      <el-form :model="ruleForm" :inline="true" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="问题类型" label-width="80px">
          <el-select size="small" clearable v-model="ruleForm.typeId" placeholder="请选择问题类型">
            <el-option
              :label="item.typeName"
              :value="item.id"
              v-for="(item,index) in qsOptions"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="反馈人联系方式" label-width="140px">
          <el-input size="small" clearable v-model="ruleForm.phoneNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="反馈时间" label-width="80px">
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
      <el-button size="small" type="primary" @click="qsTypeManage()">问题类型管理</el-button>

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
    <pre-view :dialogShow.sync="dialogShow" :currentRow="currentRow"></pre-view>
  </div>
</template>    


<script>
import PreView from "@/components/preView";
import { updateStatus, updateWeight, delItem } from "@/api/notice";
import { getQsTypeList, getList } from "@/api/customerService";

export default {
  components: { PreView },
  data() {
    return {
      dialogShow: false,
      ruleForm: {
        typeId: "",
        phoneNum: "",
        date:[],
        startTime: "",
        endTime: ""
      },
      loading: false,
      qsOptions: [],
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
    this.getQsTypeListOption();
    this.getListData();
    
  },
  methods: {
    async getQsTypeListOption() {
      let res = await getQsTypeList();
      if (res.code == 200) {
        this.qsOptions = res.data;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    qsTypeManage() {
      this.$router.push({ name: "qsTypeManage" });
    },
    async getListData() {
      this.loading = true;
      this.tableData = [];
      if (this.ruleForm.date && this.ruleForm.date.length > 0) {
        this.ruleForm.startTime = this.ruleForm.date[0];
        this.ruleForm.endTime = this.ruleForm.date[1];
      }
      let reqData = this.ruleForm;
      let res = await getList(reqData);
      if (res.code == 200) {
        this.tableData = res.data.results;
        this.loading = false;
       
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


<style lang="scss" scoped>
</style>