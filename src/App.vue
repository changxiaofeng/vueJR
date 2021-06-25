<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1">登记证确认</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
          <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
          <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data: function () {
    return { }
  },
  mounted: function () {
  }
}
</script>

<style>
@media (min-width: 768px){
    .el-main {
        width: 750px;
    }
}
@media (min-width: 992px){
    .el-main {
        width: 970px;
    }
}
@media (min-width: 1200px){
    .el-main {
        width: 1400px;
    }
}
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.el-header{
  padding: 0;
}
.el-menu{
  padding: 0 100px;
}
.el-main{
  padding: 60px 120px;
  margin: 0 auto;
}
</style>
