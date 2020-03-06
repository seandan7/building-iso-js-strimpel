import Controller from "./controller";
import cookieFactory from './cookie';


export default class Application {
    constructor(routes, options) {
        this.server = options.server;
        this.document = options.document;
        this.registerRoutes(routes);
    }

    registerRoutes(routes) {
        for (let path in routes) {
            this.addRoute(path, routes[path]);
        }
    }

    addRoute(path, Controller) {
        var self = this;
        this.server.route({
            path: path,
            method: 'GET',
            handler: function (request, h) {
                const controller = new Controller({
                    query: request.query,
                    params: request.params,
                    cookie: cookieFactory(request, h.response)
                });
                return new Promise(function (resolve, reject) {
                    controller.index(this, request, h, function (err) {
                        if (err) reject(err);
                        controller.toString(function (err, html) {
                            self.document(this, controller, request, h.response, html,
                                function (err, html) {
                                    if (err) reject(err);
                                    // TODO: Figure out why this I need to do this instead of just having nunjucks render as it should
                                    html = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g,'"');
                                    resolve(html.replace('&lt;','<').replace('&gt;', '>'));
                                })
                        });
                    });
                });
            }
        });
    }
    start() {
        this.server.start();
    }
}