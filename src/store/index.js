// import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  namespaced: true,
  // 存储数据，全局大JSON对象
  state () {
    return {
      count: 0
    }
  },
  // 存放更改state里状态的方法
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {},
  modules: {}
})
export default store

// const app = createApp({ /* your root component */ })

// // Install the store instance as a plugin
// app.use(store)
