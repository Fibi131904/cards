import { AxiosResponse } from 'axios';
import {instance} from './instance';
import { DataLoginType } from './types';

export const authAPI = {
    authMe() {
        return instance.post<{}, AxiosResponse<ResponseType>>(`auth/me`)
    },
    login(data: DataLoginType) {
        return instance.post<DataLoginType, AxiosResponse<ResponseType>>(`auth/login`, data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/me')
    }
}
