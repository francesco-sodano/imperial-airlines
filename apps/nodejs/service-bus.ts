import { delay, ServiceBusClient, ServiceBusMessage }  from '@azure/service-bus'

export async function createSbClient(connectionString: string, subscriptionId: string, callback: any): Promise<SBClient> {
    // create a Service Bus client using the connection string to the Service Bus namespace
    const serviceBusClient = new ServiceBusClient(connectionString);

    // createReceiver() can also be used to create a receiver for a queue.
    const receiver = serviceBusClient.createReceiver('airline-messages', subscriptionId);

    // function to handle messages
    /*
    const myMessageHandler = async (messageReceived: any) => {
        console.log(`Received message: ${messageReceived.body}`);
    };
*/
    // function to handle any errors
    const myErrorHandler = async (error: any) => {
        console.log(error);
    };

    // subscribe and specify the message and error handlers
    const subscription = receiver.subscribe({
        processMessage: callback,
        processError: myErrorHandler
    });

    return {
        serviceBusClient,
        subscription
    }

    // Waiting long enough before closing the sender to send messages
    /*
    await delay(5000);

    await receiver.close();
    await sbClient.close();

     */
}
