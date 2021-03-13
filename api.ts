import axios from 'axios'
import config from "./config";
import {nor} from "./types";

const instance = axios.create({
    baseURL : config.BASE_URL,
    withCredentials: true
})
type loginType = {username : string,password : string}
type addPostT ={user_id : string, username : string, avatar_path : string,
    filename : string,value : string}
type setUserdataT =  {username : string, description : string, user_id : string}
type likeT = {avatar_path : string,user_id : string,username : string,post_id : string}
const API = {
    login(data : loginType){
        return instance.put('/auth/login',data)
    },
    register(data : loginType){
        return instance.post('/auth/register',data)
    } ,
    getUserById(user_id : string,current_user_id? : string){
        return instance.put('/getuser',{user_id,current_user_id})
    },
    uploadAvatar(data : any,mode : string){
        return instance.post(`/upload/${mode}`,data)
    },
    setAvatar(user_id : string,filename : string,old_file_name : nor,mode : string){
        return instance.put('/users/setavatar', {user_id,filename,old_file_name,mode})
    },
    setUserData(data : setUserdataT){
        return instance.put('/users/setuserdata',data)
    },
    search(value : string){
        return instance.get(`/users?username=${value}`)
    },
    follow(user_id : string,follow_to : string){
        return instance.post('/users/follow',{user_id,follow_to})
    },
    unfollow(user_id : string,follow_to : string){
        return instance.delete('/users/follow',{data : {user_id,follow_to}})
    },
    getFollowers(user_id: string){
        return instance.get(`/followers/${user_id}`)
    },
    addPost(data : addPostT){
        return instance.post('/addpost',data)
    },
    getComments(id : string){
        return instance.get(`/comments/${id}`)
    },
    addComment(data){
        return instance.post('/comments',data)
    },
    likePost(data : likeT){
        return instance.post('/posts/like',data)
    },
    unlikePost(data : {user_id: string,post_id : string}){
        return instance.delete('/posts/like',{data})
    },
    getMessages(room_id : string){
        return instance.put('/messages', {room_id})
    }
}

export default API