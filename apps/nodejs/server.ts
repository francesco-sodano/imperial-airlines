import {
    createConnection,
    createReservation,
    createSubscription,
    getAccessToken,
    startScan,
    stopScan
} from './sita-client';
import { createSbClient } from './service-bus';
const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use('/',express.static('html'))
const port = process.env.PORT || 3000

let sbClient = undefined

const messageHandler = async (messageReceived: any) => {
    console.log(`Received message: ${JSON.stringify(messageReceived.body)}`);
    
};

let connectionId = ''
let passportName = ''

app.get('/startScan', async(req:Express.Request, res: Response) => {
    const token = await getAccessToken()
    const subscription = await createSubscription(token)
    const reservation = await createReservation(token, process.env.LOCATION_SCANNER || '')
    const connection = await createConnection(token,
        process.env.LOCATION_SCANNER || '',
        subscription.subscriptionId,
        reservation.reservationId,
        'OCR1')
    connectionId = connection.connectionId
    const startScanResponse = await startScan(token, connection.connectionId);
    // @ts-ignore
    res.status(200).json({'scanId': connectionId })
});

app.get('/stopScan', async(req:Express.Request, res: Response) => {
    const token = await getAccessToken()
    await stopScan(token, connectionId);
    // @ts-ignore
    res.status(200).json({'status': 'ok'})
})

app.get('/getPassport', async(req:Express.Request, res: Response) => {
    // @ts-ignore
    res.status(200).json({passportName})
})

app.listen(port, async() => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    const token = await getAccessToken()
    const subscription = await createSubscription(token)
    console.log('Initial subscription', subscription)
    sbClient = createSbClient(subscription.connectionString, subscription.subscriptionName, messageHandler)
});
