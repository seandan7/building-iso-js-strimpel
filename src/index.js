var Hapi = require('@hapi/hapi');
import Application from './lib';
import Controller from './lib/controller';



const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});

function getName(request) {
    // set defaults
    let name = {
        fname: "New",
        lname: "User"
    };
    // split path params
    let nameParts = request.params.name ? request.params.name.split('/'): [];
    name.fname = (nameParts[0] || request.query.fname) || name.fname;
    name.lname = (nameParts[1] || request.query.lname) || name.lname;
    console.log(name);
    return name;
}



const application = new Application({
    // respond to localhost:30000
    '/': Controller
    }, {
    server: server
})
application.start();