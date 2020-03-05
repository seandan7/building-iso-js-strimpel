import Application from './lib/index.client.js';
import HelloController from './HelloController';
import nunjucks from 'nunjucks';


nunjucks.configure('/templates');
const application = new Application({
    '/': HelloController,
    '/hello/{name*}': HelloController
}, {
    // query selector for element to inject response into
    target: 'body'
});

application.start();