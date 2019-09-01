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
        <el-form-item label="功能名称">
          <el-input size="small" clearable v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能状态">
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
      <el-button size="small" v-if="tableData.length < 20" type="primary" @click="addItem()">新建金刚</el-button>

      <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column fixed prop="id" label="排序" width="70"></el-table-column>

        <el-table-column prop="title" label="功能名称"></el-table-column>

        <el-table-column prop="weight" label="权重" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight" @change="changeWeight(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新闻状态" width="120">
          <template slot-scope="scope">{{scope.row.status | dataStatus}}</template>
        </el-table-column>
        <el-table-column prop="entryLink" label="地址"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.createTime | formatFullDate}}</template>
        </el-table-column>

        <el-table-column prop="configureUser.nickname" label="管理员" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-if="scope.row.status == 'OFFLINE'"
              @click="handleClickEdit(scope.row)"
            >修改</el-button>
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
    <!-- 添加、编辑 -->
    <el-dialog title="功能配置" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="formRules" label-width="120px">
        <el-form-item label="中文类型名称" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文类型名称" prop="titleEng">
          <el-input v-model="form.titleEng" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入口图" prop="image">
          <el-upload
            key="zhcn"
            class="avatar-uploader"
            :action="domain"
            :data="zhCnQiniuData"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            :show-file-list="false"
          >
            <img v-if="form.image" :src="form.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="pic_tip">图尺寸：160*160，小于500k，png，jpg，jpeg</div>
        </el-form-item>
        <el-form-item label="入口链接" prop="entryLink">
          <el-input v-model="form.entryLink" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmCreate('form')">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>    


<script>
import {
  getKingKongList,
  createKingKong,
  updateWeight,
  delItem,
  updateKingKong,
  updateStatus
} from "@/api/jingang";

import { allStatus, sortKey } from "@/utils";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "130px",
      loading: false,
      ruleForm: {
        title: "",
        status: null,
        date: [],
        configureUserId: "",
        startTime: "",
        endTime: ""
      },
      zhCnQiniuData: {
        key: "", //图片名字处理
        token: this.QiniuInfos.token //七牛云token
      },
      domain: "https://up-z1.qiniup.com", // 七牛云的上传地址（华南区）
      qiniuaddr: "http://xxxx.com", // 七牛云的图片外链地址
      usersOptions: [],
      tableData: [],
      statusOptions: allStatus(),
      form: {
        title: "",
        titleEng: "",
        entryLink:"",
        image: ""
      },
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      formRules: {
        title: [
          { required: true, message: "请填写中文名称", trigger: "blur" }
        ],
        titleEng: [
          { required: true, message: "请填写英文名称", trigger: "blur" }
        ],
        image: [
          { required: true, message: "请上传图片", trigger: "change" }
        ],
        entryLink: [
          { required: true, message: "请填写入口链接", trigger: "blur" }
        ]
      },
      id: ""
    };
  },
  watch: {
    "ruleForm.date": function(newVal, oldVal) {
      if (!newVal || newVal.length == 0) {
        this.ruleForm.startTime = "";
        this.ruleForm.endTime = "";
      }
    }
  },
  async mounted() {
    this.qiniuaddr = this.QiniuInfos.baseUrl;
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
    //新建金刚
    addItem() {
      this.dialogFormVisible = true;
      this.form.title = "";
      this.form.titleEng = "";
      this.form.image = "";
      this.form.entity = "";
    },
    async getListData() {
      this.loading = true;
      this.tableData = [];
      if (this.ruleForm.date && this.ruleForm.date.length > 0) {
        this.ruleForm.startTime = this.ruleForm.date[0];
        this.ruleForm.endTime = this.ruleForm.date[1];
      }
      let reqData = this.ruleForm;
      let res = await getKingKongList(reqData);
      if (res.code == 200) {
        this.tableData = res.data.results;
        this.pagination.total = res.data.total;
        this.loading = false;
        sortKey(this.tableData, "weight");
      } else {
        this.loading = false;
      }
    },

    handleClickEdit(row) {
      this.id = row.id;
      this.dialogFormVisible = true;
      this.form.title = row.title;
      this.form.titleEng = row.titleEng;
      this.form.entryLink = row.entryLink;
      this.form.image = row.image;
      this.$set(this.form, "id", row.id);
      this.$set(this.form, "weight", row.weight);
    },
    //创建\修改金刚
    confirmCreate(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let reqData = this.form;

          if (!this.id) {
            let res = await createKingKong(reqData);
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
            let res = await updateKingKong(reqData);
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
    uploadSuccess(response, file, fileList) {
      this.form.image = `${this.qiniuaddr}/${response.key}`;
    },
    uploadError(err, file, fileList) {
      this.$message.error("上传出错，请重试！");
    },
    beforeUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error("上传头像图片只能是 jpg、png、jpeg 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }

      this.zhCnQiniuData.key = `upload_pic_${file.name}`;
    }
  }
};
</script>
