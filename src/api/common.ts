// 返回结构化数据
export interface HttpResponse {
  message: {
    code: number,
    message: string,
    status: number
  }
  data: {
    [key: string]: any
  }
}
