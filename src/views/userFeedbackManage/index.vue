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
        <el-form-item label="用戶昵称">
          <el-input size="small" clearable v-model="ruleForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input size="small" clearable v-model="ruleForm.contact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="反馈时间">
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
        <el-button class="search_btn" size="small" type="primary" @click="getUserFeedList">查询</el-button>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="反馈id"></el-table-column>
        <el-table-column prop="user.nickname" label="用户昵称"></el-table-column>
        <el-table-column label="反馈内容" width="180">
            <template slot-scope="scope" >
                <span class="space-nowrap">{{scope.row.content}}</span><el-button @click="checkContent(scope.row)" style="float:right;" type="text" size="small">查看</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="contact" label="联系方式"></el-table-column>
        <el-table-column prop="usr.mailbox" label="反馈时间"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 'finish'" type="text" size="small">已解决</el-button>
            <el-button v-else @click="handleClick(scope.row)" type="text" size="small">解决</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="反馈内容详情"
        :visible.sync="dialogVisible"
        width="30%">
        <div class="filter_wrap" v-if="currentData">{{currentData.content}}</div>
        <span slot="footer" class="dialog-footer">
            <el-button class="search_btn" size="small" @click="dialogVisible = false">关闭</el-button>
        </span>
    </el-dialog>
  </div>
</template>    


<script>
import { getUsersFeedList, updateStatus } from '@/api/userFeedbackManage'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      ruleForm: {
        nickname: "",
        contact: "",
        date: "",
        startTime: '',
        endTime: ''
      },
       tableData: [],
       currentData: null,
       dialogVisible: false
    };
  },
  methods: {
    getUserFeedList: function () {
      let reqData = {
            nickname: this.ruleForm.nickname,
            contact: this.ruleForm.contact,
            startTime: '',
            endTime: ''
      }  
      getUsersFeedList(reqData).then(
          (resData) => {
            let Data = resData.data;
            if (Data && resData.code === 200) {
                this.tableData = Data.results;
            }
          },
          (err) => {
              console.log('err', err);
          }
      )
    },
    handleClick: function(data) {
        updateStatus(data.id).then(
            (resData) => {
                if (resData.code === 200) {
                   Message({message: resData.msg, type: 'success'})
                } else {
                   Message({message: resData.msg, type: 'error'})  
                }
            },
            (err) => {
                console.log('err', err);
            }
        )
    },
    checkContent: function (data) {
       this.currentData = data;
       this.dialogVisible = true
    }
  },
  mounted() {
      this.getUserFeedList();
  }
};
</script>


<style lang="scss" scoped>
.space-nowrap {
    width: 120px;
    display: inline-block;
    overflow: hidden;
    /*文本不会换行*/
    white-space: nowrap;
    /*当文本溢出包含元素时，以省略号表示超出的文本*/
    text-overflow: ellipsis;
}
</style>