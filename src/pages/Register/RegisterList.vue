<template>
  <div class="register-list">
    <!-- <h1>{{ msg }}</h1> -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">登记证列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="ui-screen">
      <div class="ui-input">
          <el-input class="demo-input" v-model="queryOcrData.CONT_NAME" placeholder="请输入合同名称"></el-input>
          <el-input class="demo-input" v-model="queryOcrData.CUST_NAME" placeholder="请输入客户名称"></el-input>
          <el-select v-model="queryOcrData.IS_SUSPICIOUS" placeholder="是否可疑">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
          <el-input class="demo-input" v-model="queryOcrData.DEALER_NAME" placeholder="请输入经销商名称"></el-input>
          <el-input class="demo-input" v-model="queryOcrData.VIN" placeholder="请输入车架编号"></el-input>
          <el-select v-model="queryOcrData.IS_CHECKED" placeholder="是否已复核">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
          <el-select v-model="queryOcrData.DEPT" placeholder="部门">
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
      queryOcrListParams: {},
      queryOcrData: {
        CONT_NAME: '',
        CUST_NAME: '',
        IS_SUSPICIOUS: '',
        DEALER_NAME: '',
        VIN: '',
        IS_CHECKED: '',
        DEPT: ''
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
      const userJsonStr = sessionStorage.getItem('queryOcrData')
      this.queryOcrListParams = JSON.parse(userJsonStr)
      this.queryOcrData = this.queryOcrListParams
      this.page.pageNo = parseInt(this.queryOcrListParams.NEXT_KEY)
      this.page.pageSize = parseInt(this.queryOcrListParams.PAGE_SIZE)
      this.pageshow = false
    } else {
      this.queryOcrListParams = this.queryOcrData
      this.queryOcrListParams.PAGE_SIZE = this.page.pageSize + ''
      this.queryOcrListParams.NEXT_KEY = this.page.pageNo + ''
    }
    this.queryOcrList()
    this.$nextTick(() => {
      this.pageshow = true
    })
  },
  methods: {
    hreftwo (row) {
      // 跳转详情页面页面
      let screenData = {}
      screenData = this.queryOcrData
      screenData.PAGE_SIZE = this.page.pageSize + ''
      screenData.NEXT_KEY = this.page.pageNo + ''
      sessionStorage.setItem('queryOcrData', JSON.stringify(screenData))
      this.$router.push({ path: '/InfoEdit', query: { PK_VEHICLE_REGISTRATION_BOOK: row.PK_VEHICLE_REGISTRATION_BOOK } })
    },
    // 列表查询
    queryOcrList () {
      console.log(this.queryOcrListParams)
      // this.$get('/mock/queryOcrList.json', this.queryOcrListParams).then(res => {
      this.$post('/ocr/queryOcrList.do', this.queryOcrListParams).then(res => {
        this.tableData = res.LIST
        this.page.totalCount = parseInt(res.TOTAL_NUM)
      })
    },
    // 重置查询条件
    toReset () {
      this.queryOcrData.CONT_NAME = ''
      this.queryOcrData.CUST_NAME = ''
      this.queryOcrData.IS_SUSPICIOUS = ''
      this.queryOcrData.DEALER_NAME = ''
      this.queryOcrData.VIN = ''
      this.queryOcrData.IS_CHECKED = ''
      this.queryOcrData.DEPT = ''
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
    },
    handleSizeChange (val) {
      this.page.pageSize = val
      this.queryOcrListParams.PAGE_SIZE = val + ''
      this.queryOcrList() // 改变页码，重新渲染页面
    },
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.queryOcrListParams.NEXT_KEY = val + ''
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
  .page_controller {
    margin: 20px;
    box-sizing: content-box;
  }
</style>
