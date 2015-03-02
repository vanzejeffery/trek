import fs from 'fs';
import path from 'path';
import klm from 'koa-load-middlewares';

const STARTREK = 'Star Trek';

export var defaultStack = (app) => {
  let [config, ms] = [app.config, klm()];

  if (app.env !== 'production') {
    app.use(ms.logger());
  }

  ms.qs(app);
  app.use(ms.favicon(path.join(config.publicPath, 'favicon.icon')));
  app.use(ms.responseTime());
  app.use(ms.methodoverride());
  app.use(ms.xRequestId(undefined, true, true));

  let morgan = ms.morgan;
  /*
  morgan.token('id', function getId(_, res) {
    return res._headers['x-request-id'];
  });
  */
  app.use(morgan.middleware('combined'))

  // add remoteIp

  let secretKeyBase = config.secrets.secretKeyBase;
  app.keys = Array.isArray(secretKeyBase) ? secretKeyBase : [secretKeyBase || STARTREK];
  app.use(ms.genericSession(config.secrets.session));

  /*
  function session() {
    var secretKeyBase = app.secrets.secretKeyBase;
    this.keys = Array.isArray(secretKeyBase) ? secretKeyBase : [secretKeyBase];
    return ms.genericSession(app.secrets.session);
  });
  */
  app.use(ms.lusca(config.secrets));
  app.use(ms.bodyparser());
  app.use(ms.router(app));
};