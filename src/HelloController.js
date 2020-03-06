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
function onClick(e) {
    console.log(e.currentTarget);
}
export default class HelloController extends Controller {
    
    index(application, request, reply, callback) {
        this.context.cookie.set('random', '_' + (Math.floor(Math.random() * 1000) + 1), { path: '/' });
        this.context.data = { random: Math.floor(Math.random() * 1000) + 1 };
        callback(null);
    }

    toString(callback) {
        let context = getName(this.context);
        context.data = this.context.data;
        nunjucks.render('hello.html', context, (err, res) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, res);
        });
    }
    attach(el) {
        this.clickHandler = el.addEventListener('click', function (e) {
        }, false);
      }
      detatch(el) {
          el.removeEventListener('click',onClick, false);
      }
}  