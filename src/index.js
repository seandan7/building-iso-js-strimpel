import Application from './lib';
import HelloController from './HelloController';
import nunjucks from 'nunjucks';
import options from './options';
import HomeController from './HomeController';

nunjucks.configure(options.nunjucks);

const application = new Application({
    // respond to localhost:30000
    '/': HomeController,
    '/hello/{name*}': HelloController
}, options);


application.start();