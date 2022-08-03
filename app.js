const express = require('express')
const app = express()
const bodyParser = require('body-parser')


const nodemailer = require('nodemailer')
const multer=require('multer')
const fs=require('fs')


app.use(bodyParser.json())

const storage=multer.diskStorage({
    destination:function(req,file,callback){
        if(!fs.existsSync(__dirname+'/temp')){
            fs.mkdirSync(__dirname+'/temp')
        }
        callback(null,'./temp')
    },
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload=multer({storage:storage})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jishnupunathil000@gmail.com',
        pass: '' //generate app password and provide here
    }
})

app.get('/sendMail',upload.array('attachments'), (req, res) => {
    let attachments=[]
    for(let i=0;i<req.files.length;i++){
        let fileDetails={
            filename : req.files[i].filename,
            path: req.files[i].path
        }
        attachments.push(fileDetails)
    }
    var mailOptions = {
        from: 'jishnupunathil000@gmail.com',
        to: 'jishnupunathil000@gmail.com',
        subject: 'Mail from NodeJs',
        html:'<h1>Nodemailer works</h1>',
        attachments:attachments
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (!err) {
            res.json({
                status: 'ok', data: info
            })
        } else {
            res.json({
                status: 'error', data: 'something went wrong' + err
            })
        }
    })
})


app.listen(5001, (err) => {
    if (!err) {
        console.log('listening to 5001');
    }
})