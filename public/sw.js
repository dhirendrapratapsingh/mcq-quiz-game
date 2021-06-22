// Below section store all files of your project in the cache so that it can run offline

let cacheData = "appV1";
var self= this;
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            console.log('Cache opened');
            cache.addAll([
                '/static/js/bundle.js',
                '/static/js/vendors~main.chunk.js',
                '/static/js/main.chunk.js',
                '/',
            ]);
            console.log('Important files which are downlaoded from http://localhost:3000/ on App start are added to cache');

            //To delete cached files goto Devtool>Application>Cache storage>appV1 : Delete
            //Then goto Application>Service worker> click unregister> Refresh page : Cache will have new set of files specified above
            //Only js files supported no '/index.html'
            //We have to put all the routes here
        })
    )
});

//Below section retreive all files of your project from the cache so that it can run offline
//when Browser tries to fetch when offline 

//A sample push notification...
setTimeout(() => {
    console.log('called');
    self.registration.showNotification("Best wishes from Dhiren  ", {
        body: "Push notification worked ",
    })

}, 4000);
   

this.addEventListener("fetch", (event) => {

    // console.log('Browser tries to fetch when weh app runs ');
    // console.warn("url", event.request.url);

    //tells the browser that work is ongoing until the promise settles, and it shouldn't terminate the service worker


    if (!navigator.onLine) {   //if offline the only get the data from service worker

        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl); // Re-render the code if it exists in service worker
            })
        )

    }
})