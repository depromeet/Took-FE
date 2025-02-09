/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

require('dotenv').config();

const next = require('next');

const fs = require('fs');
const { createServer } = require('https');
const { parse } = require('url');

const port = 2222;
const hostname = process.env.LOCAL_HOST;
const dev = process.env.NODE_ENV !== 'production';

if (!hostname) throw new Error(' 🚨 LOCAL_HOST 환경변수가 설정되지 않았습니다!!');

const app = next({ port, dev, hostname });
const handle = app.getRequestHandler();

console.log(' 🚀 로컬 서버 시작중...');

app.prepare().then(() => {
  const localServer = createServer(
    {
      key: fs.readFileSync('local-private-key.pem'),
      cert: fs.readFileSync('local-certificate.pem'),
    },
    (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    },
  );

  localServer.listen(port);

  console.log(` ✅ 접속 가능: \t https://${hostname}:${port} \n`);
});
