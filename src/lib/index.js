import Controller from "./controller";

export default class Application {
    constructor(routes, options) {
        this.server = options.server;
        this.registerRoutes(routes);
    }

    registerRoutes(routes) {
        for (let path in routes) {
            this.addRoute(path, routes[path]);
        }
    }

    addRoute(path, Controller) {
        this.server.route({
            path: path,
            method: 'GET',
            handler: function (request, h) {
                return new Promise((resolve, reject) => {
                    const controller = new Controller({
                        query: request.query,
                        params: request.params
                    });
                    controller.index(this, request, h, (err) => {
                        if (err) reject(err);
                        controller.toString( (err, html) => {
                             resolve(html);
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