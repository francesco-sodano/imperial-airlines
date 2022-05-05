import axios from 'axios'
import console from 'console'
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

export async function createReservation(accessToken: string, location: string): Promise<Reservation> {
    try {
        const x = await axios({
            method: 'post',
            url: `https://${process.env.BASE_URL}/site/v2/reservations`,
            data: {
                LocationId: location
            },
            headers: {
                'location-id': location,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        // Todo: handle array
        return x.data[0]
    } catch (e) {
        console.log(e)
    }
    return {} as Reservation
}

export async function createConnection(accessToken: string,
                                       location: string,
                                       subscriptionId: string,
                                       reservationId: string,
                                       deviceType: DeviceType): Promise<Connection> {
    try {
        const x = await axios({
            method: 'post',
            url: `https://${process.env.BASE_URL}/session/v2/connections`,
            data: {
                SubscriptionId: subscriptionId,
                ReservationId: reservationId,
                DeviceId: `${location}.${deviceType}`
            },
            headers: {
                'location-id': process.env.LOCATION_ID || '',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        console.log(x.data)
        return x.data
    } catch (e) {
        console.log(e)
    }
    return {} as Connection
}

export async function startScan(accessToken: string,
    connectionId: string): Promise<StartScanResponse> {
    try {
        const x = await axios({
            method: 'post',
            url: `https://${process.env.BASE_URL}/scan/v2/startscanning`,
            data: {
                connectionId: connectionId
            },
            headers: {
                'location-id': process.env.LOCATION_ID || '',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        console.log(x.data)
        console.log('Start scanning successful');
        return x.data
    } catch (e) {
        console.log(e)
    }
    return {} as StartScanResponse
}

export async function stopScan(accessToken: string,
    connectionId: string): Promise<void> {
    try {
        const x = await axios({
            method: 'post',
            url: `https://${process.env.BASE_URL}/scan/v2/stopscanning`,
            data: {
                connectionId: connectionId
            },
            headers: {
                'location-id': process.env.LOCATION_ID || '',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        console.log(x.data)
        console.log('Stop scanning successful')
        return x.data
    } catch (e) {
        console.log(e)
    }
}

export async function printBoardingPassAea(accessToken: string,
    connectionId: string, correlationId: string, aeaPrintData: AeaPrintData): Promise<void> {
    try {
        const x = await axios({
            method: 'post',
            url: `https://${process.env.BASE_URL}/print/v2/boardingpass/aea`,
            data: {
                connectionId: connectionId,
                correlationId: correlationId,
                aeaPrintData: aeaPrintData
            },
            headers: {
                'location-id': process.env.LOCATION_ID || '',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        console.log(x.data)
        console.log('Print boarding pass aea successful')
        return x.data
    } catch (e) {
        console.log(e)
    }
}

