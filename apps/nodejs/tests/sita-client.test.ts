import { getAccessToken } from '../sita-client';


describe("test authentication", () => {
    it("should get jwt token", async () => {
        const token = await getAccessToken();
        expect(token.length).toBeGreaterThan(0);
    })
})
