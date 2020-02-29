var Hapi = require('@hapi/hapi');
import nunjucks from 'nunjucks';
nunjucks.configure('./dist');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, h) {
        return nunjucks.render('index.html', {
            fname: 'Rick', 
            lname: 'Sanchez'
        });
    }
});
server.start();