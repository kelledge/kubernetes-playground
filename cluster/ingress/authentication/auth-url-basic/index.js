var http = require('http');
var auth = require('http-auth');

var basic = auth.basic({
    realm: process.env.REALM,
    file: process.env.HTPASSWD_PATH
});

basic.on('success', (result, req) => {
  console.log(`User authenticated: ${result.user}`);
});
 
basic.on('fail', (result, req) => {
  console.log(`User authentication failed: ${result.user}`);
});
 
basic.on('error', (error, req) => {
  console.log(`Authentication error: ${error.code + " - " + error.message}`);
});
 
var server = http.createServer(basic, (req, res) => {

  var body = [];
  req.on('data', function(chunk) {
    body.push(chunk);
  })
  .on('end', function() {
    body = Buffer.concat(body).toString();
    if (body !== '') {
      console.log(body);
    }
    else {
      console.log('NO BODY');
    }
  });
  console.log(req.url);
  console.log(JSON.stringify(req.headers, null, 2));

  res.end(`Welcome to private area - ${req.user}!`);
}).listen(8080);

process.on('SIGINT', function() {
  console.log('Closing');
  process.exit();
});
