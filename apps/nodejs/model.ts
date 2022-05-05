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

type DeviceType = "OCR1" | "MSR1" | "LSR1" | "GPP1" | "ATB1" | "BTP1"

type Connection = {
    SubscriptionId: string;
    ReservationId: string;
    DeviceId: string;
    connectionId: string;
    expiryTime: Date;
}

type StartScanResponse = {
    AccessExpiryTime: Date;
}

type AeaPrintData = {
    pectab: string;
    templates?: string[];
    logos?: string[];
    printData: string
}
