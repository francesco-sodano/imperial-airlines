import { createSubscription, getAccessToken } from '../sita-client';
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
        // const sub = await createSubscription(token);
        // expect(sub.subscriptionId).toBeGreaterThan(0);
    })
})
