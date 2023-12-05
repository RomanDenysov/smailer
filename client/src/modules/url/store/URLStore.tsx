import { makeAutoObservable } from 'mobx';
import { IUrl } from "@modules/models/IUrl";
import UrlService from '@modules/service/UrlService';

export default class URLStore {
    urls: IUrl[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setURLs(urls: IUrl[]) {
        this.urls = urls;
    }

    async createURL(url: string) {
        try {
            const response = await UrlService.createURL(url)
            console.log(response.data)
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async getURLs() {
        try {
            const response = await UrlService.getURLs();
            console.log(response.data)
            this.setURLs(response.data);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }
        async deleteURL(id: string) {
        try {
            await UrlService.deleteURL(id);
            // Handle deletion success as needed
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    
}