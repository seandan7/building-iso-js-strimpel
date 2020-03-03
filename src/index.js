var Hapi = require('@hapi/hapi');
import Application from './lib';
import Controller from './lib/controller';
import HelloController from './HelloController';



const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});





const application = new Application({
    // respond to localhost:30000
    '/': Controller,
    '/hello/{name*}': HelloController
    }, {
    server: server
})
application.start();