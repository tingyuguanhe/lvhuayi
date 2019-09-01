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
        <el-form-item label="新闻标题">
          <el-input size="small" clearable v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新闻状态">
          <el-select size="small" clearable v-model="ruleForm.status" placeholder="请选择状态">
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
      <el-button size="small" type="primary" @click="addItem()">新建新闻</el-button>
      <el-button size="small" type="success" @click="createReprint()">转载新闻</el-button>
      <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column fixed prop="id" label="新闻id" width="70"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.createTime | formatFullDate}}</template>
        </el-table-column>
        <el-table-column label="新闻状态" width="120">
          <template slot-scope="scope">{{scope.row.status | dataStatus}}</template>
        </el-table-column>
        <el-table-column prop="weight" label="权重" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight" @change="changeWeight(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="新闻标题"></el-table-column>
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
    <pre-view :dialogShow.sync="dialogShow" :title="'新闻'" :currentRow="currentRow"></pre-view>

    <!-- 转载新闻 -->
    <el-dialog title="转载新闻" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="formRules">
        <el-form-item label="新闻中文标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新闻英文标题" :label-width="formLabelWidth" prop="titleEng">
          <el-input v-model="form.titleEng" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入口链接" :label-width="formLabelWidth" prop="entryLink">
          <el-input v-model="form.entryLink" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生效时间" :label-width="formLabelWidth" prop="date">
          <el-date-picker
            key="en"
            size="small"
            v-model="form.date"
            value-format="timestamp"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmCreateReprint('form')">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>    


<script>
import PreView from "@/components/preView";
import {
  getNewsList,
  updateStatus,
  updateWeight,
  delItem,
  updateNews,
  createReprintNews
} from "@/api/news";
import { allStatus, sortKey } from "@/utils";
export default {
  components: { PreView },
  data() {
    return {
      dialogFormVisible: false,
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
      currentRow: {},
      formLabelWidth: "120px",
      form: {
        title: "",
        titleEng: "",
        date: [],
        entryLink: "",
        startTime: "",
        endTime: ""
      },
      formRules: {
        title: [{ required: true, message: "请填写中文名称", trigger: "blur" }],
        titleEng: [
          { required: true, message: "请填写英文名称", trigger: "blur" }
        ],
        entryLink: [
          { required: true, message: "请填写入口链接", trigger: "blur" }
        ],
        date: [{ required: true, message: "请选择生效时间", trigger: "blur" }]
      },
      reprintId: "",
      type: ""
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
      this.$router.push({ name: "createNews" });
    },
    async getListData() {
      this.loading = true;
      this.tableData = [];
      if (this.ruleForm.date && this.ruleForm.date.length > 0) {
        this.ruleForm.startTime = this.ruleForm.date[0];
        this.ruleForm.endTime = this.ruleForm.date[1];
      }
      let reqData = this.ruleForm;
      let res = await getNewsList(reqData);
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
      if (row.type == "CONFIGURE") {
        this.$router.push({
          name: "editNews",
          params: { id: row.id, type: row.tye }
        });
      }else{
          this.dialogFormVisible = true;
          this.type = row.type;
          this.form.title = row.title;
          this.form.titleEng = row.titleEng;
          this.form.entryLink = row.entryLink;
          this.form.date.push(row.startTime);
          this.form.date.push(row.endTime);
          this.form.startTime = row.startTime;
          this.form.endTime = row.endTime;
          this.$set(this.form, "id", row.id);
          this.$set(this.form, "type", row.type);
          this.$set(this.form, "weight", row.weight);

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
    },
    createReprint() {
      this.dialogFormVisible = true;
      this.form.title = "";
      this.form.titleEng = "";
      this.form.entryLink = "";
    },
    //创建\修改转载新闻
    confirmCreateReprint(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.form.startTime = this.form.date[0];
          this.form.endTime = this.form.date[1];
          let reqData = this.form;

          if (!this.id) {
            let res = await createReprintNews(reqData);
            if (res.code == 200) {
              this.$message.success("创建成功");
              this.dialogFormVisible = false;
              this.getListData();
            } else {
              this.$message.error("创建失败");
              this.dialogFormVisible = false;
              return false;
            }
          } else {
            let res = await updateNews(reqData);
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.dialogFormVisible = false;
              this.getListData();
            } else {
              this.$message.error("修改失败");
              this.dialogFormVisible = false;
              return false;
            }
          }
        } else {
          return;
        }
      });
    }
  }
};
</script>

