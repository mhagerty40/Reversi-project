/**************************************/
/*    Set up the static file server   */
/*include the static file webserver library*/
var static = require('node-static');

/* include the http server Library */
var http = require('http');

/*Assume that we are running on Heroku */
var port = process.env.PORT;
var directory = __dirname + '/Public';

/* if we aren't on Heroku, then we need to readjust the port and directory
* information and we know that because port won't be set */
if(typeof port == 'undefined' || !port)
{
directory = './Public';
port = 8080;
}
/* set up a static web-server that will deliver files from the filesystem */
var file = new static.Server(directory);

/*Construct an http server that gets files from the file server*/
var app = http.createServer(
  function(request,response) {
    request.addListener('end',
      function(){
        file.serve(request,response);
                }
             ).resume();
            }
          ).listen(port);
console.log('The server is running');
      /**************************************/
      /*    Set up the web socket server    */

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {

    function log(){
      var array = ['*** Server Log message: '];
      for(var i = 0; i < arguments.length; i++)
      {
          array.push(arguments[i]);
          console.log(arguments[i]);
      }
      socket.emit('log',array);
      socket.broadcast.emit('log', array);
    }
    log('A web site connected from the server');

    Socket.on('disconnect', function(socket)
    {
      log('A web site disconnected from the server');
    });
});
