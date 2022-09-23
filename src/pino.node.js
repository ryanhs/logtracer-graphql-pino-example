const pino = require('pino');
// import pretty from 'pino-pretty';

const rTracer = require("cls-rtracer");

const INFO = 'info';
const TRACE = 'trace';

// trace on dev, info on prod
const logLevel = INFO;

const options = {
  appName: "logtracer-poc",
  level: logLevel,

  // add rTracer id on log
  mixin() {
    console.log("dd", rTracer.id());
    return { requestId: rTracer.id() };
  },
};

// development only, change to debug moode
const isDevelopment = process.env.NODE_ENV !== 'production';
if (isDevelopment) {
  options.level = TRACE;
  options.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  };
}

// create
const log = pino(options);

module.exports = log
