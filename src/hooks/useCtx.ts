import { getCurrentInstance } from 'vue'

const useCtx = () => {
  const app: any = getCurrentInstance()
  return app.ctx
}
export default useCtx
