<template>
  <div class="register-list">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <p>
      <router-link to="/InfoEdit">Go to About</router-link>
      <router-link :to="{name: 'InfoEdit'}">Vue双向绑定</router-link>
    </p>
    <router-view></router-view> -->
    <div class="ui-screen">
      <div class="ui-input">
          <el-input class="demo-input" v-model="input" placeholder="请输入合同名称"></el-input>
          <el-input class="demo-input" v-model="input" placeholder="请输入客户名称"></el-input>
          <el-select v-model="value" placeholder="是否可疑">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
          <el-input class="demo-input" v-model="input" placeholder="请输入经销商名称"></el-input>
          <el-input class="demo-input" v-model="input" placeholder="请输入车架编号"></el-input>
          <el-select v-model="value1" placeholder="是否已复核">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
      </div>
      <el-row class="ui-action">
          <el-button plain>重置</el-button>
          <el-button type="danger" plain>查询</el-button>
      </el-row>
    </div>
    <el-table :data="tableData" height="550" border style="width: 100%" @row-click="hreftwo(CONT_NAME)">
      <el-table-column fixed prop="CONT_NAME" label="合同名称" width="200">
      </el-table-column>
      <el-table-column prop="CUSTOMER_NAME" label="客户名称" width="280">
      </el-table-column>
      <el-table-column prop="distributor" label="经销商" width="280">
      </el-table-column>
      <el-table-column prop="frameNum" label="车架编号" width="300">
      </el-table-column>
      <el-table-column prop="carNum" label="车牌号" width="120">
      </el-table-column>
      <el-table-column prop="date" label="抵押日期" width="120">
      </el-table-column>
      <el-table-column prop="dubious" label="是否可疑" width="100">
      </el-table-column>
      <el-table-column prop="reviewed" label="已复核" width="100">
      </el-table-column>
    </el-table>

    <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  components: {},
  data: function () {
    return {
      options: [{
        value: '选项1',
        label: '可疑'
      }, {
        value: '选项2',
        label: '不可疑'
      }],
      value: '',
      options1: [{
        value: '选项1',
        label: '已复核'
      }, {
        value: '选项2',
        label: '未复核'
      }],
      value1: '',
      tableData: [{
        CONT_NAME: 'JFL21C02L061337-01',
        CUSTOMER_NAME: '嵊州市锡锋物流运输有限公司',
        distributor: '杭州美龙汽车有限公司',
        frameNum: 'LJRA12230JNC01255',
        carNum: '苏A·66666',
        date: '2020-12-23',
        dubious: '否',
        reviewed: '是'
      }, {
        CONT_NAME: 'JFL21C02L061337-01',
        CUSTOMER_NAME: '嵊州市锡锋物流运输有限公司',
        distributor: '杭州美龙汽车有限公司',
        frameNum: 'LJRA12230JNC01255',
        carNum: '苏A·66666',
        date: '2020-12-23',
        dubious: '否',
        reviewed: '是'
      }],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  setup () {
    return {
      input: ref('')
    }
  },
  methods: {
    hreftwo () {
      // 跳转页面
      this.$router.push({ path: '/InfoEdit' })
      // this.$router.push('/InfoEdit')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register-list{
    width: 1170px;
    box-sizing: border-box;
    padding: 50px 15px;
    margin: 0 auto;
  }
  .ui-screen{
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .ui-input{
    width: 70%;
  }
  .ui-action{
    margin-bottom: 16px;
  }
  .demo-input,
  .el-select{
    width: 24%;
    margin: 0 6% 16px 0;
  }
  .block{
    text-align: center;
    margin-top: 30px;
  }
  .el-table{
    margin-top: 20px;
  }
</style>
