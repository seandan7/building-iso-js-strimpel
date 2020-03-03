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
}