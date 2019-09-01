<template>
  <el-dialog
    :title="`查看${title}`"
    :visible.sync="visible"
    @close="$emit('update:dialogShow', false)"
    width="70%"
  >
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="pre_view_wrap">
            <h4>英文{{title}}</h4>
            <div class="pre_view">
              <p v-html="currentRow.contentEng"></p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <div class="pre_view_wrap">
            <h4>中文{{title}}</h4>
            <div class="pre_view">
              <p v-html="currentRow.content"></p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>


<script>
export default {
  props:{
      dialogShow:{
          type: Boolean,
          default: false
      },
      currentRow: {
          type: Object,
          default: ()=>{}
      },
      title:{
          type:String,
          default:""
      }
  },
  data() {
    return {
      visible: false
    };
  },
  watch: {
    dialogShow() {
      //注意要随时监控
      this.visible = this.dialogShow;
    }
  }
};
</script>