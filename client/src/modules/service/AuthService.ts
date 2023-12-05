import $api from '@modules/http'
import { AuthResponse } from '@modules/models/response/AuthResponse'
import {AxiosResponse} from 'axios'

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/login', {email, password})
    }
    
    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/register', {username, email, password})
    }
    
    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

}