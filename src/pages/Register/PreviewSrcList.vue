<template>
  <div>
    <el-image
        style="position: absolute;top:0;left:0;width: 100%; height: auto%"
        :src="this.$route.query.ALL_IMAGE_PATH"
        :fit="fit"></el-image>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PreviewSrcList',
  components: {},
  data: function () {
    return {}
  },
  mounted () {
    console.log(this.$route.query.ALL_IMAGE_PATH)
  }
})

</script>
