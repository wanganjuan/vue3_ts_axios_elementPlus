<template>
  <div class="success">
    <div class="contain">
      <ul class="main">
        <li>
          <h2>用户登录</h2>
          <div class="basetxt" style="margin-bottom:10px;">
            <el-input
              type="text"
              v-model="userName"
              placeholder="账号"
              size="medium"
            ></el-input>
          </div>
          <div
            class="basetxt"
            @keyup.stop.enter="submit"
            style="margin-bottom:10px;"
          >
            <el-input
              type="password"
              v-model="password"
              placeholder="密码"
              size="medium"
            ></el-input>
          </div>
          <div class="basechk" style="margin-bottom:10px;">
            <label
              ><el-checkbox type="checkbox" v-model="remend" size="medium"
                >记住用户名</el-checkbox
              ></label
            >
          </div>
          <div class="basebtn">
            <el-button @click="submit">登录</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
// import { login } from '@/api/user'
import useCtx from '@/hooks/useCtx'
import { useStore } from '@/store/store'
export default defineComponent({
  setup() {
    const ctx = useCtx()
    const _data = reactive({
      userName: '',
      password: '',
      remend: false
    })
    const store = useStore()
    console.log(store.state.count)
    store.commit('increment')
    const submit = (): void => {
      if (_data.userName === '' || _data.password === '') {
        ctx.$message({ message: '用户名或密码不能为空', type: 'error' })
        return
      }
      const loading = ctx.$loading({
        text: '正在操作',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        store.commit('saveUserInfo', {
          userInfo: {
            loginName: _data.userName
          }
        })
        loading.close()
        ctx.$message({ message: '登录成功', type: 'success' })
        ctx.$router.replace('/')
      }, 2000)
      // login({
      //   loginName: _data.userName,
      //   password: _data.password
      // }).then(res => {
      //   store.commit('saveUserInfo', {
      //     userInfo: {
      //       loginName: _data.userName
      //     }
      //   })
      //   loading.close()
      //   if (res.message.code === 0) {
      //     ctx.$message({ message: '登录成功', type: 'success' })
      //     ctx.$router.replace('/')
      //   } else {
      //     ctx.$message({
      //       message: res.data ? res.data.desc : '您输入的用户名或密码错误',
      //       type: 'error'
      //     })
      //   }
      // })
    }
    return {
      submit,
      ...toRefs(_data)
    }
  }
})
</script>

<style lang="stylus" scoped>
.success
  model(100%,100%)
  pos(0, 0, 0, 0)
  background url('~@/assets/bg.jpg') top center no-repeat
  background-size cover
  min-height 620px
  .register-top
    padding 40px 0 0 40px
    text-align left
    a
      model(380px,38px)
      display inline-block
  // 主体部分
  .contain
    pos(50%,none,none,50%,1)
    model(380px, 340px, -190px 0 0 -190px,none)
  .main
    model(380px, 300px, none, 30px 30px 40px)
    background #fff
    border 1px solid #cbcbcb
    border-radius 4px
    box-sizing border-box
    h2
      margin-bottom 30px
      font-size 20px
      color #333
    .basetxt input, .basebtn button
      model(100%, 40px,0 0 10px 0)
    .basebtn button
      background $color-lan
      color #fff
      font-size 20px
    .basechk
      margin 0 0 10px
      user-select none
      font-size 12px
      color #808080
</style>
