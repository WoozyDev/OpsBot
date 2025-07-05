import axios from "axios";
import { SearchResponse } from "../types";

export enum ResponseCode {
    OK = 200,
    INVALID_TOKEN = 400,
    DATABASE_ERROR = 403,
    INVALID_USERNAME = 405,
    UNKNOWN = 500
}

export default class GameAPI {

    static url() {
        return process.env.API_URL;
    }

    static async request(method: 'GET' | 'POST', endpoint: string, data?: {
        [key: string]: number | string | Array<any> | any[]
    }, extraHeaders?: {
        [key: string]: string
    }): Promise<[any, ResponseCode]> {
        try {
            let headers = {
                'Content-Type': 'application/json'
            };
            if(extraHeaders != undefined && typeof extraHeaders == 'object') {
                headers = {
                    ...headers,
                    ...extraHeaders
                }
            }
            if(method == 'GET') {
                let req = await axios.get(`${this.url()}${endpoint}`, {
                    headers
                });
                if(req.status == 200) {
                    return [req.data, ResponseCode.OK];
                }
            } else if(method == 'POST') {
                let req = await axios.post(`${this.url()}${endpoint}`, data, {
                    headers
                });
                if(req.status == 200) {
                    return [req.data, ResponseCode.OK];
                }
            }
        } catch (err) {
            console.error(err, `- GameAPI.request(${method}, ${endpoint}, `, data);
            return [null, ResponseCode.UNKNOWN];
        }
    }

    static async search(usernames: string[]): Promise<[SearchResponse, ResponseCode]> {
        return await this.request('GET', `profile?usernames=${encodeURIComponent(usernames.join(','))}`);
    }

    static async idsearch(ids: number[]): Promise<[SearchResponse, ResponseCode]> {
        return await this.request('GET', `profile?ids=${encodeURIComponent(ids.join(','))}`);
    }

}
