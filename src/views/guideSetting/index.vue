<template>
    <div>引导配置
        <el-button @click="eidt">编辑</el-button>
    </div>
</template>


<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        eidt(){
            this.$router.push({name: 'editGuide'})
        }
    }
}
</script>