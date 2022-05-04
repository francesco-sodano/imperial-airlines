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
    console.log(x)
    return x.data
}
