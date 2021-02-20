// store.ts
// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { getCurrentUserInfo } from '@/api/user'
import { ElMessage } from 'element-plus'

export interface State {
  count: number
  userInfo: {
    [key: string]: any
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    userInfo: {}
  },
  mutations: {
    increment(state) {
      state.count++
    },
    saveUserInfo(state, para) {
      state.userInfo = para.userInfo
    }
  },
  actions: {
    initUserInfo: async (_this: any, callback): Promise<void> => {
      const { commit, state } = _this
      if (!state.userInfo || !state.userInfo.loginName) {
        getCurrentUserInfo().then(result => {
          if (result.message && result.message.code === 0) {
            commit('saveUserInfo', {
              userInfo: {
                loginName: 'xx'
              }
            })
            callback.next && callback.next()
          } else {
            callback.login && callback.login()
            ElMessage({ message: '还未登录', type: 'error' })
            // this.$message({message: result.msg, type: 'error'})
          }
        })
      } else {
        callback.next && callback.next()
      }
    }
  }
})

// define your own `useStore` composition function
export function useStore() {
  console.log(baseUseStore(key))
  return baseUseStore(key)
}
