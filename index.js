var Hapi = require('@hapi/hapi');

const server = new Hapi.Server({  
    host: 'localhost',
    port: 3000
  })

server.route({
    method: 'GET',
    path: '/hello',
    handler: function(reqest, h) {
        return 'hello world';
    }
});
server.start();
