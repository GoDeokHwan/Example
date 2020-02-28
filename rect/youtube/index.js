const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

//application
app.use(bodyParser.urlencoded({extended : true}));
//application/json
app.use(bodyParser.json());

const { User } = require("./models/User");
const mongoose = require('mongoose');
const config = require('./config/key');

mongoose.connect(config.mongoURI
, {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex : true , useFindAndModify : false})
.then(() =>  console.log('mongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World! Hi~~'))

app.post('/register',(req,res) =>  {
    // 회원 가입 할때 필요한 정보들을 Client 에서 가져오기
    const user = new User(req.body);
    user.save((err,userInfo)=>{
        if(err) return res.json({ success : false , err});
        return res.status(200).json({
            success : true
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));