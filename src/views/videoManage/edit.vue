<template>
  <div class="edit_notice">
    <el-row :gutter="20">
      <el-col :span="19">
        <div class="grid-content bg-purple">
          <el-form key="en" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="视频类型" :label-width="formLabelWidth" prop="videoType">
              <el-radio-group v-model="ruleForm.videoType">
                <el-radio label="VIDEO">单集视频</el-radio>
                <el-radio label="TV">电视剧</el-radio>
              </el-radio-group>
            </el-form-item>
            <div>
              <label class="name" for>视频名称</label>
              <el-form-item :label-width="formLabelWidth" label="中文名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" label="英文名称" prop="nameEng">
                <el-input v-model="ruleForm.nameEng"></el-input>
              </el-form-item>
            </div>
            <div>
              <label class="name" for>视频简介</label>
              <el-form-item :label-width="formLabelWidth" label="中文简介" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" label="英文简介" prop="titleEng">
                <el-input v-model="ruleForm.titleEng"></el-input>
              </el-form-item>
            </div>
            <div>
              <label class="name" for>基础信息</label>
              <div class="mul_box">
                <el-form-item :label-width="formLabelWidth" label="中文信息" prop="region">
                  <el-input v-model="ruleForm.region" placeholder="输入地区"></el-input>
                </el-form-item>
                <el-form-item label prop="director">
                  <el-input v-model="ruleForm.director" placeholder="输入导演"></el-input>
                </el-form-item>
                <el-form-item label prop="type">
                  <el-input v-model="ruleForm.type" placeholder="输入类型"></el-input>
                </el-form-item>
              </div>

              <div class="mul_box">
                <el-form-item :label-width="formLabelWidth" label="英文信息" prop="regionEng">
                  <el-input v-model="ruleForm.regionEng" placeholder="输入地区"></el-input>
                </el-form-item>
                <el-form-item label prop="directorEng">
                  <el-input v-model="ruleForm.directorEng" placeholder="输入导演"></el-input>
                </el-form-item>
                <el-form-item label prop="typeEng">
                  <el-input v-model="ruleForm.typeEng" placeholder="输入类型"></el-input>
                </el-form-item>
              </div>
            </div>
            <el-form-item :label-width="formLabelWidth" label="是否支持下载" prop="downloadAble">
              <el-radio-group v-model="ruleForm.downloadAble">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="视频位置" prop="station">
              <el-radio-group v-model="ruleForm.station">
                <el-radio label="TOP">顶部banner</el-radio>
                <el-radio label="BOTTOM">下方列表</el-radio>
              </el-radio-group>
            </el-form-item>
            <div>
              <label class="name" for>封面图片</label>
              <el-form-item :label-width="formLabelWidth" label="中文封面" prop="coverImg">
                <el-upload
                  key="zhcn"
                  class="avatar-uploader"
                  :action="domain"
                  :data="zhCnQiniuData"
                  :on-error="uploadError"
                  :on-success="uploadSuccess"
                  :before-upload="beforeAvatarUpload"
                  :show-file-list="false"
                >
                  <img v-if="ruleForm.coverImg" :src="ruleForm.coverImg" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" label="英文封面" prop="coverImgEng">
                <el-upload
                  key="en"
                  class="avatar-uploader"
                  :action="domain"
                  :data="enQiniuData"
                  :on-error="uploadErrorEn"
                  :on-success="uploadSuccessEn"
                  :before-upload="beforeAvatarUploadEn"
                  :show-file-list="false"
                >
                  <img v-if="ruleForm.coverImgEng" :src="ruleForm.coverImgEng" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="pic_tip">说明：顶部banenr 670*360，下方列表 330*190</div>
              </el-form-item>
            </div>

            <el-form-item class="footer_btn">
              <el-button type="default">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>    

<script>
import * as VideoApi from "@/api/video";

export default {
  components: {},
  data() {
    return {
      formLabelWidth: "100px",
      ruleForm: {
        name: "",
        nameEng: "",
        title: "",
        titleEng: "",
        region: "",
        regionEng: "",
        director: "",
        directorEng: "",
        type: "",
        typeEng: "",
        downloadAble: 1,
        station: "BOTTOM",
        coverImg: "",
        coverImgEng: "",
        videoType: "VIDEO"
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
        name: [{ required: true, message: "请输入中文名称", trigger: "blur" }],
        nameEng: [
          { required: true, message: "请输入英文名称", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入中文简介", trigger: "blur" }],
        titleEng: [
          { required: true, message: "请输入英文简介", trigger: "blur" }
        ],
        coverImg: [
          { required: true, message: "请上传中文封面", trigger: "change" }
        ],
        coverImgEng: [
          { required: true, message: "请上传英文封面", trigger: "change" }
        ],
        region: [{ required: true, message: "请输入区域", trigger: "blur" }],
        regionEng: [{ required: true, message: "请输入区域", trigger: "blur" }],
        director: [{ required: true, message: "请输入导演", trigger: "blur" }],
        directorEng: [
          { required: true, message: "请输入导演", trigger: "blur" }
        ],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        typeEng: [{ required: true, message: "请输入类型", trigger: "blur" }]
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
    async getDetail() {
      let res = await VideoApi.getItemDetail(this.id);
      if (res.code == 200) {
        console.log(res);
        let Data = res.data;
        this.ruleForm.name = Data.name;
        this.ruleForm.nameEng = Data.nameEng;
        this.ruleForm.title = Data.title;
        this.ruleForm.titleEng = Data.titleEng;
        this.ruleForm.coverImg = Data.coverImg;
        this.ruleForm.coverImgEng = Data.coverImgEng;
        this.ruleForm.station = Data.station;
        this.ruleForm.region = Data.region;
        this.ruleForm.regionEng = Data.regionEng;
        this.ruleForm.director = Data.director;
        this.ruleForm.directorEng = Data.directorEng;
        this.ruleForm.type = Data.type;
        this.ruleForm.typeEng = Data.typeEng;
        this.ruleForm.downloadAble = Data.downloadAble ? 1 : 0;
        this.ruleForm.videoType = Data.videoType;
        this.$set(this.ruleForm, "id", Data.id);

        this.$set(this.ruleForm, "status", Data.status);
        this.$set(this.ruleForm, "weight", Data.weight);
      }
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

      this.zhCnQiniuData.key = `upload_pic_${file.name}`;
    },
    beforeAvatarUploadEn(file) {
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

      this.enQiniuData.key = `en_upload_pic_${file.name}`;
    },
    uploadSuccess(response, file, fileList) {
      this.ruleForm.coverImg = `${this.qiniuaddr}/${response.key}`;
    },
    uploadError(err, file, fileList) {
      this.$message.error("上传出错，请重试！");
    },
    uploadSuccessEn(response, file, fileList) {
      this.ruleForm.coverImgEng = `${this.qiniuaddr}/${response.key}`;
    },
    uploadErrorEn(err, file, fileList) {
      this.$message.error("上传出错，请重试！");
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.id) {
            //修改
            let res = await VideoApi.updateVideo(this.ruleForm);
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.$router.go(-1);
            } else {
              this.$message.error("修改失败，请重试");
            }
          } else {
            let res = await VideoApi.createVideo(this.ruleForm);
            if (res.code == 200) {
              this.$message.success("创建成功");
              this.$router.go(-1);
            } else {
              this.$message.error("创建失败，请重试");
            }
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>  
