<template>
  <div class="edit_notice">
    <el-row :gutter="20">
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
            <el-tab-pane label="英文新闻" name="en"></el-tab-pane>
            <el-tab-pane label="中文新闻" name="zh-CN"></el-tab-pane>
          </el-tabs>
          <!-- 英文新闻 -->
          <el-form
            key="en"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="80px"
            class="demo-ruleForm"
          >
            <div v-show="activeName == 'en'">
              <el-form-item label="英文标题" prop="titleEng">
                <el-input v-model="ruleForm.titleEng"></el-input>
              </el-form-item>
              <el-form-item label="新闻位置" prop="titleEng">
                <el-radio-group v-model="ruleForm.station">
                  <el-radio label="TOP">顶部banner</el-radio>
                  <el-radio label="BOTTOM">下方列表</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="新闻头图" prop="imageEng">
                <el-upload
                  key="en"
                  class="avatar-uploader"
                  :action="domain"
                  :data="enQiniuData"
                  :on-error="uploadErrorEn"
                  :on-success="uploadSuccessEn"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                >
                  <img v-if="ruleForm.imageEng" :src="ruleForm.imageEng" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="生效时间" prop="date">
                <el-date-picker
                  key="en"
                  size="small"
                  v-model="ruleForm.date"
                  value-format="timestamp"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '08:00:00']"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="内容编辑" prop="contentEng">
                <Tinymce ref="editor" v-model="ruleForm.contentEng" :height="200" />
              </el-form-item>
            </div>
            <div v-show="activeName == 'zh-CN'">
              <el-form-item label="中文标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item label="新闻位置" prop="titleEng">
                <el-radio-group v-model="ruleForm.station">
                  <el-radio label="TOP">顶部banner</el-radio>
                  <el-radio label="BOTTOM">下方列表</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="新闻头图" prop="image">
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
                  <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="生效时间" prop="date">
                <el-date-picker
                  key="zhcn"
                  size="small"
                  v-model="ruleForm.date"
                  value-format="timestamp"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '08:00:00']"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="内容编辑" prop="content">
                <div class="editor-container">
                  <Tinymce ref="editor" v-model="ruleForm.content" :height="200" />
                </div>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="warning">预览</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button type="default">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="pre_view_wrap">
            <h4>预览区</h4>
            <div v-if="activeName == 'en'" class="pre_view" v-html="ruleForm.contentEng"></div>
            <div v-else class="pre_view" v-html="ruleForm.content"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>    

<script>
import * as NewsApi from "@/api/news";
import Tinymce from "@/components/Tinymce";

export default {
  components: { Tinymce },
  data() {
    return {
      activeName: "en",
      ruleForm: {
        title: "",
        titleEng: "",
        image: "",
        imageEng: "",
        content: "",
        contentEng: "",
        date: [],
        startTime: "",
        endTime: "",
        station: "BOTTOM"
      },
      zhCnQiniuData: {
        key: "", //图片名字处理
        token: this.QiniuInfos.token //七牛云token
      },
      enQiniuData: {
        key: "", //图片名字处理
        token: this.QiniuInfos.token //七牛云token
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        titleEng: [{ required: true, message: "请输入标题", trigger: "blur" }],
        image: [{ required: true, message: "请上传图片", trigger: "change" }],
        imageEng: [
          { required: true, message: "请上传图片", trigger: "change" }
        ],
        content: [{ required: true, message: "请输入内容", trigger: "change" }],
        date: [{ required: true, message: "请选择时间", trigger: "change" }],
        content: [{ required: true, message: "请输入内容", trigger: "change" }],
        contentEng: [
          { required: true, message: "请输入内容", trigger: "change" }
        ]
      },
      qiniuaddr: "", //图片上传的地址
      dialogVisible: false,
      dialogImageUrl: "",
      domain: "https://up-z1.qiniup.com", // 七牛云的上传地址（华南区）
      qiniuaddr: "http://xxxx.com", // 七牛云的图片外链地址
      id: "",
      type: ""
    };
  },
  mounted() {
    this.qiniuaddr = this.QiniuInfos.baseUrl;
    this.id = this.$route.params.id;
    this.type = this.$route.params.type;
    if (this.id) {
      this.getDetail();
    }
  },
  methods: {
    onEditorReady(editor) {},
    handleClick(name) {
      this.activeName = name;
    },
    async getDetail() {
      let res = await NewsApi.getItemDetail(this.id);
      if (res.code == 200) {
        console.log(res);
        let Data = res.data;
        this.ruleForm.title = Data.title;
        this.ruleForm.titleEng = Data.titleEng;
        this.ruleForm.image = Data.image;
        this.ruleForm.imageEng = Data.imageEng;
        this.ruleForm.station = Data.station;
        this.ruleForm.content = Data.content;
        this.ruleForm.contentEng = Data.contentEng;
        this.ruleForm.date.push(Data.startTime);
        this.ruleForm.date.push(Data.endTime);
        this.ruleForm.startTime = Data.startTime;
        this.ruleForm.endTime = Data.endTime;
        this.$set(this.ruleForm, "id", Data.id);
        this.$set(this.ruleForm, "type", Data.type);
        this.$set(this.ruleForm, "status", Data.status);
        this.$set(this.ruleForm, "weight", Data.weight);
      }
    },
    beforeUpload(file) {
      this.beforeAvatarUpload(file);
    },
    beforeAvatarUpload(file) {
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
      if (this.activeName === "en") {
        this.enQiniuData.key = `en_upload_pic_${file.name}`;
      } else {
        this.zhCnQiniuData.key = `zh-cn_upload_pic_${file.name}`;
      }
    },
    uploadSuccessEn(response, file, fileList) {
      this.ruleForm.imageEng = `${this.qiniuaddr}/${response.key}`;
    },
    uploadSuccess(response, file, fileList) {
      this.ruleForm.image = `${this.qiniuaddr}/${response.key}`;
    },
    uploadErrorEn(err, file, fileList) {
      this.$message.error("上传出错，请重试！");
    },
    uploadError(err, file, fileList) {
      this.$message.error("上传出错，请重试！");
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.ruleForm.startTime = this.ruleForm.date[0];
          this.ruleForm.endTime = this.ruleForm.date[1];

          if (this.id) {
            //修改
            let res = await NewsApi.updateNews(this.ruleForm);
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.$router.go(-1);
            } else {
              this.$message.error("修改失败，请重试");
            }
          } else {
            let res = await NewsApi.createNews(this.ruleForm);
            if (res.code == 200) {
              this.$message.success("创建成功");
              this.$router.go(-1);
            } else {
              this.$message.error("创建失败，请重试");
            }
          }
        } else {
          this.$message.error("请检查中英文是否填写完整");
          return false;
        }
      });
    }
  }
};
</script>  
