import Hapi from '@hapi/hapi';
import path from 'path';
import nunjucks from 'nunjucks';

import Inert from '@hapi/inert';

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});


const APP_FILE_PATH = '/application.js';


server.route({
    method: 'GET',
    path: APP_FILE_PATH,
    handler: (request, h) => {
        server.register(Inert);
         return h.file('dist/build/application.js')
    }
})

// add templates route
server.route({
    method: 'GET',
    path: '/templates/{template*}',
    handler: (request, h) => {
        server.register(Inert);
         return h.file(path.join('dist', request.params.template));
    }
});

export default {
    nunjucks: './dist',
    server: server,
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
    }
}