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

    navigate(url, push = true) {
        // if browser doesnt support history API, go to url
        if (!history.pushState) {
            window.location = url;
            return;
        }

        const request = () => {};
        const reply = replyFactory(this);
        // split path and search string
        let urlParts = url.split('?');
        
        let [path, search] = urlParts;

        // see if url path matches route in router
        let match = this.router.route('get', path);
        let {route, params} = match;

        // look up Controller in routes table
        let Controller = this.routes[route];

        // if match and Controller in routes table, make instance
        if (route && Controller) {
            const controller = new Controller({
                query: query.parse(search),
                params: params,
                cookie: cookie
            });
            // request and reply stubs -- facadesnext chapter
            const request = ()=> {};
            const reply = ()=> {};

            // execute controller action
            controller.index(this, request, reply, (err) => {
                if (err) {
                    return h.response;
                }
            })
               
        }
        console.log(url);

        if (push) {
            history.pushState({}, null, url);
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
    }
}
console.log("Test client lib");