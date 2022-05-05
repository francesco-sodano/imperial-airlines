import { createConnection, createReservation, createSubscription, getAccessToken } from './sita-client';
import { createSbClient } from './service-bus';

const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000


let sbClient = undefined

const messageHandler = async (messageReceived: any) => {
    console.log(`Received message: ${messageReceived.body}`);
};


app.get('/', async(req:Express.Request, res: Response) => {
    const token = await getAccessToken()
    const subscription = await createSubscription(token)
    const reservation = await createReservation(token, process.env.LOCATION_SCANNER || '')
    const connection = await createConnection(token,
        process.env.LOCATION_SCANNER || '',
        subscription.subscriptionId,
        reservation.reservationId,
        'OCR1')
    // @ts-ignore
    res.status(200).json(connection)
});

app.listen(port, async() => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
    const token = await getAccessToken()
    const subscription = await createSubscription(token)
    console.log('Initial subscription', subscription)
    sbClient = createSbClient(subscription.connectionString, subscription.subscriptionName, messageHandler)
});
