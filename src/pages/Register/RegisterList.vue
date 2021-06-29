<template>
  <div class="register-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">登记证列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="queryOcrData" ref="queryOcrData" class="demo-form-inline">
      <el-form-item prop="CONT_NAME">
        <el-input v-model="queryOcrData.CONT_NAME" placeholder="请输入合同名称"></el-input>
      </el-form-item>
      <el-form-item prop="CUST_NAME">
        <el-input v-model="queryOcrData.CUST_NAME" placeholder="请输入客户名称"></el-input>
      </el-form-item>
      <el-form-item prop="DEALER_NAME">
        <el-input v-model="queryOcrData.DEALER_NAME" placeholder="请输入经销商名称"></el-input>
      </el-form-item>
      <el-form-item prop="VIN">
        <el-input v-model="queryOcrData.VIN" placeholder="请输入车架编号"></el-input>
      </el-form-item>
      <el-form-item prop="IS_SUSPICIOUS">
        <el-select v-model="queryOcrData.IS_SUSPICIOUS" placeholder="是否可疑">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="IS_CHECKED">
        <el-select v-model="queryOcrData.IS_CHECKED" placeholder="是否已复核">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="DEPT">
        <el-select v-model="queryOcrData.DEPT" placeholder="部门">
          <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="ui-action">
        <el-button @click="toReset('queryOcrData')">重置</el-button>
        <el-button type="primary" @click="queryOcrList()">查询</el-button>
      </el-form-item>
    </el-form>
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
    <div class="page_controller">
      <el-pagination
        v-if="pageshow"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNo"
        :page-sizes="pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper,"
        :total="page.totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import PageComp from '@/components/PageComponent.vue'
export default defineComponent({
  name: 'RegisterList',
  components: {
    // PageComp
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
      queryOcrData: {
        CONT_NAME: '',
        CUST_NAME: '',
        IS_SUSPICIOUS: '',
        DEALER_NAME: '',
        VIN: '',
        IS_CHECKED: '',
        DEPT: '',
        NEXT_KEY: '1',
        PAGE_SIZE: '10'
      },
      PK_VEHICLE_REGISTRATION_BOOK: '',
      PAGE_SIZE: '',
      tableData: [],
      pageSizes: [10, 20, 50, 100],
      page: {
        pageNo: 1, // 当前页数
        pageSize: 10,
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
    if (this.$route.query.pageType === '1') {
      const screenData = sessionStorage.getItem('screenData')
      if (screenData) {
        this.queryOcrData = JSON.parse(screenData)
        this.page.pageNo = parseInt(this.queryOcrData.NEXT_KEY)
        this.page.pageSize = parseInt(this.queryOcrData.PAGE_SIZE)
        this.pageshow = false
      }
    } else {}
    this.queryOcrList()
    this.$nextTick(() => {
      this.pageshow = true
    })
  },
  methods: {
    // 跳转详情页面
    hreftwo (row) {
      sessionStorage.setItem('screenData', JSON.stringify(this.queryOcrData))
      this.$router.push({ path: '/InfoEdit', query: { PK_VEHICLE_REGISTRATION_BOOK: row.PK_VEHICLE_REGISTRATION_BOOK } })
    },
    // 列表查询
    queryOcrList () {
      this.$post('/ocr/queryOcrList.do', this.queryOcrData).then(res => {
        this.tableData = res.LIST
        this.page.totalCount = parseInt(res.TOTAL_NUM)
        if (sessionStorage.getItem('screenData')) {
          sessionStorage.removeItem('screenData')
        }
      })
    },
    // 重置查询条件
    toReset (formName) {
      this.$refs[formName].resetFields()
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
    },
    handleSizeChange (val) {
      this.page.pageSize = val
      this.queryOcrData.PAGE_SIZE = val + ''
      this.queryOcrList() // 改变页码，重新渲染页面
    },
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.queryOcrData.NEXT_KEY = val + ''
      this.queryOcrList() // 改变页码，重新渲染页面
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
  .el-form--inline{
    text-align: left;
  }
  .el-form--inline .el-form-item{
    width: 200px;
    margin-right: 50px;
  }
  .el-form--inline .ui-action{
    margin-right: 0;
    float: right;
    text-align: right;
  }
  .el-table{
    margin-top: 20px;
  }
  .page_controller {
    margin: 20px;
    box-sizing: content-box;
  }
</style>
