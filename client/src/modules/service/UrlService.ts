import $api from '@modules/http'
import { IUrl } from '@modules/models/IUrl'
import {AxiosResponse} from 'axios'

export default class UrlService {
    static async createURL(url: string): Promise<AxiosResponse<IUrl[]>>{
        return $api.post('/create', { url })
    }
    static async getURLs(): Promise<AxiosResponse<IUrl[]>> {
        return $api.get('/geturls')
    }
    static async deleteURL(id: string): Promise<void> {
        return $api.delete(`/remove/${id}`)
    }
    
}