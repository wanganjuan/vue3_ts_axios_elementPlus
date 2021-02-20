<template>
  <div class="m-nav">
    <div class="nav-header" @click="$router.push('/')">
      魁星平台
    </div>
    <ul class="nav-ul">
      <template v-for="(item, index) in navList" :key="index">
        <li class="nav-li" :class="[iscurrentRoute(item)]" @click="_hanleLi(item)">
          <span class="iconfont" v-html="item.icon"></span>{{item.name}}
          <span class="iconfont" v-if="item.children">{{item.moreTag ? '&#xe835;' : '&#xe833;'}}</span>
        </li>
        <ul class="nav-ul-child" :class="{'show-more': item.moreTag}" v-if="item.children" :key="index + 200">
          <li v-for="(child, num) in item.children" :key="num + 100" :class="{'active-route': iscurrentRoute(child)}" @click="_hanleLi(child)"><span>{{child.name}}</span></li>
        </ul>
      </template>
    </ul>
     <div class="nav-bottom nav-bottom-word" @click="_systemDoc()">
       <span class="iconfont">&#xe851;</span>
       <span class="uname" :title="username">文档下载</span>
    </div>
    <div class="nav-bottom" @click="_logout()">
       <span class="iconfont">&#xe830;</span>
       <span class="uname" :title="username">{{username}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {logout} from '@/api/user'
import useName from '@/hooks/useName'
import {defineComponent, ref, reactive} from 'vue'
import {useRoute, useRouter} from "vue-router"
import useCtx from '@/hooks/useCtx'
export default defineComponent({
  setup () {
    const username = useName()
    const iscurrentRoute = (item: any): string => {
      const {path, children, matchKey} = item
      let curPath = useRoute().path
      if (children) {
        // 判断子路由
        for (let child of children) {
          if (child.path === curPath || (child.matchKey && curPath.includes(child.matchKey))) {
            return 'active-route-parent'
          }
        }
      } else {
        return path === curPath || (matchKey && curPath.includes(matchKey)) ? 'active-route' : ''
      }
      return ''
    }
    const _hanleLi = (item: any):void => {
      if (item.children) {
        item.moreTag = !item.moreTag
        return
      }
      useRouter().push({
        path: item.path
      })
    }
    const navList = reactive([{
      name: '导航一',
      path: '/main/index',
      icon: '&#xe834;'
    }, {
      name: '导航2',
      path: '/main/data',
      icon: '&#xe832;'
    }, {
      name: '导航3',
      icon: '&#xe836;',
      moreTag: false,
      children: [{
        name: '导333',
        path: '/main/labelList'
      }, {
        name: '导444',
        path: '/main/labelClazz',
        matchKey: '/main/labelClazz'
      }]
    }, {
      name: '导4',
      path: '/main/user',
      icon: '&#xe82f;'
    }])
    return {
      username: username.username,
      navList,
      iscurrentRoute,
      _hanleLi,
      _logout: logout
    }
  }
})
</script>

<style lang="stylus" scoped>
  @import './nav.styl'
  // 选中的左边渐变导航
  .m-nav
    position: fixed;
    bottom: 0;
    left: 0;
    width: 64px;
    top: 0;
    background: linear-gradient(180deg,rgba(66,70,153,1) 0%,rgba(99,104,199,1) 100%);
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
    transition all 0.3s ease
    // 如果想点击完就切换，可以设置低一点
    z-index 2001
    font-size 14px
    overflow hidden
    .nav-header
      color #fff
      height 60px
      line-height 60px
      position relative
      box-sizing border-box
      padding-left 64px
      background:#2F326E;
      font-size 18px
      overflow hidden
      cursor pointer
      img
        margin-top 16px
        position absolute
        left 20px
    .nav-bottom
      li-desc()
      position absolute
      bottom 10px
      left 0
      width: 100%;
      &.nav-bottom-word
        bottom 60px
      &:hover
        color $base_color_hover
        // .uname
        //   display block
      .iconfont
        icon-desc()
      .uname
        // display none
        // position absolute
        padding-right 10px
        bottom 0
        height 48px
        line-height 48px
        width 112px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        box-sizing border-box
    .nav-ul
      height: calc(100% - 20px);
      width: calc(100% + 20px);
      overflow-y: auto;
      .nav-li
        li-desc()
        border-4px()
        border-4px-parent()
        .iconfont
          icon-desc()
    .nav-ul-child
      color $child-color
      font-size 0
      max-height 0
      display none
      &.show-more
        font-size 0
        max-height 0
      li
        li-desc()
        box-sizing border-box
        padding-left 64px
        color $child-color
    &:hover
      width 180px
      border-4px-none()
      .nav-ul-child
        color $check-color
        font-size 0
        max-height 0
        li
          border-4px()
        &.show-more
          display block
          font-size 14px
          max-height 300px
</style>
