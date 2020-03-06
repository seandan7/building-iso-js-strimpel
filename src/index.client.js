import Application from './lib/index.client.js';
import HelloController from './HelloController';
import nunjucks from 'nunjucks';
import HomeController from './HomeController.js';


nunjucks.configure('/templates');
const application = new Application({
    '/': HomeController,
    '/hello/{name*}': HelloController
}, {
    // query selector for element to inject response into
    target: 'body'
});

application.start();