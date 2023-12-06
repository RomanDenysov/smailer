import { IUser } from "@models/IUser";
import AuthService from "@services/AuthService";
import {makeAutoObservable} from 'mobx'

import axios from 'axios'
import { AuthResponse } from "@models/response/AuthResponse";
import { API_URL } from "@services/http";

export default class AuthStore {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user: IUser){
        this.user = user;
    }

    setAuth(bool: boolean){
        this.isAuth = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            // console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (err: any) {
            console.log(err.response?.data?.message)
        }
    }
    
    async registration(username: string, email: string, password: string) {
        try {
            const response = await AuthService.registration(username, email, password);
            localStorage.setItem('token', response.data.accessToken);
            // console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (err: any) {
            console.log(err.response?.data?.message)
        }
    }
    
    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser)
            return response;
        } catch (err: any) {
            console.log(err.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            // console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (err: any) {
            console.log(err.response?.data?.message)
        }
    }
}