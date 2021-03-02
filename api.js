import axios from 'axios'
import config from "./config";

const instance = axios.create({
    baseURL : config.BASE_URL,
    withCredentials: true
})

const API = {
    login(data){
        return instance.put('/auth/login',data)
    },
    register(data){
        return instance.post('/auth/register',data)
    } ,
    getUserById(user_id){
        return instance.put('/getuser',{user_id})
    },
    uploadAvatar(data,mode){
        console.log(mode)
        return instance.post(`/users/upload/${mode}`,data)
    },
    setAvatar(user_id,filename,old_file_name,mode){
        console.log('MODE')
        console.log(mode)
        return instance.put('/users/setavatar', {user_id,filename,old_file_name,mode})
    },
    setUserData(data){
        return instance.put('/users/setuserdata',data)
    },
    search(value){
        return instance.get(`/users?username=${value}`)
    }
}

export default API