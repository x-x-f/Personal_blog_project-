// 封装localstorage对token(对象)的三个操作
// 1. 保存  // 2. 获取  // 3. 删除
// JSON
const TOKEN_NAME = 'my-token'
// 1. 保存
export const saveToken = (tokenObj) => {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(tokenObj))  
}
 
// 2. 获取
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_NAME))
}
 
// 3. 删除
export const delToken = () => {
  console.log('删除了token')
  localStorage.removeItem(TOKEN_NAME)
}