<template>
    <div>
        <el-form
          :model="ruleForm"
          :inline="true"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
            <el-form-item label="用户名">
                <el-input size="small" clearable v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="注册邮箱">
                <el-input size="small" clearable v-model="ruleForm.mailbox"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="search_btn" size="small" type="primary" @click="getUsersList">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="filter_wrap" v-if="isShow">
            <div class="m-bottom20">
              <p><span>用户姓名：</span>{{ruleForm.username}}</p>
              <p><span>注册邮箱：</span>{{ruleForm.mailbox}}</p>
            </div>
            
            <p>原APP历史记录：</p>
            <div v-if="historyList.length > 0">
                <div class="history-item" v-for="(item, i) in historyList" :key="i">
                   <p><span v-text="item.title"></span><span style="margin-left:20px;">{{item.creatTime | formatFullDate}}</span></p>
                   <p style="border-bottom:1px solid #eee;" class="remain">aaaa</p> 
                </div>
            </div>
            <div v-else>暂无数据！</div>
        </div>
    </div>
</template>


<script>
import { getUsersList, getHistoryList } from '@/api/userManage'
export default {
    data(){
        return{
           ruleForm: {
               username: '',
               mailbox: ''
           },
           isShow: false,
           historyList: [],
           userId: ''
        }
    },
    methods:{
        getUsersList: function () {
           getUsersList(this.ruleForm).then(
               (resData) => {
                  let Data = resData.data;
                  if (resData.code === 200 && Data) {
                      this.isShow = true;
                      this.userId = Data.results[0] && Data.results[0].id
                      this.getHistoryList();
                  }
               },
               (err) => {
                   console.log('err', err);
               }
           )
        },
        getHistoryList: function () {
            getHistoryList('1').then(
                (resData) => {
                   let Data = resData.data;
                   if (Data && resData.code === 200) {
                       this.historyList = Data;
                   }
                },
                (err) => {
                    console.log('err', err);
                }
            )
        }
    }
}
</script>
<style lang="scss" scoped>
.history-item {
    font-size: 12px;
}
.remain{
    color: #e0e0e0;
}
</style>
