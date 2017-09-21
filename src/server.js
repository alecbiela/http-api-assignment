const http = require('http');
const htmlHandler = require('./htmlLoader.js');
const queryString = require('querystring');
const responses = require('./responses.js');
const url = require('url');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.loadCSS,
  '/success': responses.success,
  '/badRequest': responses.badRequest,
  '/unauthorized': responses.unauthorized,
  '/forbidden': responses.forbidden,
  '/internal': responses.internal,
  '/notImplemented': responses.notImp,
  notFound: responses.notFound,
};

// handles requests
const onRequest = (request, response) => {
  // parse URL and get params
  const parsedUrl = url.parse(request.url);
  const params = queryString.parse(parsedUrl.query);

  // decide if the page exists
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

// create server and start listening
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
