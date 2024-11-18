import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopmentEnv = env === "development";
  return isDevelopmentEnv ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "white",
};

const format = combine(
  timestamp({
    format: "DD MMM YYYY HH:mm:ss:SSS",
  }),
  colorize({ all: true, colors }),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

const transports = [new winston.transports.Console()];

const logger = winston.createLogger({
  levels,
  level: level(),
  format,
  transports,
});

export default logger;
