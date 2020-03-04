import Application from './lib/index.client.js';
import HelloController from './HelloController';

 const application = new Application({
     '/hello/{name*}': HelloController
 }, {
     // query selector for element to inject response into
     target: 'body'
 });

 application.start();
console.log("test client index");