<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Basic</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/data' }"><a href="javascript:void(0)">Data</a></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/navigation' }">Navigation</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/cookie' }">Cookie</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <!--
    Breadcrumb Item Attributes
参数	说明	类型	可选值	默认值
to	路由跳转对象，同 vue-router 的 to	string/object	—	—
replace	在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录	boolean	—	false


  -->
</template>

<script>
  export default {
    methods: {

    },
    data() {
      return {

      };
    }
  }
</script>


