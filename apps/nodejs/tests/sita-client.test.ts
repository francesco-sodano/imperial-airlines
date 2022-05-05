import console from 'console';
import { createConnection, createReservation, createSubscription, getAccessToken, printBoardingPassAea, startScan, stopScan } from '../sita-client';
const dotenv = require('dotenv')

dotenv.config()
/*
describe("test authentication", () => {
    it("should get jwt token", async () => {
        const token = await getAccessToken();
        expect(token.length).toBeGreaterThan(0);
    })
})
describe("test subscription", () => {
    it("should create subscription", async () => {
        const token = await getAccessToken();
        const sub = await createSubscription(token);
        expect(sub.subscriptionId?.length).toBeGreaterThan(0);
    })
})

describe("test reservation", () => {
    it("should create reservation", async () => {
        const token = await getAccessToken();
        const reservation = await createReservation(token, process.env.LOCATION_SCANNER || '')
        expect(reservation.reservationId?.length).toBeGreaterThan(0);
    })
})
*/

describe("test connection", () => {
    it("should create connection", async () => {
        const token = await getAccessToken()
        const subscription = await createSubscription(token)
        const reservation = await createReservation(token, process.env.LOCATION_SCANNER || '')
        const connection = await createConnection(token,
            process.env.LOCATION_SCANNER || '',
            subscription.subscriptionId,
            reservation.reservationId,
            'OCR1')
        expect(reservation.reservationId?.length).toBeGreaterThan(0);
    })
})

describe("Start scan", () => {
    it("should return valid date time", async () => {
        const token = await getAccessToken()
        const subscription = await createSubscription(token)
        const reservation = await createReservation(token, process.env.LOCATION_SCANNER || '')
        const connection = await createConnection(token,
            process.env.LOCATION_SCANNER || '',
            subscription.subscriptionId,
            reservation.reservationId,
            'OCR1')
        const startScanResponse = await startScan(token, connection.connectionId);
        await stopScan(token, connection.connectionId);
        expect(startScanResponse.AccessExpiryTime.toString().length).toBeGreaterThan(0);
    })   
})

describe("Print boarding pass aea", () => {
    it("should print boarding pass", async () => {
        const token = await getAccessToken()
        const subscription = await createSubscription(token)
        const reservation = await createReservation(token, process.env.LOCATION_SCANNER || '')
        const connection = await createConnection(token,
            process.env.LOCATION_SCANNER || '',
            subscription.subscriptionId,
            reservation.reservationId,
            'ATB1')
        const aeaPrintData: AeaPrintData = {
            pectab: 'UFQjIz9WMU4jQDsjVElDS1QjQ0hLSU4jQk9BUkQjMDEwMTExMDEjMDJCUkUwMTE2MzEjMDQwNUcxMk82MUYjMDUyMEgxMkQ1MyMxMTA1RDQzSjYyIzEyMDlGNDNKNTNGIzE0MDNHNDMjMTUwM0c0NyMxNjA0SjY4IzIwMTdGNTVGIzIxMTdHNTVGIzIyMDFKNDNKNjBGIzMxMDRNNTNGIzMyMDVNNTgjMzMwNE00M002NVIjMzQwMlI0M081MyMzNTA0UjQ2TzU2IzQxMDRLNDNLNjVQIzQyMDRLNTNQIzQzMDhLNThQIzUxMTBBMzdBNTNGIzUyMTBBMzdBNTNGIzUzMTBBMzdBNTNGIzY3MjBSMTAjNjgxN1IzMiM2OTE3UjUzIzZGMTZRNTMjNzAwMVEyNyM3MTA0TjAzI0ZEMDFSMDEjRkUwMVIwMSNGRjAxUjAxIw==',
            printData: 'Q1AjMUMwMSMwMVYjMDJNMVNLWVdBTEtFUi9BTkFLSU5FQUJDMTIzIENSU1RBVElNUDAwMiAyNDVGMDAxQTAwMTIgMzAwIzA0MTIjMDVWQURFUi9EQVJUSCMxMTA1TUFZIzEySU1QMDAyIzE0Q1JTIzE1VEFUIzE2MDAwMCMyMCMyMSMyMkYjMzEjMzIxODowMCMzMzAxQSMzNCMzNSM0MVNFQVQjNDJHQVRFIzQzQk9BUkRJTkcjNTFGSVJTVCM2N1NJVEEgIzY4U0lUQS9NSUNST1NPRlQjNjlIQUNLQVRIT04gMjAyMiM2RiM3MEAwOSM=',
            logos: ['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'],
            templates: []
        }
 
        await expect(printBoardingPassAea(token, connection.connectionId, '', aeaPrintData)).resolves.not.toThrow();
    })


})
