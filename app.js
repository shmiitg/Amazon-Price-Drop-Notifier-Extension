require('dotenv').config();
const express = require('express');
const app = express();
const Nightmare = require('nightmare'); //nightmare will help to find the url and price value in the url block
const nightmare = Nightmare();
const port = process.env.port || 3000;
const sgMail = require('@sendgrid/mail');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

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

const checkPrice = async (url, price, userEmail) => {
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
        else {
            console.log('Price is still higher');
        }
    } catch (err) {
        console.log(err);
    }
}

app.post('/products', (req, res) => {
    console.log(req.body.email + ' sent a request');
    checkPrice(req.body.prodUrl, req.body.price, req.body.email);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
