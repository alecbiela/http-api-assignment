
// sends response back to client
const sendResponse = (req, res, data, type, status) => {
  // write response using data passed in
  res.writeHead(status, { 'Content-Type': type });
  res.write(data);
  res.end();
};


// formats a response
// takes request and response objects, status code, and obj to return
const formResponse = (req, res, status, resObj) => {
  // if we should respond with XML instead, format an XML string
  if (req.headers.accept[0] === 'text/xml') {
    // create XML with message
    let resXML = '<response>';
    resXML = `${resXML} <message>${resObj.message}</message>`;
    if (resObj.id) resXML = `${resXML} <id>${resObj.id}</id>`;
    resXML = `${resXML} </response>`;

    // return res passing out string and content type
    return sendResponse(req, res, resXML, 'text/xml', status);
  }

  // if we got here, we need to stringify JSON and send it
  const resString = JSON.stringify(resObj);
  return sendResponse(req, res, resString, 'application/json', status);
};

// successful response (STATUS: 200)
const success = (req, res) => {
  const tmp = {
    message: 'This is a successful response',
  };
  return formResponse(req, res, 200, tmp);
};

// bad request (200 if params.valid is true, else 400)
const badRequest = (req, res, params) => {
  if (params.valid && (params.valid === 'true')) return success(req, res);

  const tmp = {
    message: 'Missing valid query parameter set to true',
    id: 'badRequest',
  };
  return formResponse(req, res, 400, tmp);
};

// unauthorized (200 if params.loggedIn is yes, else 401)
const unauthorized = (req, res, params) => {
  if (params.loggedIn && (params.loggedIn === 'yes')) return success(req, res);

  const tmp = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };
  return formResponse(req, res, 401, tmp);
};

// forbidden, code 403
const forbidden = (req, res) => {
  const tmp = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  return formResponse(req, res, 403, tmp);
};

// internal server error, code 500
const internal = (req, res) => {
  const tmp = {
    message: 'Internal Server Error.  Something went wrong.',
    id: 'internalError',
  };
  return formResponse(req, res, 500, tmp);
};

// notImplemented, code 501
const notImp = (req, res) => {
  const tmp = {
    message: 'A GET request for this page has not been implemented yet.  Check again later for updated content.',
    id: 'notImplemented',
  };
  return formResponse(req, res, 501, tmp);
};

// any other page than above gets 404, page not found
const notFound = (req, res) => {
  const tmp = {
    message: 'The page you were looking for was not found.',
    id: 'notFound',
  };
  return formResponse(req, res, 404, tmp);
};

// export only calls to pages, not the inner workings
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImp,
  notFound,
};
