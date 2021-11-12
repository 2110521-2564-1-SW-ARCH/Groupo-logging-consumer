import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../.env' });

import {ApplicationLogMessage} from "groupo-shared-service/grpc/logging";
import {RabbitMQQueue, subscribe} from "groupo-shared-service/datasource/rabbitmq";

const deserializeBuffer = (log: Buffer): ApplicationLogMessage => {
    try {
        return JSON.parse(log.toString());
    } catch (err) {
        console.log("cannot parse json", log.toString());
    }
    return null;
}

subscribe(RabbitMQQueue, (message) => {
    console.log(deserializeBuffer(message));
})
