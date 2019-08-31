<template>
    <div class="filter_wrap">
       <div>
           <label>账号：</label><span>{{nickname}}</span>
       </div>
       <div>
           <label>用户名：</label><span v-if="!updateUserName">{{username}}</span>
           <el-input style="width:300px;margin-right:20px;" size="small" v-model="username" v-if="updateUserName"></el-input>
           <el-button style="margin-left:20px;" @click="updateUserName = true" type="text" size="small" v-if="!updateUserName">修改</el-button>
           <el-button @click="saveUpateUser()" type="text" size="small" v-else>保存</el-button>
       </div>
       <div>
           <label>密码：</label><span>*****</span>
           <el-button @click="updatePass()" type="text" size="small" style="margin-left:20px;">修改</el-button>
       </div>
       <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="30%">
        <div>
            <el-form
            :model="ruleForm"
            :inline="true"
            ref="ruleForm"
            :rules="rules"
            label-width="80px"
            >  
                 <el-form-item>
                    <el-input  style="width:300px;" type="password" size="small" placeholder="旧密码" clearable v-model="ruleForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input style="width:300px;" type="password" size="small" placeholder="新密码" clearable v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="confirmpassword">
                    <el-input style="width:300px;" type="password" size="small" placeholder="确认新密码" clearable v-model="ruleForm.confirmpassword"></el-input>
                </el-form-item>
        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="search_btn" size="small" @click="saveUpatePass('ruleForm')">保存</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import { updateUser, updatePass } from '@/api/setting';
import { Message } from 'element-ui';
export default {
  data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.confirmpassword !== '') {
            this.$refs.ruleForm.validateField('confirmpassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
         nickname: '',
         username: '',
         updateUserName: false,
         dialogVisible: false,
         ruleForm: {
             password: '',
             confirmpassword: '',
             oldPassword: ''
         },
         rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          confirmpassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
  },
  methods: {
      saveUpatePass: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let reqData = {
                oldPassword: this.ruleForm.oldPassword,
                password: this.ruleForm.password
            }
            updatePass(reqData).then(
                (resData) => {
                   if (resData.code === 200) {
                       this.dialogVisible = false;
                       Message({message: resData.msg, type: 'success'});
                   } else {
                       Message({message: resData.msg, type: 'error'});
                   }
                },
                (err) => {
                    console.log('err', err);
                }
            )
          }
        })
      },
      updatePass: function () {
          this.ruleForm.password = '';
          this.ruleForm.confirmpassword = '';
          this.ruleForm.oldPassword = '';
          this.dialogVisible = true;
      },
      saveUpateUser: function () {
          let reqData = {
              username: this.username
          }
          updateUser(reqData).then(
            (resData) => {
                if (resData.code === 200) {
                    this.updateUserName = false;
                    Message({message: resData.msg, type: 'success'});
                } else {
                    Message({message: resData.msg, type: 'error'});
                }
            },
            (err) => {
                console.log('err', err);
            }
          )
      }
    },
    mounted () {
        this.username = this.$store.getters.user.username;
        this.nickname = this.$store.getters.user.nickname;
    }
  }
</script>
