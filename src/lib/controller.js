export default class Controller {
    
    constructor(context) {
        this.context = context;
    }


    index(application, request, h, callback) {
        callback(null);
    }

    toString(callback) {
        callback(null, 'success');
    }

    serialize() {
        return JSON.stringify(this.context.data || {});
    }

    deserialize() {
        this.context.data = JSON.parse(window.__STATE__);
    }

    attach(el) {
        // to be implemented by the application
      }
    
      detach(el) {
        // to be implemented by the application
      }
    render(target, callback) {
        this.toString(function(err, body) {
            if (err) {
                return callback(err, null);
            }
            document.querySelector(target).innerHTML = body;
            callback(null, body);
        });
    }
}