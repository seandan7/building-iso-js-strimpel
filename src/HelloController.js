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
    toString(callback) {
        nunjucks.render('index.html', getName(this.context), (err, res) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, res);
        });
    }
}  