type SitaResponse = {
    status: string;
    data: any;
    error?: any;
}

type Subscription = {
    subscriptionId: string;
    topicName: string;
    subscriptionName: string;
    expiryTime: Date;
    connectionString: string;
}

type Reservation = {
    reservationId: string;
    airlineCode: string;
    locationId: string;
    expiryTime: Date;
}
