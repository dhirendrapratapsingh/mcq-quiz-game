export default function swDev() {
    console.log('hello i am inside swDev();');

    //A key which authenticates the server which is allowed to send notification to our service worker
    //Voluntary application server identification(vapid) -> application server key
    function determineAppServerKey() {
        const vapidPublicKey =
            "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
        return urlBase64ToUint8Array(vapidPublicKey);
    }

    function urlBase64ToUint8Array(base64String) { 
        //encodes the given key, can us web-push library also  for generation & encoding
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }


    if('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            console.warn(`${process.env.PUBLIC_URL}/sw.js`);

            navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`)
                .then((response) =>{
                    console.log('Success: ', response.scope);

                    response.pushManager.subscribe({  //A object having applicationServerKey
                        userVisibleOnly: true,
                        applicationServerKey: determineAppServerKey()
                    });

                    // response.pushManager.getSubscription()
                    //     .then(function (subscription) {
                    //         //console.log(subscription.pushManager);
                    //         if (response) {

                    //             response.pushManager.subscribe({  //A object having applicationServerKey
                    //                 userVisibleOnly: true,
                    //                 applicationServerKey: determineAppServerKey()
                    //             });
                    //         }
                    //     });


                }).catch((err) => console.log('Failure: ', err));
        })
    }
}