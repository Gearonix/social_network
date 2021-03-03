import axios from 'axios'
import config from "./config_";

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
    getUserById(user_id,current_user_id=null){
        return instance.put('/getuser',{user_id,current_user_id})
    },
    uploadAvatar(data,mode){
        return instance.post(`/users/upload/${mode}`,data)
    },
    setAvatar(user_id,filename,old_file_name,mode){
        return instance.put('/users/setavatar', {user_id,filename,old_file_name,mode})
    },
    setUserData(data){
        return instance.put('/users/setuserdata',data)
    },
    search(value){
        return instance.get(`/users?username=${value}`)
    },
    follow(user_id,follow_to){
        return instance.post('/users/follow',{user_id,follow_to})
    },
    unfollow(user_id,follow_to){
        return instance.delete('/users/follow',{data : {user_id,follow_to}})
    },
    getFollowers(user_id){
        return instance.get(`/followers/${user_id}`)
    }
}

export default API