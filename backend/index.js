const express = require('express');
const app = express();
const {MongoClient, ObjectId} = require('mongodb');
const cors = require('cors')
const cookieparser = require('cookie-parser');
const multer = require('multer');
const {v4: create_id} = require('uuid');
const fs = require('fs');

const cors_options = {
    origin: 'http://localhost:19006',
    credentials: true
}

app.use(express.json())
app.use(cors(cors_options))
app.use(cookieparser())
app.use(express.static('static'));


app.put('/getuser', (req, res) => {
    db.collection('users').find({_id: new ObjectId(req.body.user_id)},
        {projection: {password: 0}}).toArray((err, result) => {
        if (err) {
            res.json(error(err))
            return
        }
        res.json(ok(result[0]))
    })
})

app.get('/users', (req, res) => {
    const username = req.query.username
    db.collection('users').find({username : {$regex:`.*${username}.*`}}, {
        projection: {
            password: 0, background_path: 0, online: 0,
            followers_count: 0
        }
    }).toArray((err, result) => {
        if (err) {
            res.json(error(err))
            return
        }
        res.json(ok(result))
    })
})


const user_avatars_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `static/${req.params.mode}`);
    },
    filename: function (req, file, cb) {
        cb(null, create_id() + '____' + file.originalname);
    }
})
const fileFilter = function (req, file, cb) {
    cb(null, true);
}


app.post('/users/upload/:mode', (req, res) => {
    const upload = multer({storage: user_avatars_storage, fileFilter}).single('image')
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.json(error(err));
            return
        }
        const filename = res.req.file.filename
        res.json(ok(filename))
    })

})
app.put('/users/setavatar', (req, res) => {
    const {user_id, filename, old_file_name, mode} = req.body
    replace_object = {}
    replace_object[mode == 'user_avatars' ? 'avatar_path' : 'background_path'] = filename
    console.log(mode)
    db.collection('users').updateOne({_id: new ObjectId(user_id)}, {$set: replace_object})
    if (old_file_name) {
        try {
            fs.unlinkSync(`./static/user_avatars/${old_file_name}`)
        } catch (err) {
            console.log(err)
        }
    }
    res.json(ok())
})


app.put('/users/setuserdata', (req, res) => {
    const {username, description, user_id} = req.body
    db.collection('users').updateOne({_id: new ObjectId(user_id)}, {$set: {username, description}});
    res.json(ok())
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


app.put('/auth/login', (req, res) => {
    db.collection('users').find(req.body, {projection: {password: 0}}).toArray((err, result) => {
        if (result.length === 0) {
            res.json(error(404, 'User not found'))
            return
        }
        res.cookie('id', result[0]._id)
        res.json(ok(result[0]))
    })
})
app.post('/auth/register', (req, res) => {
    const {username, password} = req.body
    const req_data = {
        username, password, description: null, online: false, avatar_path: null, followers_count: 0,
        background_path: null
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
            res.cookie('id', result.ops[0]._id)
            res.json(ok(result.ops[0]))
        })
    })

})

app.listen(6868, () => console.log('server started at post 6868'))