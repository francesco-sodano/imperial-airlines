import axios from 'axios'
import qs from 'qs'

export async function getAccessToken(): Promise<string> {
    const x = await axios({
        method: 'post',
        url: `https://login.microsoftonline.com/${process.env.AAD_TENANT}.onmicrosoft.com/oauth2/token`,
        data: qs.stringify({
            grant_type: 'client_credentials',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            resource: process.env.RESOURCE
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    return x.data.access_token
}

export async function createSubscription(accessToken: string): Promise<Subscription> {
    const x = await axios({
        method: 'post',
        url: `https://${process.env.BASE_URL}/session/v2/subscriptions`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return x.data
}
