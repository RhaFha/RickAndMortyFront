import { AxiosRequestConfig } from 'axios';

export const AXIOS_DEFAULT_OPTIONS: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json"
    }
}

export const STATUS_CHARACTER = {
    Alive: '#00CC00',
    Dead: '#FF0000',
    unknown: '#808080',
};