<template>
    <div>新闻下发
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
            this.$router.push({name: 'editNews'})
        }
    }
}
</script>