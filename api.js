import axios from 'axios'
import config from "./config";

const instance = axios.create({
    baseURL : config.BASE_URL,
    withCredentials: true
})

const API = {
    login(data){
        return instance.post('/login',data)
    },
    register(data){
        return instance.post('/register',data)
    } ,
    getUserById(user_id){
        return instance.post('/auth',{user_id})
    },
    uploadAvatar(data,mode){
        console.log(mode)
        return instance.post(`/upload/${mode}`,data)
    },
    setAvatar(user_id,filename,old_file_name,mode){
        return instance.post('/setavatar', {user_id,filename,old_file_name,mode})
    },
    setUserData(data){
        return instance.post('/setuserdata',data)
    }
}

export default API