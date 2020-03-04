export default class Application {
    navigate(url, push=true) {
        // if browser doesnt support history API, go to url
        if (!history.pushState) {
            window.location = url;
            return;
        }
        console.log(url);
        if(push) {
            history.pushState({}, null, url);
        }
    }
    start() {
        // event listener for redirects
        this.popStateListener = window.addEventListener('popstate', (e) => {
            let {pathname, search} = window.location;
            let url = `${pathname}${search}`;
            this.navigate(url, false);
        });
        this.clickListener = document.addEventListener('click',(e) => {
            console.log("Clicked");
            let {target} = e;
            let identifier = target.dataset.navigate;
            let href = target.getAttribute('href');

            if (identifier !== undefined) {
                // if user clicked on an href, prevent default
                if (href) {
                    e.preventDefault();
                }
                // navigate to href if there
                this.navigate(identifier || href);
            }
        });
    }
}
console.log("Test client lib");