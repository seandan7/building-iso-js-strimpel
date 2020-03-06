import Call from 'call';
import query from 'query-string';
import cookie from './cookie.client';
import replyFactory from './reply.client';

export default class Application {

    constructor(routes, options) {
        // save routes as lookup table
        this.routes = routes;
        this.options = options;
        // create call router instance
        this.router = new Call.Router();
        this.registerRoutes(routes);
    }

    registerRoutes(routes) {
        // loop through routes and add them to instance
        for (let path in routes) {
            this.router.add({
                path: path,
                method: 'get'
            });
        }
    }
    getURL() {
        let { pathname, search } = window.location;
        return `${pathname}${search}`;
    }
    rehydrate() {
        let targetEl = document.querySelector(this.options.target);
        this.controller = this.createController(this.getURL());
        this.controller.deserialize();
        this.controller.attach(targetEl);
    }
    navigate(url, push = true) {
        // if browser doesnt support history API, go to url
        if (!history.pushState) {
            window.location = url;
            return;
        }
        let previousController = this.controller;
        this.controller = this.createController(url);
        // if a controller was created then proceed with navigating
        if (this.controller) {
            // request and reply stubs
            const request = () => { };
            const reply = replyFactory(this);

            if (push) {
                history.pushState({}, null, url);
            }

            // execute controller action
            this.controller.index(this, request, reply, (err) => {
                if (err) {
                    return reply(err);
                }

                let targetEl = document.querySelector(this.options.target);
                if (previousController) {
                    previousController.detatch(targetEl);
                }
                // render controller response
                this.controller.render(this.options.target, (err, response) => {
                    if (err) {
                        return reply(err);
                    }

                    reply(response);
                    this.controller.attach(targetEl);
                });
            });
        }

    }
    start() {
        // event listener for redirects
        this.popStateListener = window.addEventListener('popstate', (e) => {
            let { pathname, search } = window.location;
            let url = `${pathname}${search}`;
            this.navigate(url, false);
        });
        this.clickListener = document.addEventListener('click', (e) => {
            let { target } = e;
            let identifier = target.dataset.navigate;
            let href = target.getAttribute('href');
            if (identifier !== undefined) {
                if (href) {
                    e.preventDefault();
                }
                // if user clicked on an href, prevent default

                // navigate to href if there
                this.navigate(identifier || href);
            }
        });
        this.rehydrate();
    }
    createController(url) {
        // split the path and search string
        let urlParts = url.split('?');
        // destructure url parts array
        let [path, search] = urlParts;
        // see if url path matches route in router
        let match = this.router.route('get', path);
        // destructure the route path and path path params
        let { route, params } = match;
        // look up controller class in routes table
        let Controller = this.routes[route];

        return Controller ?
            new Controller({
                // parse search string into object
                query: query.parse(search),
                params: params,
                cookie: cookie
            }) : undefined;
    }
}
console.log("Test client lib");