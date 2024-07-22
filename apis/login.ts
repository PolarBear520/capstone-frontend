export interface LoginParams {
  email: string
  password: string
}
export interface Orders {
  user_id: number
  shop_id: number
  course_end_time: string
}

export interface Vip_type {
  user_id: number
  id: number
  vipType: number
  vipName: string
  endDate: string
  course_end_time: string
}

export interface LoginResultModel {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}
enum Api {
  login = 'http://localhost:8081/api/users/login',
  logout = 'http://localhost:8081/api/users/logout',
  getUserInfo = '/api/users/getUserInfo',
}

// option就是useFetch的选项参数
export async function login(params: LoginParams) {
  return useHttp.post<LoginResultModel>(Api.login, params)
}

export async function logout() {
  return useHttp.post<void>(Api.logout)
}

export async function getUserInfo() {
  return useHttp.get(Api.getUserInfo)
}
