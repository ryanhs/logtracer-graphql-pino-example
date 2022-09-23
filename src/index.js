const logger = require('./pino.node');
const { Server } = require("graphql-koa-scripts");
const rTracer = require("cls-rtracer");
const uuid = require('uuid');

const App = {
  configure: () => ({ PORT: 13001, logger: logger }),

  router(r, { graphqlHandler }) {

    // rTracer middleware
    r.use(
      rTracer.koaMiddleware({
        useHeader: true,
        headerName: "X-Request-Id",
        requestIdFactory: () => uuid.v4(),
      })
    );

    graphqlHandler({
      typeDefs: `
          type Query {
            hello: String
          }
        `,
      resolvers: {
        Query: {
          hello: () => {
            logger.info("hello");
            return 'awesome';
          },
        },
      },
      endpointUrl: "/graphql",
    });

  },
};



(async () => {
  const { quit } = await Server(App);
})();