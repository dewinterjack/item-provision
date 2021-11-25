import winston, { format } from 'winston';

const logger = winston.createLogger({
    format: format.simple(),
    transports: [
        new winston.transports.Console()
    ]
});

export {
    logger
}