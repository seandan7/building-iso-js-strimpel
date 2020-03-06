import Controller from './lib/controller';
import nunjucks from 'nunjucks';

nunjucks.configure('./dist');

function getName(request) {
    // set defaults
    let name = {
        fname: "New",
        lname: "User"
    };
    // split path params
    let nameParts = request.params.name ? request.params.name.split('/') : [];
    name.fname = (nameParts[0] || request.query.fname) || name.fname;
    name.lname = (nameParts[1] || request.query.lname) || name.lname;
    return name;
}
export default class HelloController extends Controller {

    index(application, request, reply, callback) {
        this.context.cookie.set('random', '_' + (Math.floor(Math.random() * 1000) + 1), { path: '/' });
        this.context.data = { random: Math.floor(Math.random() * 1000) + 1 };
        callback(null);
    }

    toString(callback) {
        nunjucks.render('hello.html', getName(this.context), (err, res) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, res);
        });
    }
}  