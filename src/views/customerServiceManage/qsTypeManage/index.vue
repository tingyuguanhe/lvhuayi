<template>
  <div>
    <div>
      <el-button size="small" v-if="tableData.length < 20" type="primary" @click="addItem()">新建问题类型</el-button>

      <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column fixed prop="id" label="排序" width="70"></el-table-column>

        <el-table-column prop="typeName" label="中文名称"></el-table-column>
        <el-table-column label="英文名称" width="120">
          <template slot-scope="scope">{{scope.row.typeNameEng}}</template>
        </el-table-column>
        <el-table-column prop="weight" label="权重" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight" @change="changeWeight(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.createTime | formatFullDate}}</template>
        </el-table-column>

        <el-table-column prop="configureUser.nickname" label="管理员" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClickEdit(scope.row)">修改</el-button>

            <el-button
              type="text"
              size="small"
              @click="handleClickDelete(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加、编辑 -->
    <el-dialog title="问题类型管理" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="formRules">
        <el-form-item label="中文类型名称" :label-width="formLabelWidth" prop="typeName">
          <el-input v-model="form.typeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文类型名称" :label-width="formLabelWidth" prop="typeNameEng">
          <el-input v-model="form.typeNameEng" autocomplete="off"></el-input>
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
  getQsTypeList,
  createQsType,
  updateWeight,
  delItem,
  updateQsType
} from "@/api/customerService";

import { allStatus, sortKey } from "@/utils";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "130px",
      loading: false,

      tableData: [],

      form: {
        typeName: "",
        typeNameEng: ""
      },
      formRules: {
        typeName: [
          { required: true, message: "请填写中文名称", trigger: "blur" },
          { min: 1, max: 8, message: "最多 8 个字", trigger: "blur" }
        ],
        typeNameEng: [
          { required: true, message: "请填写英文名称", trigger: "blur" }
        ]
      },
      id: ""
    };
  },
  async mounted() {
    this.getListData();
  },
  methods: {
    //新建问题类型
    addItem() {
      this.dialogFormVisible = true;
      this.form.typeName = "";
      this.form.typeNameEng = "";
    },
    async getListData() {
      this.loading = true;
      this.tableData = [];
     
      let reqData = this.ruleForm;
      let res = await getQsTypeList(reqData);
      if (res.code == 200) {
        this.tableData = res.data;
        this.loading = false;
        sortKey(this.tableData, "weight");
      } else {
        this.loading = false;
      }
    },

    handleClickEdit(row) {
      this.id = row.id;
      this.dialogFormVisible = true;
      this.form.typeName = row.typeName;
      this.form.typeNameEng = row.typeNameEng;
      this.$set(this.form, "id", row.id);
      this.$set(this.form, "weight", row.weight);
    },
    //创建\修改问题类型
    confirmCreate(formName) {
      
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let reqData = this.form;

          if (!this.id) {
            let res = await createQsType(reqData);
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
            let res = await updateQsType(reqData);
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