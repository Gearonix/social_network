export type nor = string | null


export type loginType = {
    username: nor,
    user_id: nor,
    description: nor,
    avatar_path: nor,
    followers_count: nor,
    background_path: nor,
    posts: Array<any>
}
export type usersType = {
    found_users: Array<any>,
    current: {
        username: nor,
        description: nor,
        avatar_path: nor,
        followers_count: number,
        background_path: nor,
        user_id: nor,
        subscribed: boolean,
        posts : Array<any>
    },
    followers: Array<any>,
    followers_loading : boolean
}
export type actionType<T> = {
    type : string,
    payload : T
}
export type commentsType = {
    comments: Array<any>,
    loading: boolean
}
export type messagesType = {
    messages : Array<any>,
    rooms : Array<any>
}