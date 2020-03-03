import Controller from "./controller";

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
                return new Promise(function (resolve, reject){
                    const controller = new Controller({
                        query: request.query,
                        params: request.params
                    });
                    controller.index(this, request, h, function (err) {
                        if (err) reject(err);
                        controller.toString(function (err, html) {
                            self.document(this, controller, request, html,
                                function (err, html) {
                                    if (err) reject(err);
                                    resolve(html);
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