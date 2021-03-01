const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const cors = require('cors')
const cookieparser = require('cookie-parser');
app.use(express.json())
const cors_options = {
    origin : 'http://localhost:19006',
    credentials: true
}
app.use(cors(cors_options))
app.use(cookieparser())
app.get('auth',(req,res) =>{
    if (!req.cookies.id){
        res.json(error(404,'Cookie not found'))
        return
    }
    res.json(ok(req.cookies.id))
})
const main = async () => {
    const URI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
    const client = new MongoClient(URI);
    try {
        await client.connect();
        return client
    } catch (err) {
        console.log(err)
    }
}
let db;
main().then((response) => {
    db = response.db('network')
})

const error = (status = 500, message = 'Request Error', data = {}) => ({status, message, data})
const ok = (data = {}) => ({status: 200, message: 'OK', data})


app.post('/login', (req, res) => {
    db.collection('users').find(req.body, {projection: {password: 0}}).toArray((err, result) => {
        if (result.length === 0) {
            res.json(error(404, 'User not found'))
            return
        }
        res.cookie('id',result[0]._id)
        res.json(ok(result[0]))
    })
})
app.post('/register', (req, res) => {
    const {username, password} = req.body
    const req_data = {
        username, password, description: null, online: false, avatar_path: null, followers_count: 0,
        background_path : null
    }
    db.collection('users').find({username}).toArray((err, result) => {
        if (result.length > 0) {
            res.json(error(500, 'User already exists'))
            return
        }
        db.collection('users').insertOne(req_data, (err, result) => {
            if (err) {
                res.json(error())
                return
            }
            res.cookie('id',result.ops[0]._id)
            res.json(ok(result.ops[0]))
        })
    })

})

app.listen(6868, () => console.log('server started at post 6868'))