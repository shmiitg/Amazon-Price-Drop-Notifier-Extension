const express = require('express');
const app = express();
const Nightmare = require('nightmare'); //nightmare will help to find the url and price value in the url block
const nightmare = Nightmare();
const port = process.env.port || 3000;
const path = require('path');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const filePath = path.join(__dirname + '/apikey.txt');
let SENDGRID_API_KEY;
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    SENDGRID_API_KEY = data.toString();
    sgMail.setApiKey(SENDGRID_API_KEY);
});

function sendEmail(userEmail, url, price) {
    let message = {
        to: userEmail,
        from: 'shubhamank002@gmail.com',
        subject: 'Price has dropped',
        text: `The price on ${url} has dropped below ${price}`,
        html: `<strong>The price on ${url} has dropped below ${price}</strong>`,
    }
    return sgMail.send(message);
}

async function checkPrice(url, price, userEmail) {
    try {
        let priceInString = await nightmare
            .goto(url)
            .wait('#priceblock_ourprice')
            .evaluate(() => document.querySelector('#priceblock_ourprice').innerText)
            .end();
        let priceInValue = parseFloat(priceInString.replace('₹', ''));
        if (priceInValue < price) {
            console.log(`New Price: ${price}`);
            console.log(`Actual Price: ${priceInValue}`);
            await sendEmail(userEmail, url, price);
            console.log('Email has been sent');
        }
    } catch (err) {
        console.log(err);
    }
}

app.post('/products', (req, res) => {
    console.log(req.body.email + ' sent a request');
    checkPrice(req.body.prodUrl, req.body.price, req.body.email);
});

app.listen(port, () => console.log(`listening at port ${port}`));
