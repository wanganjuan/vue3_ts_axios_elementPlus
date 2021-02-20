import { useStore } from '@/store/store'
import { computed } from 'vue'
const useName = () => {
  const store = useStore()
  const username = computed(() => {
    return store.state.userInfo && store.state.userInfo.loginName
  })
  return {
    username
  }
}
export default useName
