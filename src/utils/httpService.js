import axios from 'axios'
import { hashHistory } from 'react-router'
import { message } from 'antd'

export const httpService = (config) => {
    return new Promise((resolve,reject) =>{
        const instance = axios.create({
            baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8002' : window.baseUrl,
            headers: {
                'user-token': localStorage.getItem('token'),
            },
        })
        const { url, params, method, rest } = config
        const data = {
            "jsonrpc": "2.0",
            "method": url,
            "id": "cd0876cbf1e6b09d10b7ad40e4de9169",
            "params": [{ ...params }],
        }

        console.log('data', data)

        instance({ ...rest, method, data })
            .then(res =>{
                console.log(res)
                const result = res.data && res.data.result ? res.data.result : res.data
                // if (res.status === 200) {
                //     res.statusText && message.success(res.statusText)
                // }
                resolve(result)
                if (result.code === -2) {
                    hashHistory.push('/login')
                }
            })
            .catch(err => {
                console.log(err)
                //message.error(err)
                reject(err)
            })
    })
}

export const get = (url, params = {}, rest) => httpService({ params, url, method: 'get', rest })
export const post = (url, params = {}, rest) => httpService({ params, url, method: 'post', rest })
