import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/'
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjM3MTM4NzdmN2FjNzQxMTEzNmRmMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NjI0OTIzMSwiZXhwIjoxNjQ2NjgxMjMxfQ.iCxh87Mpkazeg4t3r9DjmCkwTQlCaXMGscDC5TmBl_o'
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: token}
})