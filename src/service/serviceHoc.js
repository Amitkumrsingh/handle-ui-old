import config from '../config'
import responseInterceptor from "./interceptor"
import { getToken } from "../utils"
import store from "../redux/store";

import {
    show_loading_overlay,
} from "../redux/reducers/loadingOverlayReducer"

const defaultOptions = {
    url: config.API_BASE_URL,
    method: 'GET',
}

export default function serviceHoc(options = {}) {
    return {
        get: (payload = {}) => {
            store.dispatch(show_loading_overlay({}));
            let url = payload.url || options.url || defaultOptions.url
            return responseInterceptor(fetch(url, {
                ...defaultOptions,
                ...options,
                ...payload,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + getToken()
                }
            }), payload.method)
        },
        create: (payload = {}) => {
            store.dispatch(show_loading_overlay({}));
            let url = payload.url || options.url || defaultOptions.url
            return fetch(url, {
                ...defaultOptions,
                ...options,
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + getToken()
                },
                ...payload
            })
        },
        update: (payload = {}) => {
            store.dispatch(show_loading_overlay({}));
            let url = payload.url || options.url || defaultOptions.url
            return fetch(url, {
                ...defaultOptions,
                ...options,
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + getToken()
                },
                ...payload
            })
        },
        delete: (payload = {}) => {
            store.dispatch(show_loading_overlay({}));
            let url = payload.url || options.url || defaultOptions.url
            return fetch(url, {
                ...defaultOptions,
                ...options,
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + getToken()
                },
                ...payload
            })
        },

    }
}

export {
    config
}