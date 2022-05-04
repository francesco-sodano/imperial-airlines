type SitaResponse = {
    status: string;
    data: any;
    error?: any;
}

type Subscription = {
    "subscriptionId": string;
    "topicName": string;
    "subscriptionName": string;
    "expiryTime": Date;
    "connectionString": string;
}
