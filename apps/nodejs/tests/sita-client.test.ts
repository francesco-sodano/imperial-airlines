import { createConnection, createReservation, createSubscription, getAccessToken, startScan, stopScan } from '../sita-client';
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
