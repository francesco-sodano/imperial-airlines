import axios from 'axios'
import qs from 'qs'

export async function getAccessToken(): Promise<string> {
    try {
        const x = await axios({
            method: 'post',
            url: `https://login.microsoftonline.com/${process.env.AAD_TENANT}.onmicrosoft.com/oauth2/token`,
            data: qs.stringify({
                grant_type: 'client_credentials',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                resource: process.env.RESOURCE_ID
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        return x.data.access_token
    } catch(e) {
        console.log(e)
    }
    return ''

}

export async function createSubscription(accessToken: string): Promise<Subscription> {
    try {
        const x = await axios({
            method: 'post',
            url: `https://${process.env.BASE_URL}/session/v2/subscriptions`,
            headers: {
                'location-id': process.env.LOCATION_ID || '',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return x.data
    } catch (e) {
        console.log(e)
    }
    return {} as Subscription
}
