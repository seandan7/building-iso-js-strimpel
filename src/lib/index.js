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
            handler: (request, h) => {
                const controller = new Controller({
                    query: request.query,
                    params: request.params
                });
                let returnStatement = null;
                controller.index(this, request, h.response, (err) => {
                    if (err) {
                        returnStatement =  err;
                    }
                    controller.toString((err, html) => {
                        if (err) {
                            returnStatement =  err;
                        }
                        returnStatement= html;
                    });
                });
                return returnStatement;
            }
        });
    }
    start() {
        this.server.start();
    }
}