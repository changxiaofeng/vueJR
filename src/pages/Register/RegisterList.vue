<template>
  <div class="register-list">
    <!-- <h1>{{ msg }}</h1> -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">登记证列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="ui-screen">
      <div class="ui-input">
          <el-input class="demo-input" v-model="CONT_NAME" placeholder="请输入合同名称"></el-input>
          <el-input class="demo-input" v-model="CUST_NAME" placeholder="请输入客户名称"></el-input>
          <el-select v-model="IS_SUSPICIOUS" placeholder="是否可疑">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
          <el-input class="demo-input" v-model="DEALER_NAME" placeholder="请输入经销商名称"></el-input>
          <el-input class="demo-input" v-model="VIN" placeholder="请输入车架编号"></el-input>
          <el-select v-model="IS_CHECKED" placeholder="是否已复核">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
          <el-select v-model="DEPT" placeholder="部门">
              <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
      </div>
      <el-row class="ui-action">
          <el-button plain @click="toReset()">重置</el-button>
          <el-button type="danger" plain @click="queryOcrList()">查询</el-button>
      </el-row>
    </div>
    <el-table :data="tableData" height="550" border style="width: 100%" @row-click="hreftwo">
      <el-table-column fixed prop="PK_VEHICLE_REGISTRATION_BOOK" label="" width="200" v-if="show">
      </el-table-column>
      <el-table-column fixed prop="CONT_NAME" label="合同名称" width="200">
      </el-table-column>
      <el-table-column prop="CUST_NAME" label="客户名称" width="280">
      </el-table-column>
      <el-table-column prop="DEPT" label="部门" :formatter="formdept" width="280">
      </el-table-column>
      <el-table-column prop="DEALER_NAME" label="经销商" width="280">
      </el-table-column>
      <el-table-column prop="VIN" label="车架编号" width="300">
      </el-table-column>
      <el-table-column prop="CAR_NUMBER" label="车牌号" width="120">
      </el-table-column>
      <el-table-column prop="MORTGAGE_DATE" label="抵押日期" width="120">
      </el-table-column>
      <el-table-column prop="IS_SUSPICIOUS" label="是否可疑" :formatter="formatter" width="100">
      </el-table-column>
      <el-table-column prop="IS_CHECKED" label="已复核" :formatter="formchecked" width="100">
      </el-table-column>
    </el-table>
    <PageComp :totalCount="pageTotal.totalCount" @pageChange="pageChange" :pageNo="pageTotal.pageNo"></PageComp>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import PageComp from '@/components/PageComponent.vue'
export default defineComponent({
  name: 'RegisterList',
  components: {
    PageComp
  },
  data: function () {
    return {
      value1: false,
      options: [{
        value: '',
        label: '请选择是否可疑'
      }, {
        value: '1',
        label: '可疑'
      }, {
        value: '0',
        label: '不可疑'
      }],
      value: '',
      options1: [{
        value: '',
        label: '请选择是否复核'
      }, {
        value: '1',
        label: '已复核'
      }, {
        value: '0',
        label: '未复核'
      }],
      department: [{
        value: '',
        label: '请选择部门'
      }, {
        value: '15',
        label: '厂融部'
      }, {
        value: '19',
        label: '汽车金融部'
      }],
      PK_VEHICLE_REGISTRATION_BOOK: '',
      CONT_NAME: '',
      CUST_NAME: '',
      IS_SUSPICIOUS: '',
      DEALER_NAME: '',
      VIN: '',
      IS_CHECKED: '',
      DEPT: '',
      PAGE_SIZE: '',
      tableData: [],
      pageTotal: {
        pageNo: 1, // 当前页数
        pageSize: 10, // 每页显示条数
        totalCount: 0 // 条目总数
      }
    }
  },
  setup () {
    return {
      input: ref('')
    }
  },
  mounted () {
    this.queryOcrList()
  },
  methods: {
    // 分页
    pageChange (item) {
      this.pageTotal.pageNo = item.pageNo
      this.pageTotal.pageSize = item.pageSize
      this.queryOcrList() // 改变页码，重新渲染页面
    },
    hreftwo (row, column, event) {
      // 跳转页面
      this.$router.push({ path: '/InfoEdit', query: { PK_VEHICLE_REGISTRATION_BOOK: row.PK_VEHICLE_REGISTRATION_BOOK } })
    },
    // 列表查询
    queryOcrList () {
      // this.$get('/mock/queryOcrList.json', {
      this.$post('/ocr/queryOcrList.do', {
        CONT_NAME: this.CONT_NAME,
        CUST_NAME: this.CUST_NAME,
        IS_SUSPICIOUS: this.IS_SUSPICIOUS,
        DEALER_NAME: this.DEALER_NAME,
        VIN: this.VIN,
        IS_CHECKED: this.IS_CHECKED,
        DEPT: this.DEPT,
        PAGE_SIZE: this.pageTotal.pageSize + '',
        NEXT_KEY: this.pageTotal.pageNo + ''
      }).then(res => {
        this.tableData = res.LIST
        this.pageTotal.pageSize = parseInt(res.PAGE_NUM)
        this.pageTotal.totalCount = parseInt(res.TOTAL_NUM)
      })
    },
    // 重置查询条件
    toReset () {
      this.CONT_NAME = ''
      this.CUST_NAME = ''
      this.IS_SUSPICIOUS = ''
      this.DEALER_NAME = ''
      this.VIN = ''
      this.IS_CHECKED = ''
      this.DEPT = ''
      // this.PAGE_SIZE = ''
      // this.NEXT_KEY = ''
    },
    formatter (row, column) {
      if (row.IS_SUSPICIOUS === '1') {
        return '是'
      } else {
        return '否'
      }
    },
    formchecked (row, column) {
      if (row.IS_CHECKED === '1') {
        return '是'
      } else {
        return '否'
      }
    },
    // 部门
    formdept (row, column) {
      if (row.DEPT === '15') {
        return '厂融部'
      } else if (row.DEPT === '19') {
        return '汽车金融部'
      }
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-breadcrumb {
    margin-bottom: 30px;
  }
  .register-list{
    width: 1170px;
    box-sizing: border-box;
    padding: 0 15px;
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
  .el-table{
    margin-top: 20px;
  }
</style>
