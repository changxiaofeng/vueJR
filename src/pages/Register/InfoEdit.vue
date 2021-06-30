<template>
  <div class="infoEdit">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item @click="goListPage">登记证列表</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">登记证信息修改</a></el-breadcrumb-item>
    </el-breadcrumb>123
    <el-form :label-position="labelPosition" label-width="80px" :model="formformInline">
      <h2>基本信息</h2>
      <el-form-item label="合同名称" prop="CONT_NAME">
        <el-input v-model="formformInline.CONT_NAME" placeholder="请输入合同名称" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="CAR_NUMBER">
        <el-input v-model="formformInline.CAR_NUMBER" placeholder="请输入车牌号" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="CUST_NAME">
        <el-input v-model="formformInline.CUST_NAME" placeholder="请输入客户名称" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="车架编号" prop="VIN">
        <el-input v-model="formformInline.VIN" placeholder="请输入车架编号" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="经销商名称:" prop="DEALER_NAME">
        <el-input v-model="formformInline.DEALER_NAME" placeholder="请输入经销商名称:" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="抵押日期:" prop="MORTGAGE_DATE">
        <el-input v-model="formformInline.MORTGAGE_DATE" placeholder="请输入车架编号" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formLabelAlign" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h2>图1信息</h2>
      <el-form-item label="图片正反面" prop="IMAGE1_TYPE" class="basicInfo">
          <el-radio-group v-model="formLabelAlign.IMAGE1_TYPE" @change="image1Type">
            <el-radio :label="0">正面</el-radio>
            <el-radio :label="1">反面</el-radio>
            <el-radio :label="2">未知</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="编号" prop="IMAGE1_ITEM1S">
        <el-input v-model="formLabelAlign.IMAGE1_ITEM1S" placeholder="请输入编号"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="IMAGE1_ITEM3">
        <el-input v-model="formLabelAlign.IMAGE1_ITEM3" placeholder="请输入车牌号"></el-input>
      </el-form-item>
      <el-form-item label="登记机关" prop="IMAGE1_ITEM2">
        <el-input v-model="formLabelAlign.IMAGE1_ITEM2" placeholder="请输入登记机关"></el-input>
      </el-form-item>
      <el-form-item label="车架编号" prop="IMAGE1_ITEM4">
        <el-input v-model="formLabelAlign.IMAGE1_ITEM4" placeholder="请输入车架编号"></el-input>
      </el-form-item>
      <el-form-item label="登记证书编号" prop="IMAGE1_ITEM1S">
        <el-input v-model="formLabelAlign.IMAGE1_ITEM1S" placeholder="请输入登记证书编号"></el-input>
      </el-form-item>
      <el-form-item label="抵押日期" prop="IMAGE1_ITEM6">
        <el-date-picker
          v-model="formLabelAlign.IMAGE1_ITEM6"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="图片" prop="IMAGE1_PATH">
        <el-button @click="openimg">查看图片</el-button>
      </el-form-item>
      <h2>图2信息</h2>
      <el-form-item label="图片正反面" prop="IMAGE2_TYPE" class="basicInfo">
          <el-radio-group v-model="formLabelAlign.IMAGE2_TYPE" @change="image2Type">
            <el-radio :label="0">正面</el-radio>
            <el-radio :label="1">反面</el-radio>
            <el-radio :label="2">未知</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="编号" prop="IMAGE2_ITEM1S">
        <el-input v-model="formLabelAlign.IMAGE2_ITEM1S" placeholder="请输入编号"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="IMAGE2_ITEM3">
        <el-input v-model="formLabelAlign.IMAGE2_ITEM3" placeholder="请输入车牌号"></el-input>
      </el-form-item>
      <el-form-item label="登记机关" prop="IMAGE2_ITEM2">
        <el-input v-model="formLabelAlign.IMAGE2_ITEM2" placeholder="请输入登记机关"></el-input>
      </el-form-item>
      <el-form-item label="车架编号" prop="IMAGE2_ITEM4">
        <el-input v-model="formLabelAlign.IMAGE2_ITEM4" placeholder="请输入车架编号"></el-input>
      </el-form-item>
      <el-form-item label="登记证书编号" prop="IMAGE2_ITEM1S">
        <el-input v-model="formLabelAlign.IMAGE2_ITEM1S" placeholder="请输入登记证书编号"></el-input>
      </el-form-item>
      <el-form-item label="抵押日期" prop="IMAGE2_ITEM6">
        <el-date-picker
          v-model="formLabelAlign.IMAGE2_ITEM6"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="图片" prop="IMAGE2_PATH">
        <el-button @click="openimgTwo">查看图片</el-button>
      </el-form-item>
    </el-form>
    <div class="ui-btn">
      <el-button type="primary" @click="submit('formLabelAlign')">复核完成</el-button>
      <el-button @click="goListPage">返回</el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'InfoEdit',
  components: {},
  data: function () {
    return {
      // baseUrl: 'http://172.16.250.25:7084//ocr-batch/resource/',
      baseUrl: 'http://172.16.248.23:7089/ocr-batch/resource/',
      labelPosition: 'right',
      formformInline: {
        CONT_NAME: '',
        CAR_NUMBER: '',
        CUST_NAME: '',
        VIN: '',
        DEALER_NAME: '',
        MORTGAGE_DATE: ''
      },
      formLabelAlign: {
        IMAGE1_TYPE: '',
        IMAGE1_ITEM3: '',
        IMAGE1_ITEM2: '',
        IMAGE1_ITEM4: '',
        IMAGE1_ITEM1S: '',
        IMAGE1_ITEM1: '',
        IMAGE1_ITEM5: '',
        IMAGE1_ITEM6: '',
        IMAGE1_PATH: '',
        IMAGE2_TYPE: '',
        IMAGE2_ITEM1S: '',
        IMAGE2_ITEM1: '',
        IMAGE2_ITEM5: '',
        IMAGE2_ITEM3: '',
        IMAGE2_ITEM2: '',
        IMAGE2_ITEM4: '',
        IMAGE2_ITEM6: '',
        IMAGE2_PATH: '',
        PK_VEHICLE_REGISTRATION_BOOK: ''
      },
      IMAGE1_ITEM1Data: '',
      IMAGE1_ITEM5Data: '',
      IMAGE2_ITEM1Data: '',
      IMAGE2_ITEM5Data: ''
    }
  },
  setup () {
    return {
      input: ref('')
    }
  },
  mounted () {
    this.formLabelAlign.PK_VEHICLE_REGISTRATION_BOOK = this.$route.query.PK_VEHICLE_REGISTRATION_BOOK
    this.queryOcrInfo(this.$route.query)
  },
  methods: {
    // 登记证信息详情查询
    queryOcrInfo (params) {
      // this.$get('/mock/queryOcrInfo.json', params).then(res => {
      this.$post('/ocr/queryOcrInfo.do', params).then(res => {
        this.formformInline.CONT_NAME = res.CONT_NAME
        this.formformInline.CAR_NUMBER = res.CAR_NUMBER
        this.formformInline.CUST_NAME = res.CUST_NAME
        this.formformInline.VIN = res.VIN
        this.formformInline.DEALER_NAME = res.DEALER_NAME
        this.formformInline.MORTGAGE_DATE = res.MORTGAGE_DATE
        this.formLabelAlign.IMAGE1_TYPE = Number(res.IMAGE1_TYPE)
        // this.formLabelAlign.IMAGE1_TYPE = res.IMAGE1_TYPE
        if (res.IMAGE1_TYPE === '0') {
          this.formLabelAlign.IMAGE1_ITEM1S = res.IMAGE1_ITEM1
          this.IMAGE1_ITEM1Data = res.IMAGE1_ITEM1
        } else if (res.IMAGE1_TYPE === '1') {
          this.formLabelAlign.IMAGE1_ITEM1S = res.IMAGE1_ITEM5
          this.IMAGE1_ITEM5Data = res.IMAGE1_ITEM5
        } else {
          this.formLabelAlign.IMAGE1_ITEM1S = ''
          this.IMAGE1_ITEM1Data = ''
          this.IMAGE1_ITEM5Data = ''
        }
        this.formLabelAlign.IMAGE1_ITEM3 = res.IMAGE1_ITEM3
        this.formLabelAlign.IMAGE1_ITEM2 = res.IMAGE1_ITEM2
        this.formLabelAlign.IMAGE1_ITEM4 = res.IMAGE1_ITEM4
        this.formLabelAlign.IMAGE1_ITEM6 = res.IMAGE1_ITEM6
        this.formLabelAlign.IMAGE1_PATH = res.IMAGE1_PATH

        this.formLabelAlign.IMAGE2_TYPE = Number(res.IMAGE2_TYPE)
        // this.formLabelAlign.IMAGE2_TYPE = res.IMAGE2_TYPE
        if (res.IMAGE2_TYPE === '0') {
          this.formLabelAlign.IMAGE2_ITEM1S = res.IMAGE2_ITEM1
          this.IMAGE2_ITEM1Data = res.IMAGE2_ITEM1
        } else if (res.IMAGE2_TYPE === '1') {
          this.formLabelAlign.IMAGE2_ITEM1S = res.IMAGE2_ITEM5
          this.IMAGE2_ITEM5Data = res.IMAGE2_ITEM5
        } else {
          this.formLabelAlign.IMAGE2_ITEM1S = ''
          this.IMAGE2_ITEM1Data = ''
          this.IMAGE2_ITEM5Data = ''
        }
        this.formLabelAlign.IMAGE2_ITEM3 = res.IMAGE2_ITEM3
        this.formLabelAlign.IMAGE2_ITEM2 = res.IMAGE2_ITEM2
        this.formLabelAlign.IMAGE2_ITEM4 = res.IMAGE2_ITEM4
        this.formLabelAlign.IMAGE2_ITEM6 = res.IMAGE2_ITEM6
        this.formLabelAlign.IMAGE2_PATH = res.IMAGE2_PATH
      })
    },
    // 图片1正反面切换
    image1Type (value) {
      console.log(value)
      if (value === 0) {
        this.formLabelAlign.IMAGE1_ITEM1S = this.IMAGE1_ITEM1Data
      } else if (value === 1) {
        this.formLabelAlign.IMAGE1_ITEM1S = this.IMAGE1_ITEM5Data
      } else {
        this.formLabelAlign.IMAGE1_ITEM1S = ''
      }
    },
    // 图片2正反面切换
    image2Type (value) {
      if (value === 0) {
        this.formLabelAlign.IMAGE2_ITEM1S = this.IMAGE2_ITEM1Data
      } else if (value === 1) {
        this.formLabelAlign.IMAGE2_ITEM1S = this.IMAGE2_ITEM5Data
      } else {
        this.formLabelAlign.IMAGE2_ITEM1S = ''
      }
    },
    // 保存
    submit () {
      const obj = this.formLabelAlign
      console.log(this.formLabelAlign)
      if (obj.IMAGE1_TYPE === 0) {
        obj.IMAGE1_ITEM1 = obj.IMAGE1_ITEM1S
        obj.IMAGE1_ITEM5 = ''
      } else if (obj.IMAGE1_TYPE === 1) {
        obj.IMAGE1_ITEM1 = ''
        obj.IMAGE1_ITEM5 = obj.IMAGE1_ITEM1S
      } else {
        obj.IMAGE1_ITEM1 = ''
        obj.IMAGE1_ITEM5 = ''
      }
      if (obj.IMAGE2_TYPE === 0) {
        obj.IMAGE2_ITEM1 = obj.IMAGE2_ITEM1S
        obj.IMAGE2_ITEM5 = ''
      } else if (obj.IMAGE1_TYPE === 1) {
        obj.IMAGE2_ITEM1 = ''
        obj.IMAGE2_ITEM5 = obj.IMAGE2_ITEM1S
      } else {
        obj.IMAGE2_ITEM1 = ''
        obj.IMAGE2_ITEM5 = ''
      }
      obj.IMAGE1_TYPE = this.formLabelAlign.IMAGE1_TYPE + ''
      obj.IMAGE2_TYPE = this.formLabelAlign.IMAGE2_TYPE + ''
      delete obj.IMAGE2_ITEM1S
      delete obj.IMAGE1_ITEM1S
      console.log(obj)
      // this.$get('/mock/updateOcrInfo.json', obj).then(res => {
      this.$post('/ocr/updateOcrInfo.do', obj).then(res => {
        this.$router.push({ path: '/' })
      })
    },
    // 返回
    goListPage () {
      this.$router.push({ path: '/', query: { pageType: '1' } })
    },
    // 点击图一打开新窗口
    openimg () {
      const VIN = this.formformInline.VIN
      const IMAGE_TYPE = this.formLabelAlign.IMAGE1_TYPE
      const exportUrl = this.baseUrl + '?id=' + VIN + '&type=' + IMAGE_TYPE
      window.open(exportUrl, '_blank')
    },
    // 点击图二打开新窗口
    openimgTwo () {
      const VIN = this.formformInline.VIN
      const IMAGE_TYPE = this.formLabelAlign.IMAGE2_TYPE
      const exportUrl = this.baseUrl + '?id=' + VIN + '&type=' + IMAGE_TYPE
      window.open(exportUrl, '_blank')
    }
  }
})
</script>

<style scoped>
.infoEdit{
  text-align: left;
}
h2{
  margin-top: 30px;
}
.infoEdit .demo-input .el-input {
  width: 180px;
}
.el-form-item{
  display: inline-block;
  width: 50%;
  margin-top: 14px;
}
.basicInfo{
  display: block;
}
.basicInfo .ui-span{
  display: inline-block;
  width: 100px;
  text-align: right;
}
.el-input{
  width: 50%;
}
.ui-btn{
      text-align: right;
    padding: 4% 14%;
}
.el-button--danger{
  margin-right: 10px;
}
</style>
