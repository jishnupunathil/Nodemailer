const express = require('express')
const app = express()
const bodyParser = require('body-parser')


const nodemailer = require('nodemailer')
app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jishnupunathil000@gmail.com',
        pass: 'ylczzapvavremurk'
    }
})

app.get('/sendMail', (req, res) => {
    var mailOptions = {
        from: 'jishnupunathil000@gmail.com',
        to: 'sofymolsunil168@gmail.com,jishnupunathil000@gmail.com,jaseemfz7@gmail.com',
        subject: 'vazhayod enik parayan ullath',
        html:'<h1>oru paniem illenkil abhimanikukayalla vendath,apamanapedukayan vendath</h1>'
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