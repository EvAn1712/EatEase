const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // Clé API de test

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://js.stripe.com"],
            frameSrc: ["'self'", "https://js.stripe.com"],
            connectSrc: ["'self'", "https://api.stripe.com", "https://merchant-ui-api.stripe.com", "http://localhost:3001"],
            imgSrc: ["'self'", "https://*.stripe.com"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://*.stripe.com"],
        },
    },
}));

app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount, description, payment_method } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'eur',
            description: description,
            automatic_payment_methods: { enabled: true },
        });

        const updatedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
            payment_method: payment_method,
            return_url: 'http://localhost:3000/',
        });

        res.send({
            client_secret: updatedPaymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});