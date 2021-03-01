import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://192.168.50.154:6868',
    withCredentials: true
})

const API = {
    login(data){
        return instance.post('/login',data)
    },
    register(data){
        return instance.post('/register',data)
    } ,
    getcookie(){
        return instance.get('/auth')
    }
}

export default API