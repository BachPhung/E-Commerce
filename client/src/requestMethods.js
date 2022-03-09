import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/'
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjNiYzU4MjI3OGYxNmI2MjhmNzU2ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0Njc4NDkzNCwiZXhwIjoxNjQ3MjE2OTM0fQ.MH-_vQxH49eNh84qguXbssm2W-8DWwm7UmUKdeRjLy4'
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: token}
})