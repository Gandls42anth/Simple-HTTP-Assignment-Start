const http = require('http');
const fs = require('fs');

console.log(fs.readdirSync(`${__dirname}/../client/`));
const indexHTML = fs.readFileSync(`${__dirname}/../client/client.html`);
const htmlHandler = require('./htmlResponses.js');
const textHandler = require('./textResponses.js');
const jsonHandler = require('./jsonResponses.js');
const imageHandler = require('./imageResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/page2':
      htmlHandler.getPage2(request, response);
      break;
    case '/hello':
      textHandler.getHello(request, response);
      break;
    case '/time':
      textHandler.getTime(request, response);
      break;
    case '/helloJSON':
      jsonHandler.getHelloJSON(request, response);
      break;
    case '/timeJSON':
      jsonHandler.getTimeJSON(request, response);
      break;
    case '/dankmemes':
      imageHandler.getImage(request, response);
      break;
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
  /*
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(indexHTML);
  */
  response.end();
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
