<template>
  <div class="page_controller">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNo"
      :page-sizes="pageSizes"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper,"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  // total总条数 pageNo当前页数 pageSize每页显示条数 pageSizes每页显示多少条
  props: {
    totalCount: {
      type: Number
    }, // 总条数
    pageNo: {
      type: Number
    }
  },
  data () {
    return {
      pageSizes: [10, 20, 50, 100],
      page: {
        pageNo: 1, // 当前页数
        pageSize: 10
      }
    }
  },
  methods: {
    // pageSize 改变时会触发
    handleSizeChange (val) {
      this.page.pageSize = val
      this.$emit('pageChange', this.page)
    },
    // currentPage 改变时会触发
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.$emit('pageChange', this.page)
    }
  }
}
</script>

<style scoped="scoped">
.page_controller {
  margin: 20px;
  box-sizing: content-box;
  /* text-align: right; */
}
</style>
