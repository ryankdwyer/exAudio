
var express = require('express'),
multipart = require('connect-multiparty');
var fs = require('fs');

var multipartMiddleware = multipart();

var app = express();


app.post('/', multipartMiddleware,  function (req, res) {
	console.log('~' + req.files.upload_file_minidump.path.toString());
  fs.createReadStream('~' + req.files.upload_file_minidump.path.toString(), function (err, data) {
	console.log(data);
	res.sendStatus(200);
  })
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
