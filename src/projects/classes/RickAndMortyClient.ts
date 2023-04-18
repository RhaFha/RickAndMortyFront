import axios, { RawAxiosRequestHeaders } from "axios";
import { AXIOS_DEFAULT_OPTIONS } from "../../utils/constans";

class RickAndMortyClient {
    path: string;
    private baseUrl = import.meta.env.VITE_API_URL;

    constructor(_path: string) {
        this.path = _path;
    }

    private buildHeaders = () => {
        const headers: RawAxiosRequestHeaders = {
            ...AXIOS_DEFAULT_OPTIONS.headers,
        }
        return headers;
    }

    getAxiosInstance = () => {
        return axios.create({
            baseURL: this.baseUrl + this.path,
            timeout: 5000,
            headers: this.buildHeaders(),
        });
    }
}

export default RickAndMortyClient;