<template>
  <div class="edit_notice">
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
      <el-tab-pane label="英文公告" name="en"></el-tab-pane>
      <el-tab-pane label="中文公告" name="zh-CN"></el-tab-pane>
    </el-tabs>

    <!-- 英文公告 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
      v-if="activeName == 'en'"
    >
      <el-form-item label="英文标题" prop="name">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="公告头图" prop="name">
        <el-upload
          class="avatar-uploader"
          action="/api/upload/"
          :show-file-list="false"
          :on-success="handleEnPicSuccess"
          :before-upload="beforeEnPicUpload"
        >
          <img v-if="ruleForm.imageEng" :src="ruleForm.imageEng" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="生效时间" prop="name">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容编辑" prop="content">
        <Tinymce ref="editor" v-model="ruleForm.contentEng" :height="400" />
       
      </el-form-item>
      <el-form-item>
        <el-button type="warning">预览</el-button>
        <el-button type="primary">保存</el-button>
        <el-button type="default">取消</el-button>
      </el-form-item>
    </el-form>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
      v-else
    >
      <el-form-item label="中文标题" prop="name">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="公告头图" prop="name">
        <el-upload
          action="/api/upload/"
          list-type="picture-card"
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="ruleForm.image" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="生效时间" prop="name">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容编辑" prop="name">
        <div class="editor-container">
          <Tinymce ref="editor" v-model="ruleForm.contentEng" :height="400" />
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>    

<script>
import * as NoticeApi from '@/api/notice'
import Tinymce from '@/components/Tinymce'


export default {
  components:{Tinymce},
  data() {
    return {
      activeName: "en",
      ruleForm: {
        status: "OFFLINE",
        weight: 0,
        title: "",
        titleEng: "",
        image: "",
        imageEng: "",
        content: "新建公告测试10",
        contentEng: "new notice test 10"
      },
      rules: {},
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  mounted(){
    
  },
  methods: {
    onEditorReady(editor) {
      },
    handleClick(name) {
      this.activeName = name;
    },
    handleEnPicSuccess(res, file) {
      this.ruleForm.imageEng = URL.createObjectURL(file.raw);
    },
    beforeEnPicUpload() {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handlePictureCardPreview() {},
    handleRemove() {}
  }
};
</script>  

<style lang="scss">
</style>