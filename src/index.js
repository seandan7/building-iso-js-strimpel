import Hapi from '@hapi/hapi';
import Application from './lib';
import HelloController from './HelloController';
import nunjucks from 'nunjucks';
import Controller from './lib/controller';
import Inert from '@hapi/inert';

nunjucks.configure('./dist');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});


const APP_FILE_PATH = '/application.js';


// register inert obj

server.route({
    method: 'GET',
    path: APP_FILE_PATH,
    handler: (request, h) => {
        server.register(Inert);
        return h.file('dist/build/application.js')
    }
})
const application = new Application({
    // respond to localhost:30000
    '/': Controller,
    '/hello/{name*}': HelloController
}, {
    document: function (application, controller, request, body, callback) {
        nunjucks.render('./index.html', {
            body: body,
            application: APP_FILE_PATH
        },
            (err, html) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, html);
            })
    },
    server: server,

})
application.start();