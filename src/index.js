var Hapi = require('@hapi/hapi');
import nunjucks from 'nunjucks';
nunjucks.configure('./dist');

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
server.route({
    method: 'GET',
    path: '/hello/{name*}',
    handler: function (request, h) {
         return nunjucks.render('index.html', getName(request));
    }
});
server.start();