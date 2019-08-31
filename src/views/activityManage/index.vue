<template>
    <div>活动管理
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
            this.$router.push({name: 'editActivity'})
        }
    }
}
</script>