import morgan from "morgan";
import logger from "./winstson.loggers";

const morganMiddleware = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);

export default morganMiddleware;
