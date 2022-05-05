import { createReservation, createSubscription, getAccessToken } from '../sita-client';
const dotenv = require('dotenv')

dotenv.config()

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
        const reservation = await createReservation(token)
        expect(reservation.reservationId?.length).toBeGreaterThan(0);
    })
})
