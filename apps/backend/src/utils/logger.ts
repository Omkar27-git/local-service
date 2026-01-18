import {createLogger,transports,format} from "winston";

const logger = createLogger({
    level:"info",
    format:format.combine(
        format.colorize(),  //makes log output colorful
        format.simple() //simple format for easy reading
    ),

    transports:[
        new transports.Console() //log to console
    ]
})


export default logger;