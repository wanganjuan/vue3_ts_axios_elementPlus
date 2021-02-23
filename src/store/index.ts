import { createStore } from 'vuex'
interface DemoState {
  count: number
}
const state: DemoState = {
  count: 0
}
// Create a new store instance.
const store = createStore({
  state,
  getters: {
    count: () => state.count
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

export default store
