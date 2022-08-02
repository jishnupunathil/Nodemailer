const express = require('express')
const app = express()
const bodyParser = require('body-parser')


const nodemailer = require('nodemailer')
app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jishnupunathil000@gmail.com',
        pass: '-----' //generate app password and provide here
    }
})

app.get('/sendMail', (req, res) => {
    var mailOptions = {
        from: 'jishnupunathil000@gmail.com',
        to: 'jishnupunathil000@gmail.com',
        subject: 'Mail from NodeJs',
        html:'<h1>Nodemailer works</h1>'
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